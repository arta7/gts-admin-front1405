export const fieldsColumns = [
  { accessorKey: "fieldId", header: "Field ID", size: 150 },
  { accessorKey: "aliasName", header: "Alias Name", size: 150 },
  { accessorKey: "caption", header: "Caption", size: 150 },
  { accessorKey: "uiComponentType", header: "UI Type", size: 120 },
  { accessorKey: "sortOrder", header: "Sort", size: 80 },
  { accessorKey: "isVisible", header: "Visible", type: "boolean" },
  { accessorKey: "isActive", header: "Active", type: "boolean" }
];

export const fieldsFormConfig = {
  fields: [
    // --------------------------
    // FIELD LOOKUP (REPLACES fieldId + aliasName)
    // --------------------------
    { name: "id", label: "ID", type: "hidden" },
    {
      name: "selectedField",
      type: "select",
      label: "انتخاب فیلد سیستم (S00_field)",
      required: true,
      optionsFromContext: "fieldDefinitions"
    },

    // --------------------------
    // Hidden extracted values
    // --------------------------
    { name: "fieldId", type: "hidden" },
    { name: "aliasName", type: "hidden" },
    { name: "caption", type: "hidden" },
    { name: "baseTypeCode", type: "hidden" },
    { name: "fieldType", type: "hidden" },

    // --------------------------
    // UI settings
    // --------------------------
    {
      name: "uiComponentType",
      type: "select",
      label: "UI Component Type",
      required: true,
      options: [
        { value: "TextBox", label: "TextBox" },
        { value: "Number", label: "Number" },
        { value: "DropDown", label: "DropDown" },
        { value: "CheckBox", label: "CheckBox" },
        { value: "DatePicker", label: "DatePicker" },
        { value: "None", label: "None" }
      ]
    },

    {
      name: "attachedField",
      type: "select",
      label: "Attached Field",
      optionsFromContext: "allFields"
    },

    { name: "sortOrder", type: "number", label: "Sort Order" },
    { name: "isVisible", type: "checkbox", label: "Is Visible" },
    { name: "isVisibleInGrid", type: "checkbox", label: "Visible in Grid" },
    { name: "isMandatory", type: "checkbox", label: "Mandatory" },
    { name: "isEnabled", type: "checkbox", label: "isEnabled" },
    { name: "neverVisible", type: "checkbox", label: "neverVisible" },
    { name: "isReadOnly", type: "checkbox", label: "Read Only" },
    { name: "isActive", type: "checkbox", label: "Active" },
    { name: "needToValidate", type: "checkbox", label: "needToValidate" },
    { name: "useInSaveMethod", type: "checkbox", label: "useInSaveMethod" },
    { name: "useInOrderBy", type: "checkbox", label: "useInOrderBy" },

    // Advanced
    { name: "fetchDataAPI", type: "text", label: "Fetch Data API" },
    { name: "fetchDataCondition", type: "text", label: "API Condition" },
    { name: "validationRule", type: "text", label: "Validation Rule" },
    { name: "description", type: "text", label: "Description" },
  ],

  hiddenFields: [
    "id",
    "componentId",
    "subSystemId"
  ]
};


// ComponentFieldsConfig.js (FINAL)



// export const fieldsColumns = [
//   { accessorKey: "fieldId", header: "Field ID", size: 120 },
//   { accessorKey: "aliasName", header: "Alias Name", size: 150 },
//   { accessorKey: "caption", header: "Caption", size: 150 },
//   { accessorKey: "uiComponentType", header: "UI Type", size: 120 },
//   { accessorKey: "sortOrder", header: "Sort", size: 80 },
//   { accessorKey: "isVisible", header: "Visible", type: "boolean" },
//   { accessorKey: "isActive", header: "Active", type: "boolean" }
// ];

// export const fieldsFormConfig = {
//   fields: [
//     // --------------------------
//     // Select S00_field
//     // --------------------------
//     {
//       name: "selectedField",
//       type: "select",
//       label: "انتخاب فیلد سیستم",
//       required: true,
//       optionsFromContext: "fieldDefinitions"
//     },

//     // --------------------------
//     // Auto-Filled hidden fields
//     // --------------------------
//     { name: "fieldId", type: "hidden" },
//     { name: "aliasName", type: "hidden" },
//     { name: "caption", type: "hidden" },
//     { name: "baseTypeCode", type: "hidden" },
//     { name: "fieldType", type: "hidden" },

//     // --------------------------
//     // UI Component Type
//     // --------------------------
//     {
//       name: "uiComponentType",
//       type: "select",
//       label: "UI Component Type",
//       required: true,
//       options: [
//         { value: "TextBox", label: "TextBox" },
//         { value: "Number", label: "Number" },
//         { value: "DropDown", label: "DropDown" },
//         { value: "CheckBox", label: "CheckBox" },
//         { value: "DatePicker", label: "DatePicker" },
//         { value: "None", label: "None" }
//       ]
//     },

//     {
//       name: "attachedField",
//       type: "select",
//       label: "Attached Field",
//       optionsFromContext: "allFields"
//     },

//     { name: "sortOrder", type: "number", label: "Sort Order" },

//     { name: "isVisible", type: "checkbox", label: "Visible" },
//     { name: "isVisibleInGrid", type: "checkbox", label: "Visible in Grid" },
//     { name: "isMandatory", type: "checkbox", label: "Mandatory" },
//     { name: "isReadOnly", type: "checkbox", label: "Read Only" },
//     { name: "isActive", type: "checkbox", label: "Active" },

//     { name: "fetchDataAPI", type: "text", label: "Fetch Data API" },
//     { name: "fetchDataCondition", type: "text", label: "API Condition" },
//     { name: "validationRule", type: "text", label: "Validation Rule" },
//     { name: "description", type: "text", label: "Description" }
//   ],

//   hiddenFields: ["id", "componentId", "subSystemId"]
// };
