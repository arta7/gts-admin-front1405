import React from "react";

export default function StepUI({data, update}) {

  return (
    <div>

      <h3>UI Component Type</h3>

      <div className="form-row">
        <label>UI Control</label>
        <select
          value={data.uiComponentType || ""}
          onChange={e => update("uiComponentType", e.target.value)}
        >
          <option value="">-- Select --</option>
          <option value="TextBox">TextBox</option>
          <option value="TextArea">TextArea</option>
          <option value="Number">Number</option>
          <option value="CheckBox">CheckBox</option>
          <option value="DatePicker">Date Picker</option>
          <option value="Dropdown">Dropdown (LOV)</option>
          <option value="Lookup">Lookup Window</option>
        </select>
      </div>

      {data.uiComponentType === "Dropdown" && (
        <div className="form-row">
          <label>Dropdown Source SQL</label>
          <textarea
            value={data.dropdownSql || ""}
            onChange={e => update("dropdownSql", e.target.value)}
          />
        </div>
      )}

      {data.uiComponentType === "Lookup" && (
        <>
          <div className="form-row">
            <label>Lookup View</label>
            <input
              value={data.lookupView || ""}
              onChange={e => update("lookupView", e.target.value)}
            />
          </div>

          <div className="form-row">
            <label>Lookup Label Field</label>
            <input
              value={data.lookupLabelField || ""}
              onChange={e => update("lookupLabelField", e.target.value)}
            />
          </div>
        </>
      )}

    </div>
  );
}
