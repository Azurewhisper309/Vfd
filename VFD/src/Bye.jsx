import { Link } from "react-router-dom";
import { useContext } from "react";
import { CRMContext } from "./CrmContext";


const Bye = () => {
  const { forms, isdashEdit, setIsDashEdit, form, setForm, setForms } = useContext(CRMContext);
    
  // Toggle edit mode for the form
  function handleEdit(index) {
    setIsDashEdit(true); // Enable edit mode
    const formToEdit = forms[index]; // Get the form to edit
    setForm(formToEdit); // Set the selected form as the current form
  }

  // Handle input changes for the form
  function handleInputChange(event) {
    const { name, value } = event.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value })); // Update the specific field in the form
  }

  // Handle form submission: Update the forms list
  function handleFormSubmit(event) {
    event.preventDefault(); // Prevent page refresh
    setForms((prevForms) =>
      prevForms.map((f) =>
        f.uniqueNumber === form.uniqueNumber ? form : f // Update the matching form in the list
      )
    );
    setIsDashEdit(false); // Exit edit mode
    setForm({ name: "", uniqueNumber: "", typeOf: "", takeNumber: "" }); // Reset the form state
  }

  return (
    <div>
      {!isdashEdit ? (
        <div>
          <ul>
            {forms.map((f, index) => (
              <li key={index}>
                Name: {f.name}, Unique Number: {f.uniqueNumber}, Type: {f.typeOf}, TakeNumber: {f.takeNumber}
                <button onClick={() => handleEdit(index)}>Edit</button>
              </li>
            ))}
          </ul>
          <Link to="/">Click to New!</Link>
        </div>
      ) : (
        <div>
          <h1>Edit Form</h1>
          <ul>
            {forms.map((f, index) => (
              <li key={index}>
                Name: {f.name}, Unique Number: {f.uniqueNumber}, Type: {f.typeOf}, TakeNumber: {f.takeNumber}
                <button onClick={() => handleEdit(index)}>Edit</button>
                 <form onSubmit={handleFormSubmit}>
            
            <div>
              <label>Take Number: </label>
              <input
                type="text"
                name="takeNumber"
                value={form.takeNumber || ""}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit">Save</button>
          </form>
              </li>
            ))}
          </ul>
         
          <Link to="/">Click to New!</Link>
        </div>
      )}
    </div>
  );
};

export default Bye;
