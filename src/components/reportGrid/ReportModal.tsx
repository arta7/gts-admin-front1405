
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, Grid, TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { ListItem } from "../CheckboxList";
import { CheckboxControl } from "../FormControl/CheckBoxControl";
import { CheckListboxControl } from "../FormControl/CheckboxListControl";
import { TextFieldControl } from "../FormControl/TextFieldControl";
// import { reportSaveError, reportSaveSuccess } from "../../utils/Messages";
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { Option } from "../AsyncCombo";
import Combo from "../inputs/Combo";
import { useAsync } from "../../hooks/useAsync";
import { createReport } from "./ReportServices";
import { toast } from "react-toastify";

type ReportDialogProps = {
    open: boolean,
    onClose: (success: boolean, reportId?: number) => any,
    gridColumns: Array<any>,
    report: Report | undefined,
    reportType: Option
}

export type Report = {
    id: number,
    title: string,
    componentId: number,
    details: Array<{ component_fieldId: number }>,
    // sort?: string,
    // isDesendingSort?: boolean
}

export default function ReportModal({ open, onClose, gridColumns, report, reportType }: ReportDialogProps) {
    // const [sortOptions, setSortOptions] = React.useState<Array<Option>>([]);
    const { run, data: subSystems, isLoading, isIdle, isError, isSuccess } = useAsync(null);

    const editMode = report != null;

    const getFormDefaultValues = () => {
        let defaultValues = {};
        if (!report) {
            defaultValues = {
                componentId: reportType?.id
            }
        }
        else {
            const formattedDetails = report.details.map(field => {
                return field.component_fieldId;
            })
            defaultValues = { ...report, details: formattedDetails };
        }
        return defaultValues;
    }

    const { handleSubmit, getValues, formState: { errors }, control } = useForm({
        defaultValues: getFormDefaultValues()
    });



    const onSubmit = () => {
        let reportInfo: any = getValues();
        reportInfo.details = reportInfo.details.map((id: string) => ({ component_fieldId: Number(id) }));
        run(createReport(reportInfo, editMode)).then(() => {
            onClose(true, report?.id);
        }).catch(error => {
            console.log('error',error)
            // toast.error('خطا در ویرایش گزارش');
        });
    }

    // const updateSortOptions = (ids: Array<any>) => {
    //     let options: Array<ListItem> = [];
    //     if (ids.length == checkListData.length) {
    //         options = checkListData;
    //     }
    //     else {
    //         options = checkListData.filter((item: ListItem) => {
    //             return ids.find((id: number) => item.id == id);
    //         });
    //     }

    //     const sortItems = options.map(item => ({ id: item.id, label: item.caption }))
    //     setSortOptions(sortItems);
    // }

    // let disabledAreaStyles = {}
    // if (!sortOptions.length) {
    //     disabledAreaStyles = {
    //         pointerEvents: 'none',
    //         opacity: '0.4'
    //     };
    // }

    return <Dialog open={open} onClose={() => { onClose }}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate={true}>
            <DialogContent>
                <Grid container gap={2} sx={{ p: 2 }}>
                    <Grid item lg={5} xs={12}>
                        <TextField disabled={true} size={'small'} label="سرفصل گزارش" name='componentId' value={reportType.label} fullWidth={true} />
                    </Grid>
                    <Grid item lg={12} xs={12}>
                        <TextFieldControl control={control} name="title" label={'عنوان گزارش'} required={true} errors={errors} />
                    </Grid>
                    {/* <Grid item lg={5} xs={12} sx={disabledAreaStyles}>
                        <Combo matchId={true} textFieldProps={{
                            helperText: (sortOptions.length == 0 ? 'ابتدا جزییات گزارش را مشخص کنید' : '')
                        }} control={control} label="مرتب سازی" name='sort' autocompleteProps={{ size: "small", disablePortal: true }} options={sortOptions} />
                    </Grid>
                    <Grid item lg={1} xs={12} sx={disabledAreaStyles}>
                        <CheckboxControl control={control} label="نزولی" name="isDesendingSort" />
                    </Grid>
                    <Grid item lg={12} xs={12}>
                        <Box sx={{ maxHeight: '300px', overflow: 'auto' }}>
                            <CheckListboxControl control={control} data={checkListData} 
                            name="details" enableCheckAll={true} title={'جزئیات گزارش'} 
                            onChange={updateSortOptions}  required={true} errors={errors}/>
                        </Box>
                    </Grid> */}
                    <Grid item lg={12} xs={12}>
                        <Box sx={{ maxHeight: '300px', overflow: 'auto' }}>
                            <CheckListboxControl control={control} data={gridColumns}
                                name="details" enableCheckAll={true} title={'جزئیات گزارش'}
                                required={true} errors={errors} />
                        </Box>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button type="submit" variant="contained" disabled={isLoading} startIcon={isLoading ? <CircularProgress size={16} /> : <SaveAltIcon />}>{'ذخیره'}</Button>
                <Button variant="outlined" onClick={() => onClose(false)} disabled={isLoading}>{'انصراف'}</Button>
            </DialogActions>
        </form>
    </Dialog>;
}