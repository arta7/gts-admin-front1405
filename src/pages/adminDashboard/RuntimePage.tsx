// import React, { useState, useEffect, useMemo } from "react";
// import { Box, Paper, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
// import axios from "./axiosConfig";
// import Grid from "../../components/grid/Grid";
// import DynamicEditForm from "./DynamicEditForm";
// import { fieldsColumns, fieldsFormConfig } from "./ComponentFieldsConfig";

// function mapFieldType(sqlType) {
//   const t = sqlType?.toLowerCase() || "";
//   if (t.includes("char") || t.includes("text")) return "Text";
//   if (t.includes("int") || t.includes("number")) return "Number";
//   if (t.includes("date")) return "Date";
//   if (t.includes("bool")) return "Boolean";
//   return "Text";
// }

// export default function ComponentFieldsPage() {
//   const [components, setComponents] = useState([]);
//   const [selectedCompId, setSelectedCompId] = useState("");
//   const [fields, setFields] = useState([]);
//   const [fieldDefinitions, setFieldDefinitions] = useState([]);

//   const [modalOpen, setModalOpen] = useState(false);
//   const [editingRow, setEditingRow] = useState(null);

//   // ---------------------------------------------
//   // Load components list
//   // ---------------------------------------------
//   useEffect(() => {
//     axios.get("/api/component-fields").then(res => {
//       setComponents(res.data);
//       if (res.data.length > 0) setSelectedCompId(res.data[0].componentId);
//     });
//   }, []);

//   // ---------------------------------------------
//   // Load S00_fields
//   // ---------------------------------------------
//   useEffect(() => {
//     axios.get("/api/fields").then(res => {
//       const mapped = res.data.map(f => ({
//         value: Number(f.id),
//         label: `${f.tableName} (${f.aliasName})`,
//         full: {
//           fieldId: Number(f.id),
//           aliasName: f.aliasName,
//           caption: f.description,
//           baseTypeCode: f.dataType,
//           fieldType: mapFieldType(f.dataType),
//           minLen: f.minLen,
//           maxLen: f.maxLen,
//           defaultValue: f.defaultValue
//         }
//       }));
//       setFieldDefinitions(mapped);
//     });
//   }, []);

//   // ---------------------------------------------
//   // Load runtime metadata fields
//   // ---------------------------------------------
//   const loadFields = async (compId) => {
//     if (!compId) return;
//     const res = await axios.get(`/api/runtime/${compId}/metadata`);
//     // const mapped = res.data.fields.map(f => ({
//     //   ...f,
//     //   selectedField : f.fieldId ? Number(f.fieldId) : null,
      
//     //   aliasName: f.componentAliasName  
//     // }));
//     const mapped = res.data.fields.map(f => {
//       // پیدا کردن ID فیلدی که نامش در attachedField است
//       const targetField = res.data.fields.find(item => item.fieldAliasName === f.attachedField);
      
//       return {
//         ...f,
//         selectedField: f.fieldId ? Number(f.fieldId) : null,
        
//         // تبدیل Alias به ID واقعی
//         attachedField: targetField ? Number(targetField.fieldId) : null,
        
//         aliasName: f.componentAliasName
//       };
//     });
//       console.log('mapped',mapped);

//     setFields(mapped);
//   };

//   useEffect(() => {
//     loadFields(selectedCompId);
//   }, [selectedCompId]);

//   // ---------------------------------------------
//   // Build attachedField options
//   // ---------------------------------------------
//   const allFields = useMemo(() => {
//     const list = fields.filter(f => f.uiComponentType != "DropDown").map(f => ({
//       value: f.fieldId,
//       label: `${f.aliasName} (${f.fieldId})`
//     }));
  
//     console.log("allFields:", list);
  
//     return list;
// }, [fields]);
//       // 
     

//   // ---------------------------------------------
//   // Add new field
//   // ---------------------------------------------
//   const handleAdd = () => {
//     const comp = components.find(c => c.componentId === selectedCompId);
//     console.log('comp',comp);
//     setEditingRow({
//       id: 0,
//       componentId: selectedCompId,
//       subSystemId: comp?.subSystemId ?? 0,
//       uiComponentType: "TextBox",
//       isVisible: true,
//       isActive: true,
//       sortOrder: fields.length + 1
//     });
//     setModalOpen(true);
//   };

