import React, { useState, useEffect } from "react";
import axios from "axios"



function Form() {
  const [input, setInput] = useState({
    name: "",
    bio: ""
  });

  const handleChange = e => {
      setInput({
          ...input,
          [e.target.name]: e.target.value
      })
  }

  useEffect(() => {
    axios.post("http://localhost:8000/api/users", input)
        .then(res => {
            console.log("res",res)
        })
        .catch(err => console.log("err",err))
  },[])

  return (
    <div>
      <form>
        <input
          type="text"
          name="name"
          placeholder="...name"
          value={input.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="bio"
          placeholder="...bio"
          value={input.bio}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Form;
