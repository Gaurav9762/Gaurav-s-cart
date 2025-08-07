import React, { useState } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [regState, setState] = useState("");
  const [phone, setPhone] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log("clciked");
    try {
      const respnse = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          address,
          city,
          regState,
          phone,
        }),
      });
      const data = await respnse.json();
      if (data) alert("success ");
      else alert("failed");
      console.log(data);
    } catch (error) {}
  };
  return (
    <>
      <div className="pt-16 justify-center flex items-center min-h-screen">
        <form
          className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
          onSubmit={handleRegister}
        >
          <h2 className="text-2xl font-semibold mb-6 text-center">Register</h2>
          <div className="mb-4">
            <InputField
              type={"text"}
              label={"Name"}
              onChange={(e) => setName(e.target.value)}
            ></InputField>
            <InputField
              type={"email"}
              label={"Email"}
              onChange={(e) => setEmail(e.target.value)}
            ></InputField>
            <InputField
              type={"password"}
              label={"Password"}
              onChange={(e) => setPassword(e.target.value)}
            ></InputField>
            <InputField
              type="text"
              label="Address"
              onChange={(e) => setAddress(e.target.value)}
            ></InputField>
            <InputField
              type="text"
              label="City"
              onChange={(e) => setCity(e.target.value)}
            ></InputField>
            <InputField
              type="text"
              label="State"
              onChange={(e) => setState(e.target.value)}
            ></InputField>
            <InputField
              type={"number"}
              label={"Phone"}
              onChange={(e) => setPhone(e.target.value)}
            ></InputField>
            <Button type={"submit"} text={"Register"}></Button>
          </div>
        </form>
      </div>
    </>
  );
};
export default Register;
