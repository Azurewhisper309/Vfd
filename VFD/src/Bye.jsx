import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CRMContext } from "./CrmContext";

const Bye = () => {
  const { forms, setForms } = useContext(CRMContext); // Access forms and updater function from context
  const [editingIndex, setEditingIndex] = useState(null); // Track which issue is being edited
  const [editedTakeNumber, setEditedTakeNumber] = useState(""); // Track current edit value
  const [editedStatues, setEditedStatues] = useState(""); // Track current edit value

  // Enable editing mode for a specific issue
  const handleEditTake = (index,nice) => {
    if(nice){
    setEditingIndex(index); // Set the index of the issue being edited
    setEditedTakeNumber(forms[index].takeNumber || ""); // Pre-fill the input with the current value
    
  }
  };
   // Enable editing mode for a specific issue
   const handleEditStatues = (index,nici) => {
    setEditingIndex(index); // Set the index of the issue being edited
    setEditedStatues(forms[index].statuess || ""); // Pre-fill the input with the current value
  };

  // Handle input change for `takeNumber`
  const handleInputChangeTake = (event) => {
    setEditedTakeNumber((preveditedTakeNumber)=>({...preveditedTakeNumber,takeNumber:event.target.value})); // Update local state for `takeNumber`
  };

  const handleInputChangeStatues = (event) => {
    setEditedStatues((preveditedStatues)=>({...preveditedStatues,statuess:event.target.value}));
  };

  // Save the changes to `takeNumber` and update global state
  const handleSave = () => {
    setForms((prevForms) =>
      prevForms.map((form, index) =>
        index === editingIndex
          ? { ...form, takeNumber: editedTakeNumber,statues:editedStatues } // Update only the edited form
          : form
      )
    );
    setEditingIndex(null); // Exit edit mode
    setEditedTakeNumber(""); // Reset the local state
    setEditedStatues("");
  };






  return (
    <div>
      <h1>All User's Issues</h1>
      <ul>
        {forms.map((form, index) => (
          <li key={index}>
            <span>Name: {form.name}</span>,{" "}
            <span>Unique Number: {form.uniqueNumber}</span>,{" "}
            <span>Type: {form.typeOf}</span>,{" "}
            <span>Status: {form.statues}</span>,{""}
            <span>
              Take Number:{" "}
              {editingIndex === index ? (
                <div>
                <input
                  type="text"
                  value={editedTakeNumber}
                  onChange={handleInputChangeTake}
                />
                <input
                  type="text"
                  value={editedTakeNumber}
                  onChange={handleInputChangeStatues}
                />
                </div>
              ) : (
                ((form.takeNumber || "Not Set")|(form.statues || "new to us") )
              
              )}
            </span>
            {editingIndex === index ? (
              <div>
              <button onClick={handleSave}>Save</button>
            
              </div>
            ) : (
              <div>
              <button onClick={() => handleEditStatues(index)}>Edit</button>
              <button onClick={() => handleEditTake(index)}>Edit2</button>
              </div>
            )}
          </li>
        ))}
      </ul>
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default Bye;
