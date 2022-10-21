import * as React from 'react';
import {
    useEffect,
    useState
} from 'react';
import {DataGrid, GridToolbarColumnsButton, GridToolbarContainer,} from '@mui/x-data-grid';
import {DeleteOutlined, EditOutlined, EmailOutlined, FileOpenOutlined, LinkedIn} from '@mui/icons-material/';
import {
    Chip,
    IconButton,
    LinearProgress,
    Tooltip,
} from "@mui/material";
import {Referral} from "../../views/referrals/referral";
import './referralDataGrid.scss';
import {useFetchAllReferrals} from "../../views/referrals/referralService";

type chipColor = "primary" | "success" | "error" | "default" | "secondary" | "info" | "warning" | undefined;
const statusList: string[] = ['in progress', 'hired', 'closed'];
const recruiters: string[] = ['Ana', 'Jack', 'Mary', 'John', 'Krish', 'Navin'];

const progress = (referralStatusId: string | undefined): chipColor => {
    switch (referralStatusId) {
        case 'in progress':
            return referralStatusId = 'primary';
        case 'hired':
            return referralStatusId = 'success';
        case 'closed':
            return referralStatusId = 'error';
        default:
            return referralStatusId = 'default';
    }
}

// const LightTooltip = styled(({className, ...props}: TooltipProps) => (
//     <Tooltip {...props} classes={{popper: className}}/>
// ))(({theme}) => ({
//     [`& .${tooltipClasses.tooltip}`]: {
//         backgroundColor: theme.palette.common.white,
//         color: 'rgba(0, 0, 0, 0.87)',
//         boxShadow: theme.shadows[1],
//         fontSize: 11,
//     },
// }));

const referralDataGridColumns: any = [
    {
        field: "referralStatusId",
        sortable: false,
        filterable: false,
        headerName: "Status",
        type: 'singleSelect',
        disableColumnMenu: true,
        hideable: false,
        headerAlign: 'center',
        width: 108,
        editable: true,
        valueOptions: statusList,
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
        width: 220
    },
    {
        field: "linkedinUrl",
        sortable: false,
        filterable: false,
        headerName: "Linkedin",
        disableColumnMenu: true,
        headerAlign: 'center',
        width: 74,
        renderCell: (params: any) => (
            <Tooltip title="Click to open">
                <IconButton className='icons' color="primary" component="button"
                            onClick={() => window.open(params.value, '_blank', 'noopener,noreferrer')}>
                    <LinkedIn/>
                </IconButton>
            </Tooltip>
        ),
    },
    {
        field: "cvUrl",
        sortable: false,
        filterable: false,
        headerName: "CV",
        disableColumnMenu: true,
        headerAlign: 'center',
        width: 30,
        renderCell: (params: any) => (
            <Tooltip title="Click to open">
                <IconButton className='icons' color="primary" component="button"
                            onClick={() => window.open(params.value, '_blank', 'noopener,noreferrer')}>
                    <FileOpenOutlined/>
                </IconButton>
            </Tooltip>
        ),
    },
    {
        field: "phoneNumber",
        headerName: "Phone",
        disableColumnMenu: true,
        hideable: false,
        headerAlign: 'center',
        width: 100
    },
    {
        field: "email",
        headerName: "Email",
        disableColumnMenu: true,
        hideable: false,
        headerAlign: 'center',
        width: 254,
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
        field: "techStacks",
        sortable: false,
        filterable: false,
        headerName: "Tech Stacks",
        disableColumnMenu: true,
        headerAlign: 'center',
        width: 310,
        renderCell: (params: any) => (
            <div className='tech_tag_container'>
                {params.value.map((tech: string) => (<span key={Math.random()} className='tag'>{tech}</span>))}
            </div>
        ),
    },
    {
        field: "referredBy",
        headerName: "Referred_by",
        disableColumnMenu: true,
        headerAlign: 'center',
        width: 180,
    },
    {
        field: 'taRecruiter',
        headerName: "Ta Recruiter",
        type: 'singleSelect',
        width: 180,
        editable: true,
        valueOptions: recruiters,
    },
    {
        field: "actions",
        type: 'actions',
        headerName: "Actions",
        hideable: false,
        width: 120,
        renderCell: (params: any) => (
            <>
                <IconButton
                    color="primary"
                    component="button"
                    onClick={ () => window.location.href = "/referrals/edit/" + params.id }
                >
                    <EditOutlined/>
                </IconButton><IconButton
                color="error"
                component="button"
                onClick={ () => window.location.href = "#" }
            >
                <DeleteOutlined/>
            </IconButton>
            </>
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

export default function ReferralDataGrid() {
    const { fetchAllReferrals, isLoadingFetchAllReferrals } = useFetchAllReferrals();
    const [referrals, setReferrals] = React.useState<any>([]);

    useEffect(() => {
        fetchAllReferrals().then(response => {
            console.log('Response from heroku', response);
            setReferrals(handleCorrectData(response));
        }).catch(e => {
            console.log(e);
        });
    }, [fetchAllReferrals]);

    // useEffect(() => {
    //     const fetchData = async () => await fetch('https://jsonplaceholder.typicode.com/users');
    //     fetchData()
    //         .then(response => response.json())
    //         .then(data => handleCorrectData(data))
    // }, []);

    const handleCorrectData = (referrals: any): Referral[] => {
        return referrals.map((data: any) => {
            const techStacks: string[] = data.tech_stack.split(',');
            techStacks.pop();

            return {
                id: data.id,
                referredBy: data.referred_by,
                fullName: data.full_name,
                phoneNumber: data.phone_number,
                email: data.email,
                linkedinUrl: data.linkedin_url,
                cvUrl: data.cv_url,
                techStacks: techStacks,
                taRecruiter: data.ta_recruiter,
                referralStatusId: data.status,
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
            rows={referrals}
            columns={referralDataGridColumns}
            getRowHeight={() => "auto"}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 50, 100]}
            loading={isLoadingFetchAllReferrals}
        />
    );
}
