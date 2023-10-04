import React, { useState } from "react";

function SubmissionForm({submitWord}:{submitWord:Function}) {
  const [value, setValue] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    submitWord(value);
    setValue(()=>'');
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e)
    const {value} = e.target;
    
    setValue((prev)=>value)

  }

  return (
    <div className="SubmissionForm">
      <form onSubmit={handleSubmit}>
        <input type="text" value={value} onChange={handleChange} />
      </form>
    </div>
  );
}
export default SubmissionForm;
