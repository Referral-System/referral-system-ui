import './referralForm.scss'
import * as React from 'react';
import {
    useState
} from 'react';
import {useParams} from "react-router-dom";
import PhoneInput from 'react-phone-input-2';
import {TagsInput} from "react-tag-input-component";
import * as EmailValidator from 'email-validator';
import {
    Add,
    Restore,
    UndoOutlined
} from '@mui/icons-material';
import {
    Button,
    TextField,
    Grid, Box
} from '@mui/material';
import {useFormik} from "formik";
import * as Yup from 'yup';

interface ReferralFormProps {
    status: string;
    fullName: string;
    referred_by: string;
    taRecruiter: string;
    phone: string;
    email: string;
    linkedin: string;
    cv: string;
    techStacks: string[];
    comments: string;
}

interface ReferralFormState {
    status: string;
    fullName: string;
    referred_by: string;
    taRecruiter: string;
    phone: string;
    email: string;
    linkedin: string;
    cv: string;
    techStacks: string[];
    comments: string;
}

interface ReferralFormParams {
    id: string;
}

export default function ReferralForm(props: ReferralFormProps) {
    const handleProps = () => {
        if (props) {
            setReferral({
                status: id ? props.status : '',
                fullName: id ? props.fullName : '',
                referred_by: props.referred_by,
                taRecruiter: id ? props.taRecruiter : '',
                phone: id ? props.phone : "+52",
                email: id ? props.email : '',
                linkedin: props.linkedin ? `https://www.linkedin.com/in/${props.linkedin}/` : '',
                cv: id ? props.cv : '',
                techStacks: props.techStacks,
                comments: props.comments
            });
        }
    };

    const {id}: ReferralFormParams = useParams();
    const recruiters: string[] = ['Ana', 'Jack', 'Mary', 'John', 'Krish', 'Navin'];

    const [referral, setReferral] = useState<ReferralFormState>({
        status: id ? props.status : '',
        fullName: id ? props.fullName : '',
        referred_by: props.referred_by,
        taRecruiter: id ? props.taRecruiter : '',
        phone: id ? props.phone : "+52",
        email: id ? props.email : '',
        linkedin: props.linkedin ? `https://www.linkedin.com/in/${props.linkedin}/` : '',
        cv: id ? props.cv : '',
        techStacks: props.techStacks,
        comments: props.comments
    });

    const handleLinkedinOnFocus = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {id, value} = event.currentTarget;
        setReferral(prevState => ({...prevState, [id]: value.slice(28, -1)}));
    }

    const handleLinkedinOnBlur = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {id, value} = event.currentTarget;

        if (value.length < 1) {
            setReferral(prevState => ({...prevState, [id]: ''}));
        } else {
            setReferral(prevState => ({...prevState, [id]: `https://www.linkedin.com/in/${value}/`}));
        }
    }

    const isValidURL = (url: string) => {
        var res = url.match(/[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/ig);
        return (res !== null)
    };

    const [tags, setTags] = useState(id ? props.techStacks : []);

    const saveReferralFormik = useFormik({
        initialValues: {
            fullName: '',
            referredBy: '',
            email: '',
            taRecruiter: '',
            linkedinUserName: '',
            cvUrl: '',
            comments: '',
            phone: ''
        },
        validationSchema: Yup.object({
            fullName: Yup.string().required('Full name is required'),
            referredBy: Yup.string().required('Referred by is required'),
            email: Yup.string().email('Incorrect email').required('Email is required'),
            linkedinUserName: Yup.string().required('Linkedin username is required'),
            cvUrl: Yup.string().required('CV Url is required'),
            comments: Yup.string(),
            phone: Yup.string()
        }),
        onSubmit: (values: any) => {
            // send to back
            console.log('form values', {
                ...values,
                tags
            });
        },
    });

    return (
        <Box id="saveReferralForm" noValidate component={'form'} onSubmit={saveReferralFormik.handleSubmit} width={'100%'}
             sx={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
            <Grid container spacing={2} sx={{marginTop: '20px', justifyContent: 'center', width: '90%'}}>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        fullWidth
                        id="fullName"
                        name="fullName"
                        onChange={saveReferralFormik.handleChange}
                        value={saveReferralFormik.values.fullName}
                        type="text"
                        label="Full Name"
                        variant="outlined"
                        error={saveReferralFormik.touched.fullName && Boolean(saveReferralFormik.errors.fullName)}
                        helperText={saveReferralFormik.touched.fullName && saveReferralFormik.errors.fullName}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        fullWidth
                        id="referredBy"
                        name="referredBy"
                        onChange={saveReferralFormik.handleChange}
                        value={saveReferralFormik.values.referredBy}
                        type="text"
                        label="Refered by"
                        variant="outlined"
                        error={saveReferralFormik.touched.referredBy && Boolean(saveReferralFormik.errors.referredBy)}
                        helperText={saveReferralFormik.touched.referredBy && saveReferralFormik.errors.referredBy}
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <PhoneInput
                        inputProps={{
                            required: true,
                            name: 'phone',
                            autoFocus: true,
                            id: 'phone',
                            error: true,
                            helperText: 'Phone is required',
                            onChange: saveReferralFormik.handleChange
                        }}
                        country={'mx'}
                        value={saveReferralFormik.values.phone}
                        isValid={saveReferralFormik.touched.phone && Boolean(saveReferralFormik.errors.phone)}
                        defaultErrorMessage={'Phone required'}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextField
                        required
                        fullWidth
                        id="email"
                        name="email"
                        onChange={saveReferralFormik.handleChange}
                        value={saveReferralFormik.values.email}
                        type="email"
                        label="Email"
                        variant="outlined"
                        error={saveReferralFormik.touched.email && Boolean(saveReferralFormik.errors.email)}
                        helperText={saveReferralFormik.touched.email && saveReferralFormik.errors.email}
                    />
                </Grid>
                <Grid item xs={12} md={5}>
                    <TextField
                        required
                        fullWidth
                        id="linkedinUserName"
                        name="linkedinUserName"
                        onChange={saveReferralFormik.handleChange}
                        value={saveReferralFormik.values.linkedinUserName}
                        type="text"
                        label="Linkedin UserName"
                        variant="outlined"
                        onFocus={handleLinkedinOnFocus}
                        onBlur={handleLinkedinOnBlur}
                        error={saveReferralFormik.touched.linkedinUserName && Boolean(saveReferralFormik.errors.linkedinUserName)}
                        helperText={saveReferralFormik.touched.linkedinUserName && saveReferralFormik.errors.linkedinUserName}
                    />
                </Grid>
                <Grid item xs={12} md={6} sx={{paddingTop: '0 !important', display: 'flex', alignItems: 'center'}}>
                    <TextField
                        required
                        fullWidth
                        id="cvUrl"
                        name="cvUrl"
                        onChange={saveReferralFormik.handleChange}
                        value={saveReferralFormik.values.cvUrl}
                        type="text"
                        label="CV URL"
                        variant="outlined"
                        error={saveReferralFormik.touched.cvUrl && Boolean(saveReferralFormik.errors.cvUrl)}
                        helperText={saveReferralFormik.touched.cvUrl && saveReferralFormik.errors.cvUrl}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TagsInput
                        name="tech_stacks"
                        placeHolder="Add stack"
                        value={tags}
                        onChange={setTags}
                    />
                    <span className="rti--instruction">press enter to add new tag</span>
                </Grid>
                <Grid item xs={12} md={12}>
                    <TextField
                        id="comments"
                        name="comments"
                        onChange={saveReferralFormik.handleChange}
                        value={saveReferralFormik.values.comments}
                        label="Comments"
                        multiline
                        rows={4}
                        style={{width: '100%'}}
                    />
                </Grid>
            </Grid>
            <Box sx={{width: '350px', display: 'flex', justifyContent: 'space-around', padding: '20px'}}>
                <Button type='reset' variant="contained" endIcon={<UndoOutlined/>}
                        onClick={handleProps}>
                    Cancel
                </Button>
                <Button type='reset' variant="contained" endIcon={<Restore/>}
                        onClick={() => saveReferralFormik.resetForm()}>
                    Clear
                </Button>
                <Button type='submit' variant="contained" endIcon={<Add/>}>
                    Save
                </Button>
            </Box>
        </Box>);
}
