import * as React from 'react';
import { Button, FormGroup, Dialog, DialogContent, TextField, DialogActions } from '@mui/material';
import { Controller, useForm } from "react-hook-form";
import axios from 'axios';
import { CheckboxControl } from '../../components/FormControl/CheckBoxControl';
import { TextFieldControl } from '../../components/FormControl/TextFieldControl';
import { useLoaderData, useRevalidator } from "react-router-dom";
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

// export const workgroupWebService = '/base/v1/api/workgroup';

// const createWorkGroup = () => ({ name: '', isActive: false, isManager: false }) as WorkGroup;

// export const loader = () => {
//     console.log("WorkGrouploader")
//     return axios.get(`${workgroupWebService}/inquiry`).then(response => {
//         return response.data.result;
//     })
// }

export default function UserUnitGroupEditForm({ onClose, open, entity, webService, UserId }: any) {

  const { handleSubmit, getValues, formState: { errors }, control } = useForm({
    defaultValues: entity
  });
  const [currentValue, setcurrentValue] = React.useState<({ organizationId: number })[]>([]);


  const onCancel = () => {
    onClose()
  }

  const onSubmit = () => {
    let promise;
    const entityToSave = { "UserId": UserId, "json": `${JSON.stringify(currentValue)}` }
    console.log('entityToSave', entityToSave)
    promise = axios.post(`${webService}`, entityToSave);

    promise.then((response) => {
      console.log('response', response)
      toast.success('اطلاعات پرونده با موفقیت ثبت شد')
      onClose(true);
    });
  }

  const GetUserAccess = () => {
    let promise = axios.post(`/user/v1/api/getUserWorkGroup`, { "UserId": UserId });
    promise.then((response) => {
      console.log('response User Value : ', control)
      var data=[]
      for(let i=0;i<response.data.result.length;i++)
        {
      let value = { organizationId: response.data.result[i].organizationId }

      data.push(value);
        }


        setcurrentValue(data);
    });
  }

  React.useEffect(() => {
    GetUserAccess()
  }, [])


  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate={true} >
        <DialogContent>
          {/* <TextFieldControl name="name" control={control} label="نام" margin="dense" rules={{ required: "*" }} autoFocus required={true} errors={errors} /> */}
          <FormGroup>
            {
              entity.map((item: WorkGroupForEdit) =>
                <CheckboxControl name={item.id} label={item.name} control={control} onchange={() => {
                  if (currentValue?.filter(a => a?.organizationId == item.id).length > 0) {
                    let value = currentValue.filter(a => a?.organizationId !== item.id);
                    console.log('value', value)
                    setcurrentValue(value);
                  }
                  else {
                    let value = { organizationId: item.id }

                    setcurrentValue([...currentValue, value]);

                    console.log('currentValue', currentValue)
                  }

                }} listcheckvalue={currentValue.filter(a=>a.organizationId == item.id).length > 0 ? true:false} />
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


