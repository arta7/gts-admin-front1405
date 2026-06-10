
import React, { useState } from "react";
import "./ComponentFieldEditForm.css";

export default function ComponentFieldEditForm({
  componentField,
  tableFields,
  onSave,
  onCancel,
}) {
  const [cf, setCF] = useState(componentField);

  function update(field, value) {
    setCF({ ...cf, [field]: value });
  }

  return (
    <div className="cf-form">
      <div className="cf-header">
        <strong>
          {cf.id ? "Edit Component Field" : "New Component Field"}
        </strong>
      </div>

      <div className="cf-tabs">

        <input type="radio" name="cf-tab" id="cf-tab1" defaultChecked />
        <label htmlFor="cf-tab1">Display</label>

        <input type="radio" name="cf-tab" id="cf-tab2" />
        <label htmlFor="cf-tab2">Behavior</label>

        <input type="radio" name="cf-tab" id="cf-tab3" />
        <label htmlFor="cf-tab3">Validation</label>

        <div className="cf-tab-content" id="cf-content1">

          <div className="cf-row">
            <label>Field</label>
            <select
              value={cf.fieldId || ""}
              onChange={(e) => update("fieldId", Number(e.target.value))}
            >
              <option value="">-- select --</option>
              {tableFields.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.fieldName}
                </option>
              ))}
            </select>
          </div>

          <div className="cf-row">
            <label>Alias Name</label>
            <input
              value={cf.aliasName || ""}
              onChange={(e) => update("aliasName", e.target.value)}
            />
          </div>

          <div className="cf-row">
            <label>Caption</label>
            <input
              value={cf.caption || ""}
              onChange={(e) => update("caption", e.target.value)}
            />
          </div>

          <div className="cf-row">
            <label>Sequence</label>
            <input
              type="number"
              value={cf.seq || 0}
              onChange={(e) => update("seq", Number(e.target.value))}
            />
          </div>

          <div className="cf-row">
            <label>Visible</label>
            <input
              type="checkbox"
              checked={cf.isVisible === 1}
              onChange={(e) => update("isVisible", e.target.checked ? 1 : 0)}
            />
          </div>

        </div>

        <div className="cf-tab-content" id="cf-content2">

          <div className="cf-row">
            <label>Readonly</label>
            <input
              type="checkbox"
              checked={cf.isReadOnly === 1}
              onChange={(e) => update("isReadOnly", e.target.checked ? 1 : 0)}
            />
          </div>

          <div className="cf-row">
            <label>Mandatory</label>
            <input
              type="checkbox"
              checked={cf.isMandatory === 1}
              onChange={(e) => update("isMandatory", e.target.checked ? 1 : 0)}
            />
          </div>

          <div className="cf-row">
            <label>Use in Save Method</label>
            <input
              type="checkbox"
              checked={cf.useInSaveMethod === 1}
              onChange={(e) =>
                update("useInSaveMethod", e.target.checked ? 1 : 0)
              }
            />
          </div>

        </div>

        <div className="cf-tab-content" id="cf-content3">

          <div className="cf-row">
            <label>Min Length</label>
            <input
              type="number"
              value={cf.minLen || ""}
              onChange={(e) => update("minLen", Number(e.target.value))}
            />
          </div>

          <div className="cf-row">
            <label>Max Length</label>
            <input
              type="number"
              value={cf.maxLen || ""}
              onChange={(e) => update("maxLen", Number(e.target.value))}
            />
          </div>

          <div className="cf-row">
            <label>Regex</label>
            <input
              value={cf.regex || ""}
              onChange={(e) => update("regex", e.target.value)}
            />
          </div>

        </div>

      </div>

      <div className="cf-footer">
        <button onClick={() => onSave(cf)}>Save</button>
        <button className="cancel-btn" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}
