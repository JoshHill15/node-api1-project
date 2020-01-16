import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Form from "./components/Form"


function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/users")
      .then(res => {
        console.log("res",res.data)
        setData(res.data)
      })
      .catch(err => console.log("err", err));
  }, []);

  if (data) console.log("data",data)
  return (
    <div className="App">
    <h1>Front end of Node-API1</h1>
    <Form />
      {data.map(cv => (
        <div>
          <h1 key = {cv.created_at}>{cv.name}</h1>
        </div>
      ))}
    </div>
  );
}

export default App;