//   return (
//     <Box p={3}>
//       <Paper sx={{ p: 2, mb: 3 }}>
//         <FormControl fullWidth size="small">
//           <InputLabel>Select Component</InputLabel>
//           <Select
//             value={selectedCompId}
//             label="Select Component"
//             onChange={(e) => setSelectedCompId(e.target.value)}
//           >
//             {components.map(c => (
//               <MenuItem key={c.componentId} value={c.componentId}>
//                 {c.componentCaption} ({c.componentId})
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//       </Paper>

//       <Grid
//         title="Component Fields"
//         columns={fieldsColumns}
//         rows={fields}
//         onAdd={handleAdd}
//         onEdit={(row) => {
//           console.log('comp',row);
//           setEditingRow(row);

//           setModalOpen(true);
//         }}
//       />

//       {modalOpen && (
//         <DynamicEditForm
//           open={modalOpen}
//           title={editingRow?.id ? "Edit Field" : "Create Field"}
//           entity={editingRow}
//           onClose={(refresh) => {
//             setModalOpen(false);
//             if (refresh) loadFields(selectedCompId);
//           }}
//           webService="/api/component-fields"
//           formConfig={fieldsFormConfig}
//           context={{ allFields, fieldDefinitions }}
//         />
//       )}
//     </Box>
//   );
// }







// import React, { useState, useEffect, useMemo } from "react";
// import { Box, Paper, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
// import axios from "./axiosConfig";
// import Grid from "../../components/grid/Grid";
// import DynamicEditForm from "./DynamicEditForm";
// import { fieldsColumns, fieldsFormConfig } from "./ComponentFieldsConfig";

// function mapFieldType(sqlType) {
//   const t = sqlType?.toLowerCase() || "";
//   if (t.includes("char") || t.includes("text")) return "Text";
//   if (t.includes("int") || t.includes("number")) return "Number";
//   if (t.includes("date")) return "Date";
//   if (t.includes("bool")) return "Boolean";
//   return "Text";
// }

// export default function ComponentFieldsPage() {
//   const [components, setComponents] = useState([]);
//   const [selectedCompId, setSelectedCompId] = useState("");
//   const [fields, setFields] = useState([]);
//   const [fieldDefinitions, setFieldDefinitions] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [editingRow, setEditingRow] = useState(null);

//   // -----------------------------
//   // Load components
//   // -----------------------------
//   useEffect(() => {
//     axios.get("/api/component-fields").then(res => {
//       setComponents(res.data);
//       if (res.data.length > 0) {
//         setSelectedCompId(res.data[0].componentId);
//       }
//     });
//   }, []);

//   // -----------------------------
//   // Load S00_field
//   // -----------------------------
//   useEffect(() => {
//     axios.get("/api/fields").then(res => {
//       const mapped = res.data.map(f => ({
//         value: Number(f.id),
//         label: `${f.tableName} (${f.aliasName})`,
//         full: {
//           fieldId: Number(f.id),
//           aliasName: f.aliasName,
//           caption: f.description,
//           baseTypeCode: f.dataType,
//           fieldType: mapFieldType(f.dataType),
//           minLen: f.minLen,
//           maxLen: f.maxLen,
//           defaultValue: f.defaultValue
//         }
//       }));

//       setFieldDefinitions(mapped);
//     });
//   }, []);

//   // -----------------------------
//   // Load Component Fields
//   // -----------------------------
//   const loadFields = async (compId) => {
//     if (!compId) return;

//     const res = await axios.get(`/api/runtime/${compId}/metadata`);

//     const mapped = res.data.fields.map(f => {
//       const targetField = res.data.fields.find(
//         x => x.fieldAliasName === f.attachedField
//       );

//       return {
//         ...f,

//         selectedField: Number(f.fieldId) || null,

//         attachedField: targetField ? Number(targetField.fieldId) : null,

//         aliasName: f.componentAliasName
//       };
//     });

//     setFields(mapped);
//   };

//   useEffect(() => {
//     loadFields(selectedCompId);
//   }, [selectedCompId]);

//   // -----------------------------
//   // Build attachedField options
//   // -----------------------------
//   const allFields = useMemo(() => {
//     return fields
//       .filter(f => f.uiComponentType !== "DropDown")
//       .map(f => ({
//         value: Number(f.fieldId),
//         label: `${f.aliasName} (${f.fieldId})`
//       }));
//   }, [fields]);

//   // -----------------------------
//   // ADD new field
//   // -----------------------------
//   const handleAdd = () => {
//     const cmp = components.find(c => c.componentId === selectedCompId);

