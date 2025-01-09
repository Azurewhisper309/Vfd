import { useContext } from "react";
import { CRMContext } from "./CrmContext";


export default function MineIssues() {
    const {forms, setForms,setForm,not,setNot,setIsClicked,isEditing,setIsEditing,setEditingId }=useContext(CRMContext);
//handle editing the issues form

    const handleEdit = (index) => {
       if(isEditing===false){
        const formToEdit = forms[index];
        setForm(formToEdit);
        setForms((prevForms) => prevForms.filter((_, i) => i !== index));
        setIsClicked(true);
        setIsEditing(!isEditing);
        setIsEditing(true);
        setEditingId(index)

       }
       else{
       console.log( <h1>its Over!</h1>);
       }
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


  return (
    <div>
       <h2>Forms</h2>
      <ul>
        {forms.map((f, index) => (
          <li key={index}>
            <span>Name: {f.name}</span>,{" "}
            <span>Unique Number: {f.uniqueNumber}</span>,{" "}
            <span>Type: {f.typeOf}</span>
            <span>Take Number: {f.takeNumber}</span>
            <button  onClick={()=>{ handleEdit(index)}}>Edit</button>
            <button onClick={() => toggleRelevance(index, false)}>Not Relevant</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
