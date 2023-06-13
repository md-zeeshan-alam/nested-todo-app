import React, {
  ChangeEvent,
  FormEvent,
  FormEventHandler,
  useContext,
  useState,
} from "react";
import { jwtToken, userLoginData } from "../../utils/lodinUserData";
import { AppContext } from "../../utils/appContext";
import { useNavigate } from "react-router-dom";

import "./styles.css";

const SignInForm = () => {
  const [input, setInput] = useState<{
    loginUserName: string;
    loginPassword: string;
  }>({ loginUserName: "", loginPassword: "" });

  const navigate = useNavigate();

  const context: any = useContext(AppContext);
  const { actions } = context || {};
  const { userName, password } = userLoginData;
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!input.loginUserName || !input.loginPassword) {
      window.alert(`Please enter Username and Password`);
    } else if (
      input.loginUserName !== userName ||
      input.loginPassword !== password
    ) {
      window.alert(`Please enter valid Username and password`);
    } else {
      actions.signIn({
        username: input.loginUserName,
        password: input.loginPassword,
        token: jwtToken,
      });
      localStorage.setItem("jwt-token", JSON.stringify(jwtToken));
      navigate("/dashboard");
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInput({ ...input, [name]: value });
  };

  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit} className="form" autoComplete="true">
        <div className="inputWrapper">
          <h3>Username</h3>
          <input
            name="loginUserName"
            placeholder="Enter your username"
            value={input.loginUserName}
            type="text"
            onChange={handleInputChange}
            className="input"
          />
        </div>

        <div className="inputWrapper">
          <h3>Password</h3>
          <input
            name="loginPassword"
            placeholder="Enter your password"
            value={input.loginPassword}
            type="text"
            onChange={handleInputChange}
            className="input"
          />
        </div>

        <button type="submit" className="loginButton">
          Login
        </button>
      </form>
    </div>
  );
};

export default SignInForm;
