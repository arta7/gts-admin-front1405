export default function FieldsGrid({fields,onEdit,onAdd}){

    return(
  
      <div style={{marginTop:20}}>
  
        <button onClick={onAdd}>Add Field</button>
  
        <table
          style={{
            width:"100%",
            marginTop:10,
            borderCollapse:"collapse"
          }}
        >
  
          <thead>
  
            <tr>
  
              <th>Caption</th>
              <th>Field</th>
              <th>Type</th>
              <th>Visible</th>
              <th>Mandatory</th>
              <th>Grid</th>
              <th></th>
  
            </tr>
  
          </thead>
  
          <tbody>
  
            {fields.map(f=>(
  
              <tr key={f.componentFieldId}>
  
                <td>{f.caption}</td>
  
                <td>{f.fieldName}</td>
  
                <td>{f.uiComponentType}</td>
  
                <td>{f.isVisible ? "Yes":"No"}</td>
  
                <td>{f.isMandatory ? "Yes":"No"}</td>
  
                <td>{f.isVisibleInGrid ? "Yes":"No"}</td>
  
                <td>
  
                  <button onClick={()=>onEdit(f)}>
                    Edit
                  </button>
  
                </td>
  
              </tr>
  
            ))}
  
          </tbody>
  
        </table>
  
      </div>
  
    )
  
  }
  