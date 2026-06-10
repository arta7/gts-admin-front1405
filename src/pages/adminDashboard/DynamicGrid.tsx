
// import React from "react";

// export default function DynamicGrid({fields,rows}){

//   const cols = fields.filter(f=>f.isVisibleInGrid);

//   return(

//     <table border="1" cellPadding="5">

//       <thead>

//         <tr>

//           {cols.map(c=>
//             <th key={c.aliasName}>{c.caption}</th>
//           )}

//         </tr>

//       </thead>

//       <tbody>

//         {rows.map((r,i)=>(

//           <tr key={i}>

//             {cols.map(c=>

//               <td key={c.aliasName}>
//                 {String(r[c.aliasName] ?? "")}
//               </td>

//             )}

//           </tr>

//         ))}

//       </tbody>

//     </table>

//   )

// }


export default function DynamicGrid({fields,rows}){

  const gridFields = fields.filter(f=>f.isVisibleInGrid);

  return(
    <table style={{width:"100%",borderCollapse:"collapse"}}>

      <thead>
        <tr>
          {gridFields.map(f=>(
            <th key={f.componentFieldId}>
              {f.caption}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>

        {rows.map((r,i)=>(
          <tr key={i}>

            {gridFields.map(f=>(
              <td key={f.componentFieldId}>
                {r[f.fieldName]}
              </td>
            ))}

          </tr>
        ))}

      </tbody>

    </table>
  )
}
