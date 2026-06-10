import React from "react";

export default function StepBasic({data, update}) {

  return (
    <div>

      <h3>Basic Information</h3>

      <div className="form-row">
        <label>Caption</label>
        <input
          value={data.caption || ""}
          onChange={e => update("caption", e.target.value)}
        />
      </div>

      <div className="form-row">
        <label>Field Name</label>
        <input
          value={data.fieldName || ""}
          onChange={e => update("fieldName", e.target.value)}
        />
      </div>

      <div className="form-row">
        <label>Data Type</label>
        <select
          value={data.dataType || ""}
          onChange={e => update("dataType", e.target.value)}
        >
          <option value="">-- Select --</option>
          <option value="string">String</option>
          <option value="number">Number</option>
          <option value="date">Date</option>
          <option value="datetime">DateTime</option>
          <option value="boolean">Boolean</option>
        </select>
      </div>

      <div className="form-row">
        <label>Max Length</label>
        <input
          type="number"
          value={data.maxLength || ""}
          onChange={e => update("maxLength", e.target.value)}
        />
      </div>

    </div>
  );
}
