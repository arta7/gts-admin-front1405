// import * as React from 'react';
// import {
//   Button,
//   Dialog,
//   DialogContent,
//   DialogActions,
//   Grid,
//   Box,
//   Typography
// } from '@mui/material';
// import { useForm } from "react-hook-form";
// import axios from './axiosConfig';

// import { CheckboxControl } from '../../components/FormControl/CheckBoxControl';
// import { TextFieldControl } from '../../components/FormControl/TextFieldControl';
// import AsyncComboInput from '../../components/inputs/AsyncComboInput';
// import SelectInput from '../../components/inputs/SelectInput';

// export default function DynamicEditForm({
//   onClose,
//   open,
//   entity,
//   webService,
//   formConfig,
//   title,
//   context = {}                               // ★ NEW — دریافت fieldDefinitions
// }) {
//   const {
//     handleSubmit,
//     getValues,
//     formState: { errors, isSubmitting },
//     control,
//     reset,
//     setValue,
//     watch
//   } = useForm({
//     defaultValues: entity || {}
//   });

//   // ✨ selectedField را مانیتور می‌کنیم
//   const selectedField = watch("selectedField");

//   // ---------------------------------------------------------
//   // AutoFill برای selectedField
//   // ---------------------------------------------------------
//   React.useEffect(() => {
//     if (!selectedField || !context.fieldDefinitions) return;

//     const selected = context.fieldDefinitions.find(f => f.value === selectedField);
//     if (!selected) return;

//     const f = selected.full;

//     setValue("fieldId", f.fieldId);
//     setValue("aliasName", f.aliasName);
//     setValue("caption", f.caption);
//     setValue("baseTypeCode", f.baseTypeCode);
//     setValue("fieldType", f.fieldType);
//     setValue("minLen", f.minLen);
//     setValue("maxLen", f.maxLen);
//     setValue("defaultValue", f.defaultValue);

//   }, [selectedField, context.fieldDefinitions, setValue]);

//   const normalizeEntity = (data) => {
//     const result = { ...data };
//     Object.keys(result).forEach((key) => {
//       if (result[key] === null) result[key] = 0;
//     });
//     return result;
//   };

//   React.useEffect(() => {
//     console.log("context:", context);

//     if (open) {
//       reset(normalizeEntity(entity) || {});
//     }
//   }, [open, entity, reset]);

//   const onCancel = () => onClose(false);

//   const onSubmit = async () => {
//     try {
//       const entityToSave = getValues();

//       let response;
//       if (entity?.id && entity?.id != 0)
//         response = await axios.put(`${webService}/${entity.id}`, entityToSave);
//       else
//         response = await axios.post(`${webService}`, entityToSave);

//       onClose(true, response.data);
//     } catch (error) {
//       console.error('Error saving entity:', error);
//       onClose(false, null, error);
//     }
//   };

//   // ---------------------------------------------------------
//   // Rendering Field Types
//   // ---------------------------------------------------------
//   const renderField = (field) => {
//     const commonProps = {
//       name: field.name,
//       control: control,
//       label: field.label,
//       margin: "dense",
//       rules: field.rules,
//       required: field.rules?.required,
//       errors: errors,
//       fullWidth: true
//     };

//     // ← Component برای انتخاب فیلد S00_field
//     if (field.type === "select" && field.name === "selectedField") {
//       return (
//         <SelectInput
//           {...commonProps}
//           options={context.fieldDefinitions}
//           getOptionLabel={(o) => o.label}
//           getOptionValue={(o) => o.value}
//         />
//       );
//     }

//     switch (field.type) {
//       case 'text':
//         return <TextFieldControl {...commonProps} />;
//       case 'number':
//         return <TextFieldControl {...commonProps} type="number" />;
//       case 'checkbox':
//         return <CheckboxControl {...commonProps} />;
//       case 'async-combo':
//         return (
//           <AsyncComboInput
//             {...commonProps}
//             url={field.url}
//             getOptionLabel={field.getOptionLabel}
//             variant='outlined'
//           />
//         );
//       // case 'select':
//       //   return (
//       //     <SelectInput
//       //       {...commonProps}
//       //       options={field.options}
//       //       getOptionLabel={(o) => o.label}
//       //       getOptionValue={(o) => o.value}
//       //     />
//       //   );
//       case 'select': {

//         const options = field.optionsFromContext
//           ? context[field.optionsFromContext] || []
//           : field.options || [];
      
//         return (
//           <SelectInput
//             {...commonProps}
//             options={options}
//             getOptionLabel={(o) => o.label}
//             getOptionValue={(o) => o.value}
//           />
//         );
//       }
//       default:
//         return <TextFieldControl {...commonProps} />;
//     }
//   };

//   return (
//     <Dialog open={open} onClose={onCancel} maxWidth="md" fullWidth>
//       <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
//         <DialogContent>
//           <Typography variant="h6" gutterBottom>{title}</Typography>

//           <Grid container spacing={2}>
//             {formConfig.fields.map((field) => (
//               <Grid key={field.name} item xs={field.grid?.xs || 12} md={field.grid?.md || 6}>
//                 {renderField(field)}
//               </Grid>
//             ))}
//           </Grid>
//         </DialogContent>

//         <DialogActions sx={{ px: 3, pb: 2 }}>
//           <Button type="submit" variant="contained" disabled={isSubmitting}>
//             {isSubmitting ? 'در حال ثبت...' : 'ثبت'}
//           </Button>
//           <Button onClick={onCancel} variant="outlined" disabled={isSubmitting}>
//             انصراف
//           </Button>
//         </DialogActions>
//       </Box>
//     </Dialog>
//   );
// }





