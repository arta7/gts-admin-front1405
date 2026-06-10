import DynamicField from "./DynamicField";

export default function FormCanvas({fields,onSelectField,selectedField}){

  const visibleFields = fields
    .filter(f=>f.isVisible && !f.neverVisible)
    .sort((a,b)=>a.sortOrder-b.sortOrder);

  return(
    <div style={{
      flex:1,
      padding:30,
      display:"grid",
      gridTemplateColumns:"1fr 1fr",
      gap:20
    }}>

      {visibleFields.map(field=>(
        <div
          key={field.componentFieldId}
          onClick={()=>onSelectField(field)}
          style={{
            border:
              selectedField &&
              selectedField.componentFieldId===field.componentFieldId
                ? "2px solid blue"
                : "1px solid #ccc",
            padding:10
          }}
        >
          <DynamicField field={field}/>
        </div>
      ))}

    </div>
  )
}
