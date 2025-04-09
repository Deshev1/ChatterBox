//CSS
import "./Register.css";

//Dependency
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import {
  validateUsername,
  validatePasswordRegister,
  validateEmail,
} from "../../utils/formValidations";

//Components
import Input from "../../components/input/Input";
import PasswordInput from "../../components/password-input/PasswordInput";
import Button from "../../components/button/Button";
import Logo from "../../components/logo/Logo";
import UploadImage from "../../components/upload-image/UploadImage";

type RegistrationParams = {
  username: string;
  email: string;
  password: string;
  image: string;
};

function Register() {
  // Use setError to programmatically set and display an error in the form when the registration fails on firebase. Note: setError takes the object to which the error is assigned e.g. "username". There is a "root" object that assigns the error to no specific field, allowing you to display it somewhere else on the form in cases where e.g. there is a problem with the server.
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationParams>();
  const navigate = useNavigate();

  const imageUrl = watch("image");

  const onSubmit: SubmitHandler<RegistrationParams> = async function (
    data
  ): Promise<void> {
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log(data);
        resolve();
      }, 1000);
    });

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

  const imageOptions = {
    ...register("image", {
      required: "Image is required.",
    }),
  };

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
          void handleSubmit(onSubmit)(e);
        }}
      >
        <h1>Register</h1>
        <UploadImage
          clearErrors={clearErrors}
          setValue={setValue}
          imageUrl={imageUrl}
          error={errors.image}
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