import * as React from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  Grid,
  Box,
  Typography
} from '@mui/material';
import { useForm } from "react-hook-form";
import axios from './axiosConfig';

import { CheckboxControl } from '../../components/FormControl/CheckBoxControl';
import { TextFieldControl } from '../../components/FormControl/TextFieldControl';
import SelectInput from '../../components/inputs/SelectInput';
import AsyncComboInput from '../../components/inputs/AsyncComboInput';

export default function DynamicEditForm({
  onClose,
  open,
  entity,
  webService,
  formConfig,
  title,
  context = {}
}) {
  const {
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
    control,
    reset,
    setValue,
    watch
  } = useForm({
    defaultValues: entity || {}
  });

  // --------------------------
  // Watch selectedField
  // --------------------------
  const selectedField = watch("selectedField");

  // --------------------------
  // AutoFill selected system field info
  // --------------------------
  React.useEffect(() => {
    if (!selectedField || !context.fieldDefinitions) return;

    const selected = context.fieldDefinitions.find(x => x.value === selectedField);
    if (!selected) return;

    const f = selected.full;

    setValue("fieldId", f.fieldId);
    setValue("aliasName", f.aliasName);
    setValue("caption", f.caption);
    setValue("baseTypeCode", f.baseTypeCode);
    setValue("fieldType", f.fieldType);
    setValue("minLen", f.minLen);
    setValue("maxLen", f.maxLen);
    setValue("defaultValue", f.defaultValue);

  }, [selectedField, context.fieldDefinitions, setValue]);

  // --------------------------
  // Load default values in edit mode
  // --------------------------
  React.useEffect(() => {
    if (open) {
      reset(entity || {});
    }
  }, [open, entity, reset]);

  // --------------------------
  // Submit ADD / UPDATE
  // --------------------------
  const onSubmit = async () => {
    try {
      const entityToSave = getValues();
    
      // لاگ بگیر تا ببینی آیا id وجود دارد یا نه
      console.log("Data to save:", entityToSave);

      // --------------------------
      // ATTACHED FIELD FIX
      // Convert attachedField (ID) → dbValue (string)
      // --------------------------
      if (entityToSave.attachedField && context.allFields) {
        const found = context.allFields.find(
          f => f.value === entityToSave.attachedField
        );
        if (found) {
          // مقدار واقعی که باید در DB ذخیره شود
          entityToSave.attachedField = found.dbValue;
        }
      } else {
        entityToSave.attachedField = null;
      }

      let response;
      if (entityToSave.id && Number(entityToSave.id) > 0) {
        response = await axios.put(`${webService}/${entityToSave.id}`, entityToSave);
      } else {
        response = await axios.post(webService, entityToSave);
      }

      onClose(true, response.data);
    } catch (error) {
      console.error("Save Error:", error);
      onClose(false, null, error);
    }
  };

  // --------------------------
  // Render dynamic fields
  // --------------------------
  const renderField = (field) => {
    const commonProps = {
      name: field.name,
      control,
      label: field.label,
      margin: "dense",
      rules: field.rules,
      required: field.rules?.required,
      errors,
      fullWidth: true
    };

    

    // --------------------------
    // SELECT S00_field → selectedField
    // --------------------------
    if (field.type === "select" && field.name === "selectedField") {
      return (
        <SelectInput
          {...commonProps}
          options={context.fieldDefinitions}
          getOptionLabel={(o) => o.label}
          getOptionValue={(o) => o.value}
        />
      );
    }

    if (field.type === 'async-combo'){

      return (
                  <AsyncComboInput
                    {...commonProps}
                    url={field.url}
                    getOptionLabel={field.getOptionLabel}
                    variant='outlined'
                  />
                )
    }

    // --------------------------
    // AUTO-FILL fields → readOnly
    // --------------------------
    const autoFillFields = [
      "fieldId", "aliasName", "caption",
      "baseTypeCode", "fieldType",
      "minLen", "maxLen", "defaultValue"
    ];

    const isReadOnlyAuto = autoFillFields.includes(field.name);

    // --------------------------
    // TEXT / NUMBER
    // --------------------------
    if (field.type === "text" || field.type === "number") {
      return (
        <TextFieldControl
          {...commonProps}
          type={field.type}
          InputProps={{
            readOnly: isReadOnlyAuto
          }}
        />
      );
    }

    // --------------------------
    // SELECT NORMAL
    // --------------------------
    if (field.type === "select") {
      const options = field.optionsFromContext
        ? context[field.optionsFromContext] || []
        : field.options || [];

      return (
        <SelectInput
          {...commonProps}
          options={options}
          getOptionLabel={(o) => o.label}
          getOptionValue={(o) => o.value}
        />
      );
    }

    // --------------------------
    // CHECKBOX
    // --------------------------
    if (field.type === "checkbox") {
      return <CheckboxControl {...commonProps} />;
    }

    // --------------------------
    // DEFAULT TEXT
    // --------------------------
    return <TextFieldControl {...commonProps} />;
  };

  return (
    <Dialog open={open} onClose={() => onClose(false)} maxWidth="md" fullWidth>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <DialogContent>
          <Typography variant="h6" gutterBottom>{title}</Typography>

          <Grid container spacing={2}>
            {formConfig.fields.map((field) => (
              <Grid key={field.name} item xs={field.grid?.xs || 12} md={field.grid?.md || 6}>
                {renderField(field)}
              </Grid>
            ))}
          </Grid>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting ? "در حال ثبت..." : "ثبت"}
          </Button>
          <Button variant="outlined" onClick={() => onClose(false)} disabled={isSubmitting}>
            انصراف
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
