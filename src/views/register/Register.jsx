//CSS
import "./Register.css";

//Dependency
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import {
  validateUsername,
  validatePasswordRegister,
  validateEmail,
} from "../../utils/formValidations";
import { registerUser } from "../../services/auth.service";
import {
  getUserDataByUsername,
  createUserHandle,
} from "../../services/user.service";
import { useContext, useState } from "react";

//Components
import { AppContext } from "../../context/AppContext";
import Input from "../../components/input/Input";
import PasswordInput from "../../components/password-input/PasswordInput";
import Button from "../../components/button/Button";
import Logo from "../../components/logo/Logo";
import UploadImage from "../../components/upload-image/UploadImage";

function Register() {
  // Use setError to programmatically set and display an error in the form when the registration fails on firebase. Note: setError takes the object to which the error is assigned e.g. "username". There is a "root" object that assigns the error to no specific field, allowing you to display it somewhere else on the form in cases where e.g. there is a problem with the server.
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm();
  const { handleLogout } = useContext(AppContext);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const imageUrl = watch("avatar");

  const onSubmit = async function (data) {
    try {
      const snapshot = await getUserDataByUsername(data.username);
      if (snapshot.exists()) {
        throw new Error(`Username @${data.username} has already been taken!`);
      }

      //Register user
      const userCredentials = await registerUser(data.email, data.password);

      //Log user in database
      createUserHandle({
        username: data.username,
        uid: userCredentials.user.uid,
        email: userCredentials.user.email,
        avatar: data.avatar,
      });

      //Logout user (firebase automatically logs users in)
      await handleLogout();
      setSuccess(true);
    } catch (e) {
      setError(
        "root",
        {
          type: "string",
          message: e.message,
        },
        { shouldFocus: true }
      );
    }
  };

  const usernameOptions = {
    ...register("username", {
      validate: (v) => validateUsername(v),
    }),
  };

  const emailOptions = {
    ...register("email", {
      validate: (v) => validateEmail(v),
    }),
  };

  const passwordOptions = {
    ...register("password", {
      validate: (v) => validatePasswordRegister(v),
    }),
  };

  const imageOptions = {
    ...register("avatar", {
      required: "Image is required.",
    }),
  };

  if (success)
    return (
      <div className="register-form-container">
        <Logo
          text={"chatterbox"}
          color={"white"}
          size={60}
          handleClick={() => void navigate("/")}
        />

        <div className="register-form">
          <h1>Success!</h1>
          <p>Your account has been creates successfully!</p>
          <Button handleClick={() => navigate("/login")}>Login</Button>
        </div>
      </div>
    );

  return (
    <div className="register-form-container">
      <Logo
        text={"chatterbox"}
        color={"white"}
        size={60}
        handleClick={() => void navigate("/")}
      />

      <form
        className="register-form"
        onSubmit={(e) => {
          e.preventDefault();
          //handleSubmit is a react-hook-form function that returns a function handling the event and returns a promise. We use void to explicitly ignore the returned promise as we have no asynchronous logic in the onSubmit handler.
          handleSubmit(onSubmit)(e);
        }}
      >
        <h1>Register</h1>
        {errors.root && <p className="form-error">{errors.root.message}</p>}
        <UploadImage
          clearErrors={clearErrors}
          setValue={setValue}
          imageUrl={imageUrl}
          error={errors.avatar}
        />
        <Input
          name="username"
          options={usernameOptions}
          error={errors.username}
        ></Input>

        <Input
          name="email"
          options={emailOptions}
          error={errors.email}
        ></Input>

        <PasswordInput
          name="password"
          options={passwordOptions}
          error={errors.password}
        ></PasswordInput>
        <p style={{ fontSize: "var(--font-caption)" }}>
          Already registered? <Link to="/login">Click here.</Link>
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

export default Register;
