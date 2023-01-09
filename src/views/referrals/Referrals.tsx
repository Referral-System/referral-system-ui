import * as React from "react";
import { ReferralDataGrid } from "../../components/referral";
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import {Box, Button} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import './referrals.scss'

const Referrals = () => {
    return (
        <>
            <div className="main">
                <Divider>
                    <Chip label="MY REFERRALS"></Chip>
                </Divider>
                <div className='create-referral-button '>
                    <Button
                        type='submit'
                        variant="contained"
                        endIcon={ <AddIcon/> }
                        onClick={ () => {
                            window.location.href = '/referrals/create'
                        } }>
                        Create Referral
                    </Button>
                </div>
                <Box height={'500px'}>
                    <ReferralDataGrid/>
                </Box>
            </div>
        </>
    );
}
export default Referrals;
