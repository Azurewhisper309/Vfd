import { createContext, useState } from "react";

// Create Context
export const CRMContext = createContext();

// CRM Provider
export const CRMProvider = ({ children }) => {
  const [forms, setForms] = useState([]); // List of forms
  const [userId, setUserId] = useState("u9349535");
  const [issues, setIssues] = useState([]); // Issues state
  const [form, setForm] = useState({ name: "", uniqueNumber: "", typeOf: "option1", takeNumber: "" ,statues:"new"});
  const [not, setNot] = useState([]); // Not relevant forms
  const [isClicked, setIsClicked] = useState(false); // Show/hide form
  const [isEditing, setIsEditing] = useState(false); // Editing state
  const [editingId, setEditingId] = useState(""); // Current editing form ID
  const [isdashEdit, setIsDashEdit] = useState(false); // Toggle dashboard edit mode

  return (
    <CRMContext.Provider
      value={{
        forms,
        setForms,
        userId,
        setUserId,
        issues,
        setIssues,
        form,
        setForm,
        not,
        setNot,
        isClicked,
        setIsClicked,
        isEditing,
        setIsEditing,
        editingId,
        setEditingId,
        isdashEdit,
        setIsDashEdit,
      }}
    >
      {children}
    </CRMContext.Provider>
  );
};
