import * as React from 'react';
import {
    useEffect,
    useState
} from 'react';
import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, } from '@mui/x-data-grid';
import { DeleteOutlined, EditOutlined, EmailOutlined, FileOpenOutlined, LinkedIn } from '@mui/icons-material/';
import {
    Box,
    Chip,
    Grid,
    IconButton,
    LinearProgress,
    Stack,
    styled,
    Tooltip,
    tooltipClasses,
    TooltipProps
} from "@mui/material";
import { Referral } from "../../views/referrals/referral";
import './referralDataGrid.scss';

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

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip { ...props } classes={ { popper: className } }/>
))(({ theme }) => ({
    [`& .${ tooltipClasses.tooltip }`]: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 11,
    },
}));

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
            <Chip className={ 'center' } label={ params.value } size="small" variant="outlined"
                  color={ progress(params.value) }/>
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
            <LightTooltip title="Click to open">
                <IconButton className='icons' color="primary" component="span">
                    <LinkedIn onClick={ () => window.open(params.value, '_blank', 'noopener,noreferrer') }/>
                </IconButton>
            </LightTooltip>
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
            <LightTooltip title="Click to open">
                <IconButton className='icons' color="primary" component="span">
                    <FileOpenOutlined onClick={ () => window.open(params.value, '_blank', 'noopener,noreferrer') }/>
                </IconButton>
            </LightTooltip>
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
                <LightTooltip title={ 'Click to copy' }>
                    <IconButton className='icons' color="primary" component="span">
                        <EmailOutlined onClick={ () => {
                            navigator.clipboard.writeText(params.value)
                        } }/>
                    </IconButton>
                </LightTooltip>
                { params.value }
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
                { params.value.map((tech: string) => (<span className='tag'>{ tech }</span>)) }
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
            <Box className={ 'center' }>
                <Stack direction={ 'row' } spacing={ 2 }>
                    <IconButton color="primary" component="span">
                        <EditOutlined onClick={ () => window.location.href = "/referrals/edit/" + params.id }/>
                    </IconButton>
                    <IconButton color="error" component="span">
                        <DeleteOutlined onClick={ () => window.location.href = "#" }/>
                    </IconButton>
                </Stack>
            </Box>
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
    const [referralRecords, setReferralRecords] = useState<Referral[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => await fetch('https://jsonplaceholder.typicode.com/users');
        fetchData()
            .then(response => response.json())
            .then(data => handleCorrectData(data))
    }, []);

    const handleCorrectData = (referrals: any): void => {
        const records: Referral[] = referrals.map((data: any) => {
            return {
                id: data.id,
                referredBy: 'Mark Goodman',
                fullName: `${ data.name } ${ data.username }`,
                phoneNumber: '5555555555',
                email: data.email,
                linkedinUrl: 'https://www.linkedin.com/',
                cvUrl: '#',
                techStacks: ['Typescript', 'Java', 'Python', 'React', 'Javascript', 'Scala', 'MySQL', 'Angular', 'QA'],
                taRecruiter: 'John',
                referralStatusId: 'in progress',
            }
        });

        setReferralRecords(records);
        setLoading(false);
    }

    const [pageSize, setPageSize] = useState(5);

    return (
        <Stack spacing={ 4 } direction="column">
            <Grid height={ '50vh' }>
                <DataGrid
                    key="referralDataGrid"
                    components={ {
                        LoadingOverlay: LinearProgress,
                        Toolbar: CustomToolbar,
                    } }
                    rows={ referralRecords }
                    columns={ referralDataGridColumns }
                    getRowHeight={ () => "auto" }
                    pageSize={ pageSize }
                    onPageSizeChange={ (newPageSize) => setPageSize(newPageSize) }
                    rowsPerPageOptions={ [5, 10, 50, 100] }
                    loading={ loading }
                />
            </Grid>
        </Stack>
    );
}
