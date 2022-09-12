//Dependencies
import React from "react";
import ApexTable from "../../components/table/table";
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import './myreferrals.scss'

const Myreferrals = () => {
    return (
        <>
            <div className="main">
                <Divider>
                    <Chip label="MY REFERRALS"></Chip>
                </Divider>
                <div className='apex-button'>
                    <Link to={`/referrals/create`}>
                        <Button type='submit' variant="contained" endIcon={ <AddIcon /> }>
                            Create Referral
                        </Button>
                    </Link>
                </div>
                <ApexTable/>
            </div>
        </>
    );
}
export default Myreferrals;
