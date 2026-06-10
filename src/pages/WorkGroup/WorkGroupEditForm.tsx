import * as React from 'react';
import { Button, FormGroup, Dialog, DialogContent, TextField, DialogActions } from '@mui/material';
import { Controller, useForm } from "react-hook-form";
import axios from 'axios';
import { CheckboxControl } from '../../components/FormControl/CheckBoxControl';
import { TextFieldControl } from '../../components/FormControl/TextFieldControl';
export default function WorkGroupEditForm({ onClose, open, entity, webService }: any) {

  const { handleSubmit, getValues, formState: { errors }, control } = useForm({
    defaultValues: entity
  });

  const onCancel = () => {
    onClose()
  }

  const onSubmit = () => {
    let promise;
    const entityToSave = getValues();
  console.log('entity.id',entityToSave)
    if (entity.id) {
      promise = axios.put(`${webService}/change/${entity.id}`, entityToSave);
    }
    else {
      promise = axios.post(`${webService}/create`, entityToSave);
    }
    promise.then((response) => {
      onClose(true);
    });
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate={true}>
        <DialogContent>
          <TextFieldControl name="name" control={control} label="نام" margin="dense" rules={{ required: "*" }} autoFocus required={true} errors={errors} />
          <FormGroup>
            <CheckboxControl name="isManager" label="سطح مدیریت" control={control}  currentValue={null}  onchange={null} />
            <CheckboxControl name="isActive" label="فعال" control={control} currentValue={null}/>
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


