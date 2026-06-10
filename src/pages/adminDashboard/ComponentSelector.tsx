export default function ComponentSelector({components,componentId,setComponentId}){

    return(
      <div style={{padding:10,borderBottom:"1px solid #ddd"}}>
  
        <label>Component :</label>
  
        <select
          value={componentId || ""}
          onChange={e=>setComponentId(e.target.value)}
          style={{marginLeft:10}}
        >
          {components.map(c=>(
            <option key={c.componentId} value={c.componentId}>
              {c.componentCaption}
            </option>
          ))}
        </select>
  
      </div>
    )
  }
  