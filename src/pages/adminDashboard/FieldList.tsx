export default function FieldList({fields,onSelect}){

    return(
      <div style={{
        width:250,
        borderRight:"1px solid #ddd",
        overflow:"auto"
      }}>
  
        <h4 style={{padding:10}}>Fields</h4>
  
        {fields.map(f=>(
          <div
            key={f.componentFieldId}
            style={{
              padding:8,
              cursor:"pointer",
              borderBottom:"1px solid #eee"
            }}
            onClick={()=>onSelect(f)}
          >
            {f.caption}
          </div>
        ))}
  
      </div>
    )
  }
  