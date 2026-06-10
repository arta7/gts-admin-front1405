
import React,{useState,useEffect} from "react";

export default function DynamicForm({fields,onSave,saving}){

  const [form,setForm] = useState({});

  useEffect(()=>{

    const obj={};

    fields.forEach(f=>{
      obj[f.aliasName]="";
    });

    setForm(obj);

  },[fields]);


  const change=(name,val)=>{
    setForm(prev=>({...prev,[name]:val}))
  }


  const submit=()=>{

    for(let f of fields){

      if(f.isMandatory){

        const v=form[f.aliasName];

        if(!v){
          alert(f.caption+" required");
          return;
        }

      }

    }

    onSave(form);

  }


  return(

    <div>

      {fields
        .filter(f=>f.isVisible!==false && !f.neverVisible)
        .map(f=>{

        const name=f.aliasName;
        const value=form[name] || "";

        return(

          <div key={name} style={{marginBottom:10}}>

            <label>{f.caption}</label>

            {renderInput(f,value,(v)=>change(name,v))}

          </div>

        )

      })}

      <button onClick={submit} disabled={saving}>
        {saving ? "saving..." : "save"}
      </button>

    </div>

  )

}


function renderInput(field,value,onChange){

  const t=field.uiComponentType;

  if(t==="number"){

    return(
      <input
        type="number"
        value={value}
        onChange={e=>onChange(e.target.value)}
      />
    )

  }

  if(t==="date"){

    return(
      <input
        type="date"
        value={value}
        onChange={e=>onChange(e.target.value)}
      />
    )

  }

  if(t==="checkbox"){

    return(
      <input
        type="checkbox"
        checked={value}
        onChange={e=>onChange(e.target.checked)}
      />
    )

  }

  return(
    <input
      type="text"
      value={value}
      onChange={e=>onChange(e.target.value)}
    />
  )

}
