import './referralForm.scss'
import * as React from 'react';
import {
    useState
} from 'react';
import { useParams } from "react-router-dom";
import PhoneInput from 'react-phone-input-2';
import { TagsInput } from "react-tag-input-component";
import * as EmailValidator from 'email-validator';
import {
    Add,
    Restore,
    UndoOutlined
} from '@mui/icons-material';
import {
    Button,
    FormControl,
    FormGroup,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextareaAutosize,
    TextField,
    Grid
} from '@mui/material';

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

export default function ReferralForm(props: ReferralFormProps) {

    const initialReferralFormState: ReferralFormProps = {
        status: '',
        fullName: '',
        referred_by: '',
        taRecruiter: '',
        phone: '+52',
        email: '',
        linkedin: '',
        cv: '',
        techStacks: [],
        comments: ''
    };

    const handleProps = () => {
        if (props) {
            setReferral({
                status: id ? props.status : '',
                fullName: id ? props.fullName : '',
                referred_by: props.referred_by,
                taRecruiter: id ? props.taRecruiter : '',
                phone: id ? props.phone : "+52",
                email: id ? props.email : '',
                linkedin: props.linkedin ? `https://www.linkedin.com/in/${ props.linkedin }/` : '',
                cv: id ? props.cv : '',
                techStacks: props.techStacks,
                comments: props.comments
            });
        }
    };

    const { id }: any = useParams();
    const recruiters: string[] = ['Ana', 'Jack', 'Mary', 'John', 'Krish', 'Navin'];

    const [referral, setReferral] = useState<ReferralFormProps>({
        status: id ? props.status : '',
        fullName: id ? props.fullName : '',
        referred_by: props.referred_by,
        taRecruiter: id ? props.taRecruiter : '',
        phone: id ? props.phone : "+52",
        email: id ? props.email : '',
        linkedin: props.linkedin ? `https://www.linkedin.com/in/${ props.linkedin }/` : '',
        cv: id ? props.cv : '',
        techStacks: props.techStacks,
        comments: props.comments
    });

    const clearState = () => {
        setReferral(initialReferralFormState);
        setReferral(prevState => ({ ...prevState }));
    };

    const handleInputValidations = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let { id, value } = event.currentTarget;

        switch (id) {
            case 'fullName':
                value = value.replace(/[^a-zA-Z\s]/gi, "");
                break;
            default:
                break;
        }
        setReferral(prevState => ({ ...prevState, [id]: value }));
    }

    const handleLinkedinOnFocus = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = event.currentTarget;
        setReferral(prevState => ({ ...prevState, [id]: value.slice(28, -1) }));
    }

    const handleLinkedinOnBlur = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = event.currentTarget;

        if (value.length < 1) {
            setReferral(prevState => ({ ...prevState, [id]: '' }));
        } else {
            setReferral(prevState => ({ ...prevState, [id]: `https://www.linkedin.com/in/${ value }/` }));
        }
    }

    const isValidURL = (url: string) => {
        var res = url.match(/[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/ig);
        return (res !== null)
    };

    const [tags, setTags] = useState(id ? props.techStacks : []);

    const [open, setOpen] = useState(false);

    const handleSelection = (event: any) => {
        setReferral(prevState => ({ ...prevState, taRecruiter: event.target.value }));
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <Stack spacing={ 2 } direction="column">
            <div className="referral-base">
                <form className='referral-form'>
                    <FormGroup>
                        { id && <input id="id" type="text" value={ id } hidden/> }
                        <Stack spacing={ 4 } direction={ 'column' }>
                            <Stack spacing={ 4 } direction="row">
                                <Grid container spacing={ 2 }>
                                    <Grid item xs={ 12 } md={ id ? 6 : 6 }>
                                        <TextField
                                            required
                                            fullWidth
                                            id="fullName"
                                            type="text"
                                            label="Full Name"
                                            variant="outlined"
                                            onChange={ handleInputValidations }
                                            value={ referral.fullName }
                                        />
                                    </Grid>
                                    <Grid item xs={ 12 } md={ id ? 4 : 6 }>
                                        <TextField
                                            required
                                            fullWidth
                                            id="referred_by"
                                            type="text"
                                            label="Refered by"
                                            variant="outlined"
                                            onChange={ handleInputValidations }
                                            value={ referral.referred_by }
                                        />
                                    </Grid>
                                    <Grid item xs={ 12 } md={ 2 }>
                                        { id && <div>
                                            <FormControl fullWidth>
                                                <InputLabel id="ta_recruiter_label">TA Recruiter</InputLabel>
                                                <Select
                                                    id="ta_recruiter"
                                                    labelId="ta_recruiter_label"
                                                    open={ open }
                                                    onClose={ handleClose }
                                                    onOpen={ handleOpen }
                                                    value={ referral.taRecruiter }
                                                    label="Ta"
                                                    onChange={ handleSelection }
                                                >
                                                    <MenuItem value={ 'None' }><em>None</em></MenuItem>
                                                    { recruiters.map(name => (
                                                        <MenuItem value={ name }>{ name }</MenuItem>
                                                    )) }
                                                </Select>
                                            </FormControl>
                                        </div> }
                                    </Grid>
                                </Grid>
                            </Stack>
                            <Stack spacing={ 4 } direction="row">
                                <Grid container spacing={ 2 }>
                                    <Grid item xs={ 12 } md={ 6 }>
                                        <PhoneInput
                                            inputProps={ {
                                                name: 'phone',
                                                required: true,
                                                autoFocus: true
                                            } }
                                            country={ 'mx' }
                                            value={ referral.phone }
                                            // onChange={handleNumber}
                                        />
                                    </Grid>
                                    <Grid item xs={ 12 } md={ 6 }>
                                        <TextField
                                            required
                                            fullWidth
                                            id="email"
                                            type="email"
                                            label="Email"
                                            variant="outlined"
                                            defaultValue="Email"
                                            value={ referral.email }
                                            onChange={ handleInputValidations }
                                            error={ (referral.email.trim().length === 0 ? false : !EmailValidator.validate(referral.email)) }
                                        />
                                    </Grid>
                                </Grid>
                            </Stack>
                            <Stack spacing={ 4 } direction="row">
                                <Grid container spacing={ 2 }>
                                    <Grid item xs={ 12 } md={ 6 }>
                                        <TextField
                                            fullWidth
                                            id="linkedin"
                                            type="text"
                                            label="Linkedin UserName"
                                            variant="outlined"
                                            onChange={ handleInputValidations }
                                            onFocus={ handleLinkedinOnFocus }
                                            onBlur={ handleLinkedinOnBlur }
                                            value={ referral.linkedin }
                                        />
                                    </Grid>
                                    <Grid item xs={ 12 } md={ 6 }>
                                        <TextField
                                            required
                                            fullWidth
                                            id="cv"
                                            type="text"
                                            label="CV URL"
                                            variant="outlined"
                                            onChange={ handleInputValidations }
                                            value={ referral.cv }
                                            error={ referral.cv.trim().length === 0 ? false : !isValidURL(referral.cv) }
                                        />
                                    </Grid>
                                </Grid>
                            </Stack>
                            <Stack spacing={ 4 } direction="column">
                                <Grid container spacing={ 2 }>
                                    <Grid item xs={ 12 } md={ 12 }>
                                        <TagsInput
                                            name="tech_stacks"
                                            placeHolder="Add stack"
                                            value={ tags }
                                            onChange={ setTags }
                                        />
                                        <span className="rti--instruction">press enter to add new tag</span>
                                    </Grid>
                                </Grid>
                            </Stack>
                            <Stack spacing={ 4 } direction="row">
                                <Grid container spacing={ 2 }>
                                    <Grid item xs={ 12 } md={ 12 }>
                                        <TextareaAutosize
                                            id="comment"
                                            maxRows={ 10 }
                                            aria-label="minimum height"
                                            placeholder="Comments"
                                            style={ { width: '94%', height: 180 } }
                                            value={ referral.comments }
                                            onChange={ handleInputValidations }
                                        />
                                    </Grid>
                                </Grid>
                            </Stack>
                            <Stack spacing={ 4 } direction="column">
                                <div className='referral-center'>
                                    <Stack spacing={ 2 } direction="row">
                                        <Button type='reset' variant="contained" endIcon={ <Restore/> }
                                                onClick={ clearState }>
                                            Clear
                                        </Button>
                                        { id && <Button type='reset' variant="contained" endIcon={ <UndoOutlined/> }
                                                        onClick={ handleProps }>
                                            Undo
                                        </Button> }
                                        <Button type='submit' variant="contained" endIcon={ <Add/> }>
                                            Save
                                        </Button>
                                    </Stack>
                                </div>
                            </Stack>
                        </Stack>
                    </FormGroup>
                </form>
            </div>
        </Stack>
    );
}
