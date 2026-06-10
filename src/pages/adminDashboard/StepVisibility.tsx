import React from "react";

export default function StepVisibility({data, update}) {

  return (
    <div>

      <h3>Visibility & Behavior</h3>

      <div className="form-row">
        <label>Visible</label>
        <input
          type="checkbox"
          checked={data.isVisible || false}
          onChange={e => update("isVisible", e.target.checked)}
        />
      </div>

      <div className="form-row">
        <label>Mandatory</label>
        <input
          type="checkbox"
          checked={data.isMandatory || false}
          onChange={e => update("isMandatory", e.target.checked)}
        />
      </div>

      <div className="form-row">
        <label>Visible in Grid</label>
        <input
          type="checkbox"
          checked={data.isVisibleInGrid || false}
          onChange={e => update("isVisibleInGrid", e.target.checked)}
        />
      </div>

      <div className="form-row">
        <label>Readonly</label>
        <input
          type="checkbox"
          checked={data.isReadonly || false}
          onChange={e => update("isReadonly", e.target.checked)}
        />
      </div>

    </div>
  );
}
