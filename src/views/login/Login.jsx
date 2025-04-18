//CSS
import "./Login.css";

//Dependencies
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {
  validatePasswordLogin,
  validateEmail,
} from "../../utils/formValidations";
import { getUserDataByUid } from "../../services/user.service";
import { loginUser } from "../../services/auth.service";
import { useContext } from "react";

//Components
import { AppContext } from "../../context/AppContext";

import PasswordInput from "../../components/password-input/PasswordInput";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import Logo from "../../components/logo/Logo";

function Login() {
  // Use setError to programmatically set and display an error in the form when the login fails on firebase
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();
  const { setContext } = useContext(AppContext);

  const emailOptions = {
    ...register("email", {
      validate: (v) => validateEmail(v),
    }),
  };

  const passwordOptions = {
    ...register("password", {
      validate: (v) => validatePasswordLogin(v),
    }),
  };

  const onSubmit = async function (data) {
    try {
      const credentials = await loginUser(data.email, data.password);
      const snapshot = await getUserDataByUid(credentials.user.uid);
      if (!snapshot.exists()) {
        throw new Error("Couldn't get user data.");
      }

      const userData = { ...snapshot.val() };

      setContext((prev) => {
        return { ...prev, userData };
      });

      localStorage.setItem("userData", JSON.stringify(userData));

      navigate(`/${credentials.user.uid}/friends/all`);
    } catch (e) {
      setError(
        "root",
        { type: "string", message: e.message },
        { shouldFocus: true }
      );
    }
  };

  return (
    <div className="login-form-container">
      <Logo
        text={"chatterbox"}
        color={"white"}
        size={60}
        handleClick={() => void navigate("/")}
      />
      <form
        className="login-form"
        onSubmit={(e) => {
          e.preventDefault();
          //handleSubmit is a react-hook-form function that returns a function handling the event and returns a promise. We use void to explicitly ignore the returned promise as we have no asynchronous logic in the onSubmit handler.
          void handleSubmit(onSubmit)(e);
        }}
      >
        <h1>Login</h1>
        {errors.root && <p className="form-error">{errors.root.message}</p>}
        <Input
          name="email"
          options={emailOptions}
          error={errors.email}
        >
          <label>email</label>
        </Input>

        <PasswordInput
          name="password"
          options={passwordOptions}
          error={errors.password}
        >
          <label>password</label>
        </PasswordInput>
        <p style={{ fontSize: "var(--font-caption" }}>
          New here? <Link to="/register">Register here.</Link>
        </p>

        <Button
          type={"submit"}
          disabled={isSubmitting}
        >
          Continue
        </Button>
      </form>
    </div>
  );
}

export default Login;
