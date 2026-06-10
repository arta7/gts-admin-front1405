import * as React from 'react';
import { Button, Dialog, DialogContent, TextField, DialogActions, Grid, Box, Typography, Paper } from '@mui/material';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { TextFieldControl } from '../../components/FormControl/TextFieldControl';
import { CheckListboxControl } from '../../components/FormControl/CheckboxListControl';
import { DialogTitle } from './DialogTitle';


export default function DefinitionEditForm({ onClose, open, entity, webService, baseType, refreshGrid, subSystems }: any) {
    const { handleSubmit, getValues, formState: { errors }, control, reset } = useForm({
        defaultValues: entity
    });

    const [selectedSubSystemIds, setSelectedSubSystemIds] = React.useState<Array<number>>([]);
    const createMode = entity.id == null;

    const onCancel = () => {
        onClose()
    }

    const onSubmit = () => {
        let promise;
        const entityToSave = getValues();
        entityToSave.sortOrder = 0;
        if (!createMode) {
            promise = axios.put(`${webService}/change/${entity.id}`, entityToSave);
        }
        else {
            promise = axios.post(`${webService}/create`, entityToSave);
        }
        promise.then((response) => {
            if (createMode) {
                reset(entity);
                refreshGrid();
            }
            else {
                onClose(true);
            }
        });
    }

    const handleSubSytemListChange = (checkedIds: Array<number>) => setSelectedSubSystemIds(checkedIds);

    return (
        <Dialog open={open} onClose={onClose}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate={true}>
                <DialogTitle onClose={() => onClose()} />
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'row', width: 500, justifyContent: 'space-between', alignItems: 'start', p: 2 }}>
                        <Grid container width={'40%'} gap={2}>
                            <Grid item xs={12}>
                                <TextField size={'small'} name={'baseDefinitionType'} fullWidth margin="dense" label="نوع مقادیر پویا" value={baseType.title} disabled />
                            </Grid>
                            <Grid item xs={12}>
                                <TextFieldControl name="name" control={control} label="عنوان" margin="dense" autoFocus required={true} errors={errors} />
                            </Grid>
                        </Grid>
                        <Paper sx={{ width: '50%', overflow: 'auto', height: '500px' }}>
                            <CheckListboxControl title={'استفاده در زیرسیستم'} errors={errors} required={true} dense={true} control={control} name="subSystems" data={subSystems} value={selectedSubSystemIds} onChange={handleSubSytemListChange} />
                        </Paper>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button type="submit">{'ثبت'}</Button>
                    <Button onClick={onCancel}>{'انصراف'}</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}