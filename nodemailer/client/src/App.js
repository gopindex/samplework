import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    message: "",
  });
  const handleChange = (ev) => {
    setFormValues((prevState) => {
      return { ...prevState, [ev.target.name]: ev.target.value };
    });
  };

  // useEffect(() => {
  //   axios.get("/api").then((res) => console.log(res.data));
  // }, []);
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    try {
      await axios.post("/api/email", formValues);
      alert("The email has been sent");
    } catch {
      alert("Email Failed");
    }
  };
  return (
    <div className="App">
      <form onSubmit={handleSubmit} className="form">
        <h1>Send the email</h1>
        <input
          name="username"
          type="text"
          placeholder="Name"
          onChange={handleChange}
          value={formValues.username}
        ></input>
        <input
          type="text"
          name="email"
          onChange={handleChange}
          placeholder="Email"
          value={formValues.email}
        ></input>
        <textArea
          id="message"
          placeholder="Enter a message"
          name="message"
          onChange={handleChange}
          value={formValues.message}
        />
        <button type="submit" className="submitBtn">
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
