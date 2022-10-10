//Dependencies
import React from "react";
import { ReferralDataGrid } from "../../components/referral";
import { Link } from "react-router-dom";
import { Button, Chip, Divider } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import './referrals.scss'

const Referrals = () => {
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
                <ReferralDataGrid/>
            </div>
        </>
    );
}
export default Referrals;
