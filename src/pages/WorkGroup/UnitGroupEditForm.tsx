import * as React from 'react';
import { Button, FormGroup, Dialog, DialogContent, TextField, DialogActions } from '@mui/material';
import { Controller, useForm } from "react-hook-form";
import axios from 'axios';
import { CheckboxControl } from '../../components/FormControl/CheckBoxControl';
import { TextFieldControl } from '../../components/FormControl/TextFieldControl';
import { useLoaderData, useRevalidator } from "react-router-dom";
import { LocalConvenienceStoreOutlined } from '@mui/icons-material';
import { toast } from 'react-toastify'

export type WorkGroup = {
    id: number,
    name: string,
    isManager: boolean,
    isActive: boolean
}

interface WorkGroupForEdit {
  id: number;
  name: string;
}

export const workgroupWebService = '/base/v1/api/workgroup';

const createWorkGroup = () => ({ name: '', isActive: false, isManager: false }) as WorkGroup;

export const loader = () => {
    console.log("WorkGrouploader")
    return axios.get(`${workgroupWebService}/inquiry`).then(response => {
        return response.data.result;
    })
}

export default function UnitGroupEditForm({ onClose, open, entity, webService,UserId }: any) {

  const { handleSubmit, getValues, formState: { errors }, control } = useForm({
    defaultValues: entity
  });
  const[currentValue,setcurrentValue] = React.useState(0);

  const rows = useLoaderData();

  const onCancel = () => {
    onClose()
  }

  const onSubmit = () => {
    let promise;
    const entityToSave = {"UserId":UserId,"UnitId":currentValue}
    console.log('entityToSave',entityToSave)
      promise = axios.post(`${webService}`, entityToSave);
    
    promise.then((response) => {
        console.log('response',response)
        toast.success('اطلاعات پرونده با موفقیت ثبت شد')
      onClose(true);
    });
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate={true}>
        <DialogContent>
          {/* <TextFieldControl name="name" control={control} label="نام" margin="dense" rules={{ required: "*" }} autoFocus required={true} errors={errors} /> */}
          <FormGroup>
            {
               entity.map((item: WorkGroupForEdit) => 
                   <CheckboxControl name={item.id} label={item.name} control={control} onchange={()=>{setcurrentValue(item.id)}}
                     currentValue={currentValue}  />
                    )
            }
               
                
            
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button type="submit">{'ثبت'}</Button>
          <Button onClick={onCancel}>{'انصراف'}</Button>
        </DialogActions>
      </form>
    </Dialog>
  );

}


