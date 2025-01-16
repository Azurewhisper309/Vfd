import { useContext } from "react";
import { Link } from "react-router-dom";

import { CRMContext } from "./CrmContext";
import MineIssues from "./MineIssues";

const Create = () => {
  const {
    forms,
    setForms,
    form,
    setForm,
    not,
    setNot,
    isClicked,
    setIsClicked,
    isEditing,
    setIsEditing,
  } = useContext(CRMContext);

  // Handle input changes for the form
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };


  const handleSelectChange = (event) => {
    setForm((prevForm) => ({ ...prevForm, typeOf: event.target.value }));
  };

  // Toggle the visibility of the form
  const toggleFormVisibility = () => {
    setIsClicked(!isClicked);
  };

  // Submit the form and add it to the list
  const handleSubmit = (event) => {
    event.preventDefault();
    if (form.typeOf && form.uniqueNumber && form.name) {
      setForms((prevForms) => [...prevForms, form]);
      setForm({ name: "", uniqueNumber: "", typeOf: "option1", takeNumber: "" });
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
            <h5>Choose an option</h5>
            <select value={form.typeOf} onChange={handleSelectChange}>
              <option disabled value="">
                Choose
              </option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
            </select>
          </div>
          <button type="submit">{isEditing ? "Save" : "Add"}</button>
        </form>
      )}
      <MineIssues />
      <h2>Not Relevant</h2>
      <ul>
        {not.map((f, index) => (
          <li key={index}>
            Name: {f.name}, Unique Number: {f.uniqueNumber}, Type: {f.typeOf}, TakeNumber: {f.takeNumber}
            <button onClick={() => toggleRelevance(index, true)}>Relevant</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Create;
