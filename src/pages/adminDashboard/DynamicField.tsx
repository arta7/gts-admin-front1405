export default function DynamicField({field}){

    switch(field.uiComponentType){
  
      case "NUMBER":
        return (
          <>
            <label>{field.caption}</label>
            <input type="number"/>
          </>
        )
  
      case "DATE":
        return (
          <>
            <label>{field.caption}</label>
            <input type="date"/>
          </>
        )
  
      case "CHECKBOX":
        return (
          <>
            <label>
              <input type="checkbox"/>
              {field.caption}
            </label>
          </>
        )
  
      default:
        return (
          <>
            <label>{field.caption}</label>
            <input type="text"/>
          </>
        )
    }
  
  }
  