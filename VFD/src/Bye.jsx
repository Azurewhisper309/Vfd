import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CRMContext } from "./CrmContext";

const Bye = ({}) => {
  const { forms, setForms,allForms,setAllForms } = useContext(CRMContext); // Access forms and updater function from context
  const [editingIndex, setEditingIndex] = useState(null); // Tracks the index of the item being edited
  const [edited, setEdited] = useState({ takeNumber: "", status: "" }); // Tracks the values of the edited properties
  

  const handleEdit = (index) => {
    setEditingIndex(index); // Track the index being edited
    setEdited({
      takeNumber: allForms[index].takeNumber || "", // Pre-fill the input with the current value
      status: allForms[index].status || "", // Pre-fill the input with the current value
    });
  };
  // Separate items into groups


const filtering=(forms,status)=>forms.filter((one)=>one.status===status)


  const handleInputChange = (field, value) => {
    // Dynamically update the edited values
    setEdited((prevEdited) => ({
      ...prevEdited,
      [field]: value,
    }));
  };

  const handleSave = () => {
    // Save changes for the editing index
    setAllForms((prevAllForms) =>
      prevAllForms.map((form, index) =>
        index === editingIndex
          ? { ...form, ...edited } // Merge edited fields into the form
          : form
      )
    );
    // Reset state after saving
    setEditingIndex(null);
    setEdited({ takeNumber: "", status: "" });
  };

  return (
    <div>
      <h1>All User's Issues</h1>
      <ul>
        {allForms.map((form, index) => (
          <li key={index}>
            <span>Name: {form.name}</span>,{" "}
            <span>Unique Number: {form.uniqueNumber}</span>,{" "}
            <span>Type: {form.typeOf}</span>,{" "}
            <span>
              Status:{" "}
              {editingIndex === index ? (
                <select value={edited.status} onChange={(e)=>{handleInputChange("status", e.target.value)}}>
                <option value="New">new</option>
                <option value="Mine">me</option>
                <option value="Pending">Pending</option>
                <option value="Fixed">Fixed</option>
                <option value="Not Relevant">Not Relevant</option>
              </select>
              ) : (
                form.status || "New to us"
              )}
            </span>,{" "}
            <span>
              Take Number:{" "}
              {editingIndex === index ? (
                <input
                  type="text"
                  value={edited.takeNumber}
                  onChange={(e) =>
                    handleInputChange("takeNumber", e.target.value)
                  }
                />
              ) : (
                form.takeNumber || "Not Set"
              )}
            </span>
            {editingIndex === index ? (
              <div>
                <button onClick={handleSave}>Save</button>
              </div>
            ) : (
              <div>
                <button onClick={() => handleEdit(index)}>Edit</button>
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
