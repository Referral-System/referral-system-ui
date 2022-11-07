import * as React from "react";
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import {Box, Button} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import './users.scss'
import { UsersDataGrid } from "../../components/user";

const Users = () => {
    return (
        <>
            <div className="main">
                <Divider>
                    <Chip label="USERS"></Chip>
                </Divider>
                <br></br>
                <Box height={'500px'}>
                    <UsersDataGrid/>
                </Box>
            </div>
        </>
    );
}
export default Users;
