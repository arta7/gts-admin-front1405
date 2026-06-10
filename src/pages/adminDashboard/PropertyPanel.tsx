export default function PropertyPanel({field,onChange,onSave}){

    if(!field){
      return (
        <div style={{width:300,borderLeft:"1px solid #ddd",padding:20}}>
          select field
        </div>
      )
    }
  
    return(
      <div style={{
        width:300,
        borderLeft:"1px solid #ddd",
        padding:20
      }}>
  
        <h3>Field Properties</h3>
  
        <label>Caption</label>
        <input
          value={field.caption || ""}
          onChange={e=>onChange("caption",e.target.value)}
        />
  
        <label>UI Type</label>
        <select
          value={field.uiComponentType || "TEXT"}
          onChange={e=>onChange("uiComponentType",e.target.value)}
        >
          <option value="TEXT">Text</option>
          <option value="NUMBER">Number</option>
          <option value="DATE">Date</option>
          <option value="CHECKBOX">Checkbox</option>
        </select>
  
        <label>
          <input
            type="checkbox"
            checked={field.isMandatory || false}
            onChange={e=>onChange("isMandatory",e.target.checked)}
          />
          Mandatory
        </label>
  
        <label>
          <input
            type="checkbox"
            checked={field.isVisible || false}
            onChange={e=>onChange("isVisible",e.target.checked)}
          />
          Visible
        </label>
  
        <label>
          <input
            type="checkbox"
            checked={field.isReadOnly || false}
            onChange={e=>onChange("isReadOnly",e.target.checked)}
          />
          Read Only
        </label>
  
        <button
          style={{marginTop:20}}
          onClick={onSave}
        >
          Save
        </button>
  
      </div>
    )
  }
  