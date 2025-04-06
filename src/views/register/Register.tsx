//CSS
import "./Register.css";

//Dependency
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import {
  validateUsername,
  validatePasswordRegister,
  validateEmail,
} from "../../utils/formValidations";

//Components
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import StatCircle from "../landing/body/landing-stats/stat-circle/StatCircle";

type RegistrationParams = {
  username: string;
  email: string;
  password: string;
};

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationParams>();

  const onSubmit: SubmitHandler<RegistrationParams> = function (data): void {
    console.log(data.email, data.password, data.username);
  };

  const usernameOptions = {
    ...register("username", {
      validate: (v: string) => validateUsername(v),
    }),
  };

  const emailOptions = {
    ...register("email", {
      validate: (v: string) => validateEmail(v),
    }),
  };

  const passwordOptions = {
    ...register("password", {
      validate: (v: string) => validatePasswordRegister(v),
    }),
  };

  return (
    <div className="register-form-container">
      <form
        className="register-form"
        onSubmit={(e) => {
          e.preventDefault();
          console.log("asdf");
          //handleSubmit is a react-hook-form function that returns a function handling the event and returns a promise. We use void to explicitly ignore the returned promise as we have no asynchronous logic in the onSubmit handler.
          void handleSubmit(onSubmit)(e);
        }}
      >
        <h1>Register</h1>
        {/* Temporary placeholder for avatar upload */}
        <div style={{ margin: "var(--space-sm) 0px var(--space-sm) 0px" }}>
          <StatCircle size={120}>Profile picture*</StatCircle>
        </div>
        <Input
          options={usernameOptions}
          error={errors.username}
        >
          <label>username</label>
        </Input>

        <Input
          options={emailOptions}
          error={errors.email}
        >
          <label>email</label>
        </Input>

        <Input
          options={passwordOptions}
          error={errors.password}
        >
          <label>password</label>
        </Input>
        <p style={{ fontSize: "var(--font-caption" }}>
          Already registered? <Link to="/login">Click here.</Link>
        </p>

        <Button type={"submit"}>Continue</Button>
      </form>
    </div>
  );
}

export default Register;
