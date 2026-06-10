import {useState} from "react";

import StepBasic from "./StepBasic";
import StepUI from "./StepUI";
import StepVisibility from "./StepVisibility";

export default function FieldEditorModal({field,onSave,onClose}){

  const [step,setStep] = useState(0);

  const [data,setData] = useState(field || {});

  const update = (k,v)=>{
    setData({...data,[k]:v});
  };

  const steps = [

    <StepBasic data={data} update={update} />,
    <StepUI data={data} update={update} />,
    <StepVisibility data={data} update={update} />

  ];

  return(

    <div className="modal">

      <div className="modal-content">

        {steps[step]}

        <div style={{marginTop:20}}>

          {step>0 && (
            <button onClick={()=>setStep(step-1)}>
              Back
            </button>
          )}

          {step < steps.length-1 && (
            <button onClick={()=>setStep(step+1)}>
              Next
            </button>
          )}

          {step === steps.length-1 && (
            <button onClick={()=>onSave(data)}>
              Save
            </button>
          )}

          <button onClick={onClose}>
            Cancel
          </button>

        </div>

      </div>

    </div>

  )

}
