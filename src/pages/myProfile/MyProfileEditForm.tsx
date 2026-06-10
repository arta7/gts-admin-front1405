import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserEditForm } from './UserEditForm';
import axios from '../../utils/axios';
import baseUrl from '../../utils/Util';
import { User } from '../User/UserList';
import { useAuth } from '../../contexts/AuthContext';
const webService = '/user/v1/api';

const MyProfileEditForm = ({ profile }: { profile: User }) => {
  const navigate = useNavigate();
  const { state: locationState } = useLocation();
  const context: any = useAuth();
  const redirect = locationState ? locationState.redirectTo.pathname : `${baseUrl}/`;
  const { handleSubmit, getValues, formState: { errors }, control } = useForm({
    defaultValues: profile
  });

  const onSubmit = () => {
    const entityToSave = getValues();
    axios.put(`${webService}/change/${profile.id}`, entityToSave).then((response) => {
      const updatedUser = response.data.result;
      context.editProfile({ firstName: updatedUser.firstName, lastName: updatedUser.lastName, pd: updatedUser.pd })
      navigate(redirect)
    });
  }


  return (
    <Box padding={2}>
      {
        <form onSubmit={handleSubmit(onSubmit)} noValidate={true}>
          <UserEditForm control={control} errors={errors} getValues={getValues} />
          <Box sx={{ display: 'flex', mt: '2rem', justifyContent: 'end' }}>
            <Button type="submit" variant='contained'>{'ثبت'}</Button>
            <Button onClick={() => navigate(redirect)}>{'انصراف'}</Button>
          </Box>
        </form>
      }
    </Box>
  )
}

export default MyProfileEditForm