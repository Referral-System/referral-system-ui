//Dependencies
import React, { useEffect, useState } from "react";
import ReferralForm from "../../components/referralform/ReferralForm";
import './index.scss'
import { useParams } from "react-router-dom";
import { Chip, CircularProgress, Divider, Grid } from "@mui/material";

const ReferralEdit = () => {
    const {id}: any = useParams();

    const [referralData, setReferralData] = useState<any>();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        getData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getData = async () => {
        if (id) {
            const data = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
            const referral = await data.json();
            console.log(referral);
            setReferralData(referral);
        }
        setIsLoaded(true);
    }

    return (
        <>
            <div className="main">
                <Divider>
                    <Chip label="EDIT A REFERRAL"></Chip>
                </Divider>
                {
                    !isLoaded?
                        <Grid container spacing={2} minHeight={60} padding={10}>
                            <Grid item md={12}>
                                <CircularProgress color="primary" />
                            </Grid>
                        </Grid> :
                        <ReferralForm
                            status = { referralData?.referral_status_id }
                            fullName = { referralData?.name + ' '  + referralData?.username || '' }
                            referred_by = { referralData?.referred_by || referralData?.username }
                            ta_recruiter = { referralData?.ta_recruiter || 'John' }
                            linkedin = { referralData?.name || '' }
                            cv = { referralData?.website || '' }
                            phone = { referralData? '52555555555' : ''}
                            email = { referralData?.email || '' }
                            tech_stacks = { ['Typescript','Java','Python','React','Javascript','Scala','MySQL','Angular','QA'] }
                        />
                }
            </div>
        </>
    );
}
export default ReferralEdit;
