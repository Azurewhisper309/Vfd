import { useContext } from "react";
import "./Create.css";
import { Link } from "react-router-dom";
import { CRMContext } from "./CrmContext";
import MineIssues from "./MineIssues";
const Create = () => {
  // State for managing the form and the list of forms
 
  const {forms,setForms,form,setForm,not,setNot,isClicked,setIsClicked,isEditing,setIsEditing}=useContext(CRMContext);
  
  // Handle input changes for the form
  const handleInputChange = (event) => {
    const { name, value } = event.target;  
    if (name === "name" ) {
        const isValidText = /^[a-zA-Z ]*$/.test(value);
        if (!isValidText) return; // Ignore invalid characters
      }
      // Validate for number input
      if (name === "uniqueNumber") {
        const isValidNumber = /^\d*$/.test(value);
        if (!isValidNumber) return; // Ignore non-numeric characters
      }
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };





  
// Mark a form as not relevant or move it back to relevant
const toggleRelevance = (index, isNotRelevant) => {
if (!isNotRelevant) {
  const formToRemove = forms[index];
  setNot((prevNot) => [...prevNot, formToRemove]);
  setForms((prevForms) => prevForms.filter((_, i) => i !== index));
} else {
  const formToAdd = not[index];
  setNot((prevNot) => prevNot.filter((_, i) => i !== index));
  setForms((prevForms) => [...prevForms, formToAdd]);
}
};








  function handleSelectChange(event){
    setForm((prevFormi)=>({...prevFormi,typeOf:event.target.value}));
    }  
  // Toggle the visibility of the form
  const toggleFormVisibility = () => {
    setIsClicked(!isClicked);
  };
  // Submit the form and add it to the list
  const handleSubmit = (event) => {
    event.preventDefault();
    if (form.typeOf && form.uniqueNumber && form.name) {
      setForms((prevForms) => [...prevForms, form]);
      setForm({ name: "", uniqueNumber: "", typeOf: "" });
      setIsEditing(false);
    }
   
  };


  return (
    <>
      <Link to="/byebye" style={{ marginRight: "10px" }}>
        Bye
      </Link>
      <button onClick={toggleFormVisibility}>
        {isClicked ? "Hide" : "Show"} Element
      </button>
      {isClicked && (
        <form className="all" onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={handleInputChange}
            value={form.name}
            name="name"
            placeholder="Name"
            required
          />
          <input
            type="number"
            onChange={handleInputChange}
            value={form.uniqueNumber}
            name="uniqueNumber"
            placeholder="Unique Number"
            required
          />
          <div>
          <h5>choose an option</h5>
            <select value={form.typeOf} onChange={handleSelectChange}>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
            <option value="option4">Option 4</option>
            <option value="option5">Option 5</option>
            </select>

            </div>
            
          <button type="submit">{isEditing?"save":"add"}</button>
        </form>
      )}
     <MineIssues/>
      <h2>Not Relevant</h2>
      <ul>
        {not.map((f, index) => (
          <li key={index}>
            Name: {f.name}, Unique Number: {f.uniqueNumber}, Type: {f.typeOf}
            <button onClick={() => toggleRelevance(index, true)}>Relevant</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Create;
