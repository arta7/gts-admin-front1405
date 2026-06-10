import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData, useNavigate } from 'react-router-dom';
import GridLoader from 'react-spinners/GridLoader';
import { UserEditForm } from './UserEditForm';
import { AuthContext } from '../../contexts/AuthContext';
import { useAsync } from '../../hooks/useAsync';
import axios from '../../utils/axios';
import MyProfileEditForm from './MyProfileEditForm';
const finsUserWebService = '/user/v1/api/find';

const MyProfile = () => {
  const { user } = useContext(AuthContext) as any;
  
  const { run, data, isLoading, isIdle, isError, isSuccess } = useAsync(null);

  useEffect(() => {
    if(user){
      const promise = axios.get(`${finsUserWebService}/${user!.id}`).then(response => {
        return response.data.result;
      })
      run(promise);
    }
  }, [user]);


  if (isLoading || isIdle) {
    return <GridLoader color="#36d7b7" />
  } 

  return (
    <Paper sx={{ padding: 8 }}>
      {
        data && <MyProfileEditForm profile={data}/>
      }
    </Paper>
  )
}

export default MyProfile