import * as React from 'react';
import {Link} from "react-router-dom";
import { Button, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import './button.scss';

export default function CreateButton() {
  return (
    <Stack spacing={2} direction="row">
      <div className='apex-button'>
          <Link to={`/referrals/create`}>
              <Button type='submit' variant="contained" endIcon={<AddIcon />}>
                  Create Referral
              </Button>
          </Link>
      </div>
    </Stack>
  );
}