//     setEditingRow({
//       id: 0,
//       componentId: selectedCompId,
//       subSystemId: cmp?.subSystemId || 0,
//       uiComponentType: "TextBox",
//       isVisible: true,
//       isActive: true,
//       sortOrder: fields.length + 1
//     });

//     setModalOpen(true);
//   };

//   return (
//     <Box p={3}>
//       <Paper sx={{ p: 2, mb: 3 }}>
//         <FormControl fullWidth size="small">
//           <InputLabel>Select Component</InputLabel>
//           <Select
//             value={selectedCompId}
//             label="Select Component"
//             onChange={(e) => setSelectedCompId(e.target.value)}
//           >
//             {components.map(c => (
//               <MenuItem key={c.componentId} value={c.componentId}>
//                 {c.componentCaption}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//       </Paper>

//       <Grid
//         title="Component Fields"
//         columns={fieldsColumns}
//         rows={fields}
//         onAdd={handleAdd}
//         onEdit={(row) => {
//           setEditingRow(row);
//           setModalOpen(true);
//         }}
//       />

//       {modalOpen && (
//         <DynamicEditForm
//           open={modalOpen}
//           title={editingRow.id ? "Edit Field" : "Create Field"}
//           entity={editingRow}
//           onClose={(refresh) => {
//             setModalOpen(false);
//             if (refresh) loadFields(selectedCompId);
//           }}
//           webService="/api/component-fields"
//           formConfig={fieldsFormConfig}
//           context={{ fieldDefinitions, allFields }}
//         />
//       )}
//     </Box>
//   );
// }



