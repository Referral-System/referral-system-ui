import * as React from 'react';
import {
    useEffect,
    useState
} from 'react';
import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer } from '@mui/x-data-grid';
import { EditOutlined, EmailOutlined } from '@mui/icons-material/';
import {
    Chip,
    IconButton,
    LinearProgress,
    Tooltip,
} from "@mui/material";
import { User } from "../../views/users/user";
import { useFetchAllUsers } from "../../views/users/userService";
import { useFetchAllRoles } from "../../views/users/userService";
import { useUpdateUser } from "../../views/users/userService";
import './usersDataGrid.scss';

type chipColor = "primary" | "success" | "error" | "default" | "secondary" | "info" | "warning" | undefined;
//const statusList: string[] = ['in progress', 'hired', 'closed'];

const progress = (roleName: string | undefined): chipColor => {
    switch (roleName) {
        case 'ta':
            return roleName = 'success';
        case 'admin':
            return roleName = 'error';
        default:
            return roleName = 'default';
    }
}

const userDataGridColumns: any = [
    {
        field: "roleName",
        sortable: false,
        filterable: false,
        headerName: "Role",
        type: 'singleSelect',
        disableColumnMenu: true,
        hideable: false,
        headerAlign: 'center',
        minwidth: 100,
        flex: 1,
        editable: true,
        valueOptions: [],
        renderCell: (params: any) => (
            <Chip className={'center'} label={params.value} size="small" variant="outlined"
                  color={progress(params.value)}/>
        ),
    },
    {
        field: "fullName",
        headerName: "Full Name",
        disableColumnMenu: true,
        hideable: false,
        minwidth: 220,
        flex: 1.5
    },
    {
        field: "email",
        headerName: "Email",
        disableColumnMenu: true,
        hideable: false,
        headerAlign: 'center',
        minwidth: 260,
        flex: 2,
        renderCell: (params: any) => (
            <div className='email-icon'>
                <Tooltip title={'Click to copy'}>
                    <IconButton className='icons' color="primary" component="button" onClick={() => {
                        navigator.clipboard.writeText(params.value)
                    }}>
                        <EmailOutlined/>
                    </IconButton>
                </Tooltip>
                {params.value}
            </div>

        ),
    },
    {
        field: "permissions",
        sortable: false,
        filterable: false,
        headerName: "Permissions",
        disableColumnMenu: true,
        headerAlign: 'center',
        minwidth: 100,
        flex: 1,
        renderCell: (params: any) => (
            <div className='tech_tag_container'>
                {params.value.map((tech: string) => (<span key={Math.random()} className='tag'>{tech}</span>))}
            </div>
        ),
    },
];

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarColumnsButton/>
        </GridToolbarContainer>
    );
}

export default function UsersDataGrid() {
    const { fetchAllUsers, isLoadingFetchAllUsers } = useFetchAllUsers();
    const { fetchAllRoles, isLoadingFetchAllRoles } = useFetchAllRoles();
    const { updateUser, isSuccessUpdateUser } = useUpdateUser();
    const [users, setUsers] = React.useState<any>([]);
    const [roles, setRoles] = React.useState<any>([]);

    useEffect(() => {
        fetchAllRoles().then(response => {
            console.log('Response from heroku Roles', response);
            setRoles(handleCorrectDataRoles(response));
        }).catch(e => {
            console.log(e);
        });
    }, [fetchAllRoles]);

    useEffect(() => {
        fetchAllUsers().then(response => {
            console.log('Response from heroku', response);
            setUsers(handleCorrectData(response));
        }).catch(e => {
            console.log(e);
        });
    }, [fetchAllUsers, roles]);

    useEffect(() => {
        const values = Array.from(roles.values());
        userDataGridColumns[0]['valueOptions'] = values;
    }, [roles]);

    const handleCorrectDataRoles = (roles: any): Map<string, string> => {
        let dataCollection = new Map();
        roles.map((data: any) => {
            return dataCollection.set(data.id, data.name);
        })

        return dataCollection;
    }

    const handleCorrectData = (users: any): User[] => {
        return users.map((data: any) => {
            return {
                id: data.id,
                fullName: data.name,
                email: data.email,
                roleId: data.role_id,
                roleName: roles.has && roles.has(data.role_id) ? roles.get(data.role_id).toLowerCase() : 'Undefined',
                permissions: ['View', 'Edit']
            }
        });
    }

    const [pageSize, setPageSize] = useState(5);

    return (
        <DataGrid
            key="referralDataGrid"
            components={{
                LoadingOverlay: LinearProgress,
                Toolbar: CustomToolbar,
            }}
            rows={users}
            columns={userDataGridColumns}
            getRowHeight={() => "auto"}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 50, 100]}
            loading={isLoadingFetchAllRoles && isLoadingFetchAllUsers}
            onCellEditCommit={(data) => {
                updateUser({userData: data, roles: roles}).then(response => {
                    console.log('Response from heroku updateUser', response);
                }).catch(e => {
                    console.log(e);
                });
             }}
        />
    );
}
