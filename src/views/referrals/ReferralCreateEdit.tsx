//Dependencies
import * as React from 'react';
import {
    FunctionComponent,
    useEffect,
    useState,
} from "react";
import { ReferralForm } from "../../components/referral";
import {
    Chip,
    Divider,
    Grid,
    CircularProgress
} from "@mui/material";
import { useParams } from "react-router-dom";
import './referralCreateEdit.scss';

const ReferralCreateEdit: FunctionComponent = () => {
    const { id }: any = useParams();
    const [referralData, setReferralData] = useState<any>();
    const [isLoaded, setIsLoaded] = useState(false);
    const [title, titleEdit] = useState("CREATE A REFERRAL");
    const getData = async () => {
        if (id) {
            const data = await fetch(`https://jsonplaceholder.typicode.com/users/${ id }`);
            const referral = await data.json();
            setReferralData(referral);
            titleEdit("EDIT A REFERRAL");
        }
        setIsLoaded(true);
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="main">
            <Divider>
                <Chip label={ title }></Chip>
            </Divider>
            {
                !isLoaded ?
                    <Grid container spacing={ 2 } minHeight={ 60 } padding={ 10 }>
                        <Grid item md={ 12 }>
                            <CircularProgress color="primary"/>
                        </Grid>
                    </Grid> :
                    <ReferralForm
                        status={ referralData?.referralStatusId }
                        fullName={ referralData?.name + ' ' + referralData?.username || '' }
                        referred_by={ referralData?.referred_by || referralData?.username }
                        taRecruiter={ referralData?.taRecruiter || 'John' }
                        linkedin={ referralData?.name || '' }
                        cv={ referralData?.website || '' }
                        phone={ referralData ? '52555555555' : '' }
                        email={ referralData?.email || '' }
                        techStacks={ ['Typescript', 'Java', 'Python', 'React', 'Javascript', 'Scala', 'MySQL', 'Angular', 'QA'] }
                        comments={ referralData?.comments }
                    />
            }
        </div>
    );
}

export default ReferralCreateEdit;