import React, { useState, useEffect, useMemo } from "react";
import { Box, Paper, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import axios from "./axiosConfig";
import Grid from "../../components/grid/Grid";
import DynamicEditForm from "./DynamicEditForm";
import { fieldsColumns, fieldsFormConfig } from "./ComponentFieldsConfig";

import SelectInputSimple from '../../components/inputs/SelectInputSimple';

function mapFieldType(sqlType) {
  const t = sqlType?.toLowerCase() || "";
  if (t.includes("char") || t.includes("text")) return "Text";
  if (t.includes("int") || t.includes("number")) return "Number";
  if (t.includes("date")) return "Date";
  if (t.includes("bool")) return "Boolean";
  return "Text";
}

export default function ComponentFieldsPage() {
  const [components, setComponents] = useState([]);
  const [selectedCompId, setSelectedCompId] = useState("");
  const [fields, setFields] = useState([]);
  const [fieldDefinitions, setFieldDefinitions] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingRow, setEditingRow] = useState(null);
  const [allTables, setAllTables] = useState([]);          // کل جدول‌ها
   const [selectedTable, setSelectedTable] = useState(null);


   const [spList, setSPList] = useState([]);
   const [selectedSPName, setSelectedSPName] = useState(null);
   const [spCode, setSPCode] = useState("");
   const [spModalOpen, setSPModalOpen] = useState(false);


   const [openEditorModal, setOpenEditorModal] = useState(false);
const [oldSP, setOldSP] = useState("");
const [newSP, setNewSP] = useState("");

const [selectedSPType, setSelectedSPType] = useState(null);
const [selectedCondition, setSelectedCondition] = useState(null);


  // ---------------------------------------------
  // 1) Load Components
  // ---------------------------------------------
  useEffect(() => {
    axios.get("/api/component-fields").then(res => {
      setComponents(res.data);
      if (res.data.length > 0) {
        setSelectedCompId(res.data[0].componentId);
      }
    });
  }, []);


  useEffect(() => {
    axios.get("/api/tables").then(res => {
      const mapped = res.data.map(t => ({
        value: t.tableName,
        label: t.tableName
      }));
      setAllTables(mapped);
    });
  }, []);

//   const openSPEditor = async (spType, condition) => {
//     const res = await axios.get(`/api/sp/editor/${selectedCompId}/${spType}/${condition}`);

//     setOldSP(res.data.oldCode || "");
//     setNewSP(res.data.newCode || "");

//     setSelectedSPType(spType);
//     setSelectedCondition(condition);

//     setOpenEditorModal(true);
// };

const openSPEditor = async (spType, condition) => {
  // if (!selectedTable || !selectedTable.label) {
  //     alert("ابتدا جدول را انتخاب کنید");
  //     return;
  // }

  // if (!selectedSubsystemId) {
  //     alert("سیستم فرعی انتخاب نشده است");
  //     return;
  // }

  // console.log('selectedTable.label',selectedTable)
  const cmp = components.find(c => c.componentId === selectedCompId);


  const tableName = selectedTable;
  const subsystemId =  cmp?.subSystemId || 0; // فرض: قبلاً در state ذخیره شده

  const res = await axios.get(
      `/api/sp/editor/${selectedCompId}/${spType}/${condition}`,
      {
          params: {
              tableName,
              subsystemId
          }
      }
  );

  setOldSP(res.data.oldCode || "");
  setNewSP(res.data.newCode || "");

  setSelectedSPType(spType);
  setSelectedCondition(condition);

  setOpenEditorModal(true);
};







const openEditor = async (spType, condition) => {
  if (!selectedCompId || !selectedTable) return;

  const res = await axios.get(
      `/api/sp/editor/${selectedCompId}/${spType}/${condition}`,
      { params: {
          tableName: SelectedTable,
          subsystemId: selectedSubsystem
      }}
  );

  setSelectedSPType(spType);
  setSelectedCondition(condition);
  setOldSP(res.data.oldCode);
  setNewSP(res.data.newCode);
  setCurrentSPName(res.data.spName);
  setSpModalOpen(true);
};




  // ---------------------------------------------
  // 2) Load S00_field definitions
  // ---------------------------------------------
  useEffect(() => {
    axios.get("/api/fields").then(res => {
      const mapped = res.data.map(f => ({
        value: Number(f.id),
        label: `${f.tableName} (${f.aliasName})`,
        full: {
          fieldId: Number(f.id),
          aliasName: f.aliasName,
          caption: f.description,
          baseTypeCode: f.dataType,
          fieldType: 0,
          minLen: f.minLen,
          maxLen: f.maxLen,
          defaultValue: f.defaultValue
        }
      }));

      setFieldDefinitions(mapped);
    });
  }, []);


  useEffect(() => {
    if (!selectedCompId) return;
  
    axios.get(`/api/spname/${selectedCompId}`).then(res => {
      const spRecord = res.data;
      console.log('spRecord',spRecord)
      
  
      if (spRecord && spRecord[0]?.tableName) {
        setSelectedTable(spRecord[0]?.tableName);   // Auto select
      } else {
        setSelectedTable(null);
      }
    });
  }, [selectedCompId]);



  useEffect(() => {
    if (!selectedCompId) return;

    axios.get(`/api/spnames/${selectedCompId}`).then(res => {
        const items = res.data || [];

        setSPList(items);  // کل SP های مربوطه

        // انتخاب جدول از اولین SP همانطور که داشتی
        if (items.length > 0 && items[0].tableName) {
            setSelectedTable(items[0].tableName);
        }
    });

}, [selectedCompId]);

  // ---------------------------------------------
  // 3) Load Component Fields (metadata)
  // ---------------------------------------------
  const loadFields = async (compId) => {
    if (!compId) return;

    const res = await axios.get(`/api/runtime/${compId}/metadata`);

    const mapped = res.data.fields.map(f => {
      // match attachedField by aliasName
      const targetField = res.data.fields.find(
        x => x.fieldAliasName === f.attachedField
      );

      return {
        ...f,

        // برای فرم
        selectedField: Number(f.fieldId) || null,

        // در فرم باید ID بدهیم, نه aliasName
        attachedField: targetField ? Number(targetField.fieldId) : null,

        // aliasName برای نمایش در grid
        aliasName: f.componentAliasName || f.aliasName
      };
    });

    setFields(mapped);
  };

  useEffect(() => {
    loadFields(selectedCompId);
  }, [selectedCompId]);


  const openSPModal = async (spName) => {
    
   

    setSelectedSPName(spName);

    const res = await axios.get(`/api/sp/code/${spName}`);
    setSPCode(res.data.code || "");


    console.log("Clicked View for:", spName);
    setSPModalOpen(true);
};


// const saveSP = async () => {
//   await axios.post(`/api/sp/update`, {
//       spName: selectedSPName,
//       code: spCode
//   });

//   alert("Stored Procedure updated successfully.");
//   setSPModalOpen(false);
// };

const saveSP = async () => {
  const res = await axios.post("/api/sp/editor/save", {
      componentId: selectedCompId,
      subsystemId: selectedSubsystem,
      tableName: selectedTable.label,
      spType: selectedSPType,
      condition: selectedCondition,
      code: newSP
  });

  alert("SP Saved: " + res.data.spName);
  loadSPList(); 
  setSpModalOpen(false);
};



  // ---------------------------------------------
  // 4) Build attachedField Options
  // ---------------------------------------------
  const allFields = useMemo(() => {
    return fields.map(f => ({
      value: Number(f.fieldId),
      label: `${f.aliasName} (${f.fieldId})`,
      dbValue: f.fieldAliasName   // این مقدار همان چیزی است که باید به DB برود
    }));
  }, [fields]);


  const saveSPChanges = async () => {
    await axios.post("/api/sp/editor/save", {
        componentId: selectedCompId,
        spType: selectedSPType,
        condition: selectedCondition,
        tableName: selectedTable,
        code: newSP
    });

    alert("Stored Procedure saved!");
    setOpenEditorModal(false);
};



  // ---------------------------------------------
  // 5) Add New Field
  // ---------------------------------------------
  const handleAdd = () => {
    const cmp = components.find(c => c.componentId === selectedCompId);

    setEditingRow({
      id: 0,
      componentId: selectedCompId,
      subSystemId: cmp?.subSystemId || 0,
      uiComponentType: "TextBox",
      isVisible: true,
      isActive: true,
      isVisibleInGrid: true,
      isMandatory: false,
      isReadOnly: false,
      isEnabled:true,
      neverVisible:false,
      isUnique:false,
      needToValidate:false,
      useInSaveMethod:false,
      useInOrderBy:false,
      fieldType:0,
      isFullLength:false,
      sortOrder: fields.length + 1
    });

    setModalOpen(true);
  };

  // ---------------------------------------------
  // 6) Edit Existing Field
  // ---------------------------------------------
  const prepareEditEntity = (row) => {
    return {
      ...row,

      // برای selectedField باید "id فیلد" را بدهیم
      selectedField: Number(row.fieldId),

      // برای attachedField در فرم باید ID بدهیم
      attachedField: row.attachedField
        ? Number(row.attachedField)
        : null
    };
  };

  return (
    <Box p={3}>
      <Paper sx={{ p: 2, mb: 3 }}>
     
        
     
   

<SelectInputSimple
  value={selectedCompId}
  onChange={setSelectedCompId}
  options={components}
  label="انتخاب کامپوننت"
  getOptionLabel={(o) => o.componentCaption}
  getOptionValue={(o) => o.componentId}
 />



<SelectInputSimple
  value={selectedTable}
  // onChange={setSelectedTable}
  onChange={(item) => {
    console.log('table name',selectedTable)
    
    setSelectedTable(item); // item.label = tableName
}}
  options={allTables}
  label="انتخاب جدول (Table)"
  getOptionLabel={(o) => o.label}
  getOptionValue={(o) => o.value}
/>



<Box mt={3} p={2} border="1px solid #ddd" borderRadius="8px">

    <h3>Stored Procedures (CRUD)</h3>

    {spList.length === 0 && (
        <div style={{ color: "gray" }}>هیچ Stored Procedure برای این کامپوننت تعریف نشده</div>
    )}

    <Box display="flex" gap={20} mt={2} flexWrap="wrap">

        {/* ---------- INSERT ---------- */}
        {(() => {
            const sp = spList.find(x => x.spType === 0);
            return (
                <Box>
                    <strong>Insert</strong>
                    <div style={{ display: "flex", gap: "6px", marginTop: "4px" }}>
                        {sp ? (
                            <>
                                <button onClick={() => openSPModal(sp.spName)}>View</button>
                                <button onClick={() => openSPEditor(0, "insert")}>Edit</button>
                            </>
                        ) : (
                            <button onClick={() => openSPEditor(0, "insert")}>Create</button>
                        )}
                    </div>
                </Box>
            );
        })()}

        {/* ---------- GET ALL ---------- */}
        {(() => {
            const sp = spList.find(x => x.spType === 1 && x.condition === "all");
            return (
                <Box>
                    <strong>Get All</strong>
                    <div style={{ display: "flex", gap: "6px", marginTop: "4px" }}>
                        {sp ? (
                            <>
                                <button onClick={() => openSPModal(sp.spName)}>View</button>
                                <button onClick={() => openSPEditor(1, "all")}>Edit</button>
                            </>
                        ) : (
                            <button onClick={() => openSPEditor(1, "all")}>Create</button>
                        )}
                    </div>
                </Box>
            );
        })()}

        {/* ---------- GET BY ID ---------- */}
        {(() => {
            const sp = spList.find(x => x.spType === 1 && x.condition === "byId");
            return (
                <Box>
                    <strong>Get By Id</strong>
                    <div style={{ display: "flex", gap: "6px", marginTop: "4px" }}>
                        {sp ? (
                            <>
                                <button onClick={() => openSPModal(sp.spName)}>View</button>
                                <button onClick={() => openSPEditor(1, "byId")}>Edit</button>
                            </>
                        ) : (
                            <button onClick={() => openSPEditor(1, "byId")}>Create</button>
                        )}
                    </div>
                </Box>
            );
        })()}

        {/* ---------- GET BY PARENT ID ---------- */}
        {(() => {
            const sp = spList.find(x => x.spType === 1 && x.condition === "byParentId");
            return (
                <Box>
                    <strong>Get By Parent Id</strong>
                    <div style={{ display: "flex", gap: "6px", marginTop: "4px" }}>
                        {sp ? (
                            <>
                                <button onClick={() => openSPModal(sp.spName)}>View</button>
                                <button onClick={() => openSPEditor(1, "byParentId")}>Edit</button>
                            </>
                        ) : (
                            <button onClick={() => openSPEditor(1, "byParentId")}>Create</button>
                        )}
                    </div>
                </Box>
            );
        })()}

        {/* ---------- UPDATE ---------- */}
        {(() => {
            const sp = spList.find(x => x.spType === 2);
            return (
                <Box>
                    <strong>Update</strong>
                    <div style={{ display: "flex", gap: "6px", marginTop: "4px" }}>
                        {sp ? (
                            <>
                                <button onClick={() => openSPModal(sp.spName)}>View</button>
                                <button onClick={() => openSPEditor(2, "update")}>Edit</button>
                            </>
                        ) : (
                            <button onClick={() => openSPEditor(2, "update")}>Create</button>
                        )}
                    </div>
                </Box>
            );
        })()}

    </Box>
</Box>










      </Paper>

      <Grid
        title="Component Fields"
        columns={fieldsColumns}
        rows={fields}
        onAdd={handleAdd}
        onEdit={(row) => {
          setEditingRow(prepareEditEntity(row));
          setModalOpen(true);
        }}
      />


{spModalOpen && (
    <div
        className="modal-overlay"
        style={{
            position: "fixed",
            top: 0, left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 99999
        }}
    >
        <div
            className="modal-box"
            style={{
                background: "white",
                width: "80%",
                maxWidth: "1200px",
                padding: "20px",
                borderRadius: "8px",
                zIndex: 100000
            }}
        >
            <h2>{selectedSPName}</h2>

            <textarea
                style={{ width: "100%", height: "400px" }}
                value={spCode}
                onChange={(e) => setSPCode(e.target.value)}
            />

            <button onClick={() => setSPModalOpen(false)}>Close</button>
        </div>
    </div>
)}




{openEditorModal && (
    <div
        style={{
            position: "fixed",
            top: 0, left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10000
        }}
    >
        <div
            style={{
                background: "white",
                width: "90%",
                maxWidth: "1200px",
                padding: "20px",
                borderRadius: "8px"
            }}
        >
            <h2>Stored Procedure Editor</h2>

            <div style={{ display: "flex", gap: "15px" }}>
                
                {/* OLD */}
                <textarea
                    style={{
                        width: "50%",
                        height: "450px",
                        fontFamily: "monospace",
                        fontSize: "13px"
                    }}
                    value={oldSP}
                    readOnly
                />

                {/* NEW */}
                <textarea
                    style={{
                        width: "50%",
                        height: "450px",
                        fontFamily: "monospace",
                        fontSize: "13px"
                    }}
                    value={newSP}
                    onChange={(e) => setNewSP(e.target.value)}
                />

            </div>

            <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between" }}>
                <button onClick={() => setOpenEditorModal(false)}>Close</button>
                <button
                    onClick={saveSPChanges}
                    style={{ background: "green", color: "white", padding: "8px 14px" }}
                >
                    Save SP
                </button>
            </div>

        </div>
    </div>
)}



      {modalOpen && (
        <DynamicEditForm
          open={modalOpen}
          title={editingRow.id ? "Edit Field" : "Create Field"}
          entity={editingRow}
          onClose={(refresh) => {
            setModalOpen(false);
            if (refresh) loadFields(selectedCompId);
          }}
          webService="/api/component-fields"
          formConfig={fieldsFormConfig}
          context={{ fieldDefinitions, allFields }}
        />
      )}
    </Box>
  );
}
