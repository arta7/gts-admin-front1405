// src/pages/ComponentDesignerPage.jsx

import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "./axiosConfig"; // مهم: axiosConfig مشترک پروژه
import ComponentFieldEditForm from "./ComponentFieldEditForm";
import "./ComponentDesignerPage.css";

const ComponentDesignerPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // خواندن componentId (اختیاری) از query-string
  const queryParams = new URLSearchParams(location.search);
  const initialComponentId = queryParams.get("id");

  const [components, setComponents] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null);

  const [availableTables, setAvailableTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState("");

  const [availableFields, setAvailableFields] = useState([]);
  const [componentFields, setComponentFields] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isSpGenerating, setIsSpGenerating] = useState(false);
  const [error, setError] = useState(null);

  const [editingField, setEditingField] = useState(null); // برای بازکردن فرم ویرایش/ایجاد
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // --- Helpers ---
  const openEditModal = (field) => {
    setEditingField(field);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingField(null);
  };

  // به دست آوردن کامپوننت انتخاب شده (با id که از URL آمد)
  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // 1. گرفتن لیست کامپوننت‌ها
        const componentsRes = await axios.get("/api/components");
        const allComponents = componentsRes.data || [];
        setComponents(allComponents);

        // اگر initialComponentId وجود داشت، همان را انتخاب کن
        if (initialComponentId) {
          const matched = allComponents.find(
            (c) =>
              String(c.id) === String(initialComponentId) ||
              String(c.component_id) === String(initialComponentId)
          );
          if (matched) {
            setSelectedComponent(matched);
          }
        }

        // 2. گرفتن جدول‌های قابل استفاده
        const tablesRes = await axios.get("/api/fields/tables");
        const tables = tablesRes.data || [];
        setAvailableTables(tables);

        // انتخاب اولین جدول، اگر کاربر هنوز انتخابی ندارد
        if (!selectedTable && tables.length > 0) {
          setSelectedTable(tables[0].table_name || tables[0]);
        }
      } catch (err) {
        console.error("Error loading initial data:", err);
        setError("خطا در بارگذاری اطلاعات اولیه");
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // وقتی selectedTable عوض شد، فیلدهای آن جدول را از /api/fields می‌گیریم
  useEffect(() => {
    const fetchFields = async () => {
      if (!selectedTable) return;
      try {
        setIsLoading(true);
        setError(null);
        const res = await axios.get("/api/fields", {
          params: { tableName: selectedTable },
        });
        setAvailableFields(res.data || []);
      } catch (err) {
        console.error("Error fetching fields:", err);
        setError("خطا در دریافت فیلدهای جدول");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFields();
  }, [selectedTable]);

  // وقتی selectedComponent عوض شد، فیلدهای آن کامپوننت را از /api/component-fields می‌گیریم
  useEffect(() => {
    const fetchComponentFields = async () => {
      if (!selectedComponent) {
        setComponentFields([]);
        return;
      }
      try {
        setIsLoading(true);
        setError(null);
        const res = await axios.get("/api/component-fields", {
          params: { componentId: selectedComponent.id || selectedComponent.component_id },
        });
        setComponentFields(res.data || []);
      } catch (err) {
        console.error("Error fetching component fields:", err);
        setError("خطا در دریافت فیلدهای کامپوننت");
      } finally {
        setIsLoading(false);
      }
    };

    fetchComponentFields();
  }, [selectedComponent]);

  // لیست فیلدهایی که هنوز به کامپوننت اضافه نشده‌اند
  const unassignedFields = useMemo(() => {
    if (!availableFields || !componentFields) return availableFields || [];
    const usedFieldNames = new Set(
      componentFields.map((cf) => cf.field_name || cf.column_name)
    );
    return availableFields.filter(
      (f) => !usedFieldNames.has(f.column_name || f.field_name)
    );
  }, [availableFields, componentFields]);

  // انتخاب کامپوننت از Dropdown
  const handleSelectComponent = (e) => {
    const value = e.target.value;
    if (!value) {
      setSelectedComponent(null);
      setComponentFields([]);
      return;
    }
    const comp = components.find(
      (c) => String(c.id) === value || String(c.component_id) === value
    );
    setSelectedComponent(comp || null);
    // پاک کردن query-string
    navigate("/component-designer", { replace: true });
  };

  // انتخاب جدول
  const handleSelectTable = (e) => {
    const value = e.target.value;
    setSelectedTable(value);
  };

  // کلیک روی فیلد از لیست FIELDS تا برای کامپوننت جدید ساخته شود
  const handleAddFieldToComponent = (fieldMeta) => {
    if (!selectedComponent) {
      alert("ابتدا یک کامپوننت انتخاب کنید.");
      return;
    }

    const newField = {
      id: 0,
      component_id: selectedComponent.id || selectedComponent.component_id,
      component_name: selectedComponent.name || selectedComponent.component_name,
      field_name: fieldMeta.column_name,
      label: fieldMeta.column_name,
      data_type: fieldMeta.data_type,
      is_required: false,
      is_visible: true,
      order_no: (componentFields[componentFields.length - 1]?.order_no || 0) + 1,
      max_length: fieldMeta.character_maximum_length || null,
      // هر تنظیم دیگری که در مدل خودت داری اینجا اضافه کن
    };

    openEditModal(newField);
  };

  // ذخیره (ایجاد/ویرایش) فیلد کامپوننت
  const handleSaveComponentField = async (fieldData) => {
    try {
      setIsLoading(true);
      setError(null);

      let saved;
      if (!fieldData.id || fieldData.id === 0) {
        // ایجاد
        const res = await axios.post("/api/component-fields", fieldData);
        saved = res.data;
      } else {
        // ویرایش
        const res = await axios.put(
          `/api/component-fields/${fieldData.id}`,
          fieldData
        );
        saved = res.data;
      }

      // به‌روزرسانی state
      setComponentFields((prev) => {
        const idx = prev.findIndex((x) => x.id === saved.id);
        if (idx === -1) return [...prev, saved];
        const copy = [...prev];
        copy[idx] = saved;
        return copy;
      });

      closeEditModal();
    } catch (err) {
      console.error("Error saving component field:", err);
      setError("خطا در ذخیره فیلد کامپوننت");
    } finally {
      setIsLoading(false);
    }
  };

  // حذف فیلد از کامپوننت
  const handleDeleteComponentField = async (fieldId) => {
    if (!window.confirm("آیا از حذف این فیلد مطمئن هستید؟")) return;

    try {
      setIsLoading(true);
      setError(null);
      await axios.delete(`/api/component-fields/${fieldId}`);
      setComponentFields((prev) => prev.filter((f) => f.id !== fieldId));
    } catch (err) {
      console.error("Error deleting component field:", err);
      setError("خطا در حذف فیلد کامپوننت");
    } finally {
      setIsLoading(false);
    }
  };

  // تولید Stored Procedure ها
  const handleGenerateSp = async () => {
    if (!selectedComponent) {
      alert("ابتدا یک کامپوننت انتخاب کنید.");
      return;
    }

    try {
      setIsSpGenerating(true);
      setError(null);
      const res = await axios.post("/api/generate-sp", {
        componentId: selectedComponent.id || selectedComponent.component_id,
      });

      // می‌توانی نتیجه را به صورت alert یا نمایش در صفحه نشان دهی
      alert(res.data?.message || "Stored Procedure با موفقیت تولید شد.");
    } catch (err) {
      console.error("Error generating SP:", err);
      setError("خطا در تولید Stored Procedure");
    } finally {
      setIsSpGenerating(false);
    }
  };

  return (
    <div className="component-designer-page">
      <div className="cd-header">
        <h1>Component Designer</h1>
        <div className="cd-header-actions">
          <button
            className="cd-btn"
            onClick={() => navigate("/components")}
          >
            بازگشت به لیست کامپوننت‌ها
          </button>
          <button
            className="cd-btn cd-btn-primary"
            onClick={handleGenerateSp}
            disabled={!selectedComponent || isSpGenerating}
          >
            {isSpGenerating ? "در حال تولید SP..." : "تولید Stored Procedure"}
          </button>
        </div>
      </div>

      {error && <div className="cd-error">{error}</div>}

      {/* انتخاب کامپوننت و جدول */}
      <div className="cd-top-filters">
        <div className="cd-field">
          <label>انتخاب کامپوننت:</label>
          <select
            value={
              selectedComponent
                ? selectedComponent.id || selectedComponent.component_id
                : ""
            }
            onChange={handleSelectComponent}
          >
            <option value="">-- انتخاب کامپوننت --</option>
            {components.map((c) => (
              <option
                key={c.id || c.component_id}
                value={c.id || c.component_id}
              >
                {c.name || c.component_name} (
                {c.table_name || c.base_table || "-"})
              </option>
            ))}
          </select>
        </div>

        <div className="cd-field">
          <label>انتخاب جدول (Source Table):</label>
          <select value={selectedTable} onChange={handleSelectTable}>
            {availableTables.map((t) => {
              const tableName = t.table_name || t;
              return (
                <option key={tableName} value={tableName}>
                  {tableName}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      {/* دو ستون: فیلدهای جدول و فیلدهای کامپوننت */}
      <div className="cd-content">
        <div className="cd-panel">
          <h2>فیلدهای جدول (Available Fields)</h2>
          {isLoading && availableFields.length === 0 ? (
            <div className="cd-loading">در حال بارگذاری...</div>
          ) : (
            <table className="cd-table">
              <thead>
                <tr>
                  <th>نام ستون</th>
                  <th>نوع داده</th>
                  <th>طول</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {unassignedFields.map((f) => (
                  <tr key={f.column_name}>
                    <td>{f.column_name}</td>
                    <td>{f.data_type}</td>
                    <td>{f.character_maximum_length || "-"}</td>
                    <td>
                      <button
                        className="cd-btn cd-btn-sm"
                        onClick={() => handleAddFieldToComponent(f)}
                        disabled={!selectedComponent}
                      >
                        افزودن به کامپوننت
                      </button>
                    </td>
                  </tr>
                ))}
                {unassignedFields.length === 0 && (
                  <tr>
                    <td colSpan={4} className="cd-empty">
                      همه‌ی فیلدهای این جدول به کامپوننت تخصیص داده شده‌اند
                      یا جدولی انتخاب نشده است.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        <div className="cd-panel">
          <h2>فیلدهای کامپوننت (Component Fields)</h2>
          {!selectedComponent ? (
            <div className="cd-empty">
              ابتدا یک کامپوننت از لیست بالا انتخاب کنید.
            </div>
          ) : isLoading && componentFields.length === 0 ? (
            <div className="cd-loading">در حال بارگذاری...</div>
          ) : (
            <table className="cd-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Field Name</th>
                  <th>Label</th>
                  <th>Data Type</th>
                  <th>Required</th>
                  <th>Visible</th>
                  <th>Order</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {componentFields.map((cf, idx) => (
                  <tr key={cf.id}>
                    <td>{cf.order_no || idx + 1}</td>
                    <td>{cf.field_name}</td>
                    <td>{cf.label}</td>
                    <td>{cf.data_type}</td>
                    <td>{cf.is_required ? "بله" : "خیر"}</td>
                    <td>{cf.is_visible ? "بله" : "خیر"}</td>
                    <td>{cf.order_no}</td>
                    <td>
                      <button
                        className="cd-btn cd-btn-sm"
                        onClick={() => openEditModal(cf)}
                      >
                        ویرایش
                      </button>
                      <button
                        className="cd-btn cd-btn-sm cd-btn-danger"
                        onClick={() => handleDeleteComponentField(cf.id)}
                      >
                        حذف
                      </button>
                    </td>
                  </tr>
                ))}
                {componentFields.length === 0 && (
                  <tr>
                    <td colSpan={8} className="cd-empty">
                      برای این کامپوننت هنوز فیلدی تعریف نشده است.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modal ویرایش/ایجاد فیلد کامپوننت */}
      {isEditModalOpen && editingField && (
        <div className="cd-modal-backdrop">
          <div className="cd-modal">
            <div className="cd-modal-header">
              <h3>
                {editingField.id && editingField.id !== 0
                  ? "ویرایش فیلد کامپوننت"
                  : "افزودن فیلد به کامپوننت"}
              </h3>
              <button className="cd-modal-close" onClick={closeEditModal}>
                ×
              </button>
            </div>
            <div className="cd-modal-body">
              <ComponentFieldEditForm
                field={editingField}
                onCancel={closeEditModal}
                onSave={handleSaveComponentField}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComponentDesignerPage;
