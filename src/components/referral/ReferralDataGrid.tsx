import './referralDataGrid.scss';
import React, {
    useEffect,
    useState
} from "react";
import {Link} from "react-router-dom";
import {
    DataGrid,
    GridActionsCellItem,
    GridRenderCellParams
} from '@mui/x-data-grid';
import {
    Delete,
    DeleteOutlined,
    EditOutlined,
    EmailOutlined, FileCopy,
    FileOpenOutlined,
    LinkedIn, Security
} from '@mui/icons-material/';
import {
    Box,
    Chip, Grid,
    IconButton,
    Stack
} from "@mui/material";
import {Referral} from "../../views/referrals/referral";

type chipColor = "primary" | "success" | "error" | "default" | "secondary" | "info" | "warning" | undefined;

const progress = (referralStatusId: string | undefined): chipColor => {
    console.log('referralstatusid', referralStatusId);
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

const referralDataGridColumns: any = [
    {field: 'id', headerName: "ID", filterable: false},
    {field: "fullName", headerName: "Full Name", width: 220},
    {
        field: "linkedinUrl", headerName: "Linkedin", width: 74, renderCell: (params: GridRenderCellParams<string>) => (
            <IconButton color="primary" component="span">
                <Link to={params.value}>
                    <div className='icons'><LinkedIn/></div>
                </Link>
            </IconButton>
        ),
    },
    {
        field: "cvUrl", headerName: "CV", width: 30, renderCell: (params: any) => (
            <IconButton color="primary" component="span">
                <Link to={params.value}>
                    <div className='icons'><FileOpenOutlined/></div>
                </Link>
            </IconButton>
        ),
    },
    {field: "phoneNumber", headerName: "Phone", width: 100},
    {
        field: "email", headerName: "Email", width: 254, renderCell: (params: any) => (
            <div className='email-icon'>
                <IconButton className='icons' color="primary" component="span" onClick={() => {
                    navigator.clipboard.writeText(params.value)
                    console.log('copied');
                }}>
                        <EmailOutlined/>
                </IconButton>
                {params.value}
            </div>

        ),
    },
    {
        field: "techStacks", headerName: "Tech Stacks", width: 310, renderCell: (params: any) => (
            <div className='tech_tag_container'>
                {params.value.map((tech: string) => (<span className='tag'>{tech}</span>))}
            </div>
        ),
    },
    {field: "referredBy", headerName: "Referred_by", width: 180},
    {field: "taRecruiter", headerName: "Ta Recruiter", width: 180},
    // {
    //     field: "id", headerName: "Actions", width: 120, renderCell: (params: any) => (
    //         <Box className={'center'} sx={{'& button': {m: 1}}}>
    //             <Stack direction={'row'} spacing={1}>
    //                 <IconButton color="primary" component="span">
    //                     <Link to={`/referrals/edit/${params.value}`}>
    //                         <EditOutlined/>
    //                     </Link>
    //                 </IconButton>
    //                 <IconButton color="error" component="span">
    //                     <Link to={'#'}>
    //                         <DeleteOutlined/>
    //                     </Link>
    //                 </IconButton>
    //             </Stack>
    //         </Box>
    //     ),
    // },
    {
        field: 'actions',
        headerName: "Actions",
        type: "actions",
        width: 150,
        getActions: (params: Referral) => [
            <GridActionsCellItem
                icon={<Delete/>}
                label="Delete"
                onClick={() => console.log(params.id)}
            />,
            <GridActionsCellItem
                icon={<Security/>}
                label="Toggle Admin"
                onClick={() => console.log(params.id)}
            />,
            <GridActionsCellItem
                icon={<FileCopy/>}
                label="Duplicate User"
                onClick={() => console.log(params.id)}
            />
        ]
    },
    {
        field: 'referralStatusId',
        headerName: 'Referral Status ID',
        type: "singleSelect",
        width: 120,
        editable: true,
        renderCell: (params: GridRenderCellParams<string>) => {
            return (
                <Chip
                    className={"center"}
                    label={params.value}
                    size="small"
                    variant="outlined"
                    color="primary"
                />
            );
        },
        valueOptions: () => {
            return ['in progress', 'hired', 'closed'];
        }
    },
];

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
                fullName: `${data.name} ${data.username}`,
                phoneNumber: '5555555555',
                email: data.email,
                linkedinUrl: '#',
                cvUrl: '#',
                techStacks: ['Typescript', 'Java', 'Python', 'React', 'Javascript', 'Scala', 'MySQL', 'Angular', 'QA'],
                taRecruiter: 'John',
                referralStatusId: 'in progress',
            }
        });

        setReferralRecords(records);
        setLoading(false);
    }

    const [pageSize, setPageSize] = React.useState(5);

    return (
        <Stack spacing={4} direction="column" key="stackReferralDataGrid">
            <Grid item xs={6} height={'50vh'} key="gridReferral">
                <DataGrid
                    key="referralDataGrid"
                    rows={referralRecords}
                    columns={referralDataGridColumns}
                    // initialState={{
                    //     columns: {
                    //         columnVisibilityModel: {
                    //             // Hide columns status and traderName, the other columns will remain visible
                    //             id: false,
                    //         },
                    //     },
                    // }}
                    getRowHeight={() => "auto"}
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    rowsPerPageOptions={[5, 10, 50, 100]}
                    loading={loading}
                />
            </Grid>
        </Stack>
    );
}
