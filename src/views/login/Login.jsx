//CSS
import "./Login.css";

//Dependencies
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {
  validatePasswordLogin,
  validateEmail,
} from "../../utils/formValidations";

//Components
import PasswordInput from "../../components/password-input/PasswordInput";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import Logo from "../../components/logo/Logo";

function Login() {
  // Use setError to programmatically set and display an error in the form when the login fails on firebase
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();

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

  // Triggered only once there are no formErrors
  const onSubmit = async function (data) {
    await new ((resolve) => {
      setTimeout(() => {
        console.log(data);
        resolve();
      }, 5000);
    })();

    console.log(data.email, data.password);
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

        <Input
          options={emailOptions}
          error={errors.email}
        >
          <label>email</label>
        </Input>

        <PasswordInput
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

// //CSS
// import "./Login.css";

// //Dependencies
// import { useForm, SubmitHandler } from "react-hook-form";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   validatePasswordLogin,
//   validateEmail,
// } from "../../utils/formValidations";

// //Components
// import PasswordInput from "../../components/password-input/PasswordInput";
// import Input from "../../components/input/Input";
// import Button from "../../components/button/Button";
// import Logo from "../../components/logo/Logo";

// type LoginParams = {
//   email: string;
//   password: string;
// };

// function Login() {
//   // Use setError to programmatically set and display an error in the form when the login fails on firebase
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm<LoginParams>();
//   const navigate = useNavigate();

//   const emailOptions = {
//     ...register("email", {
//       validate: (v: string) => validateEmail(v),
//     }),
//   };

//   const passwordOptions = {
//     ...register("password", {
//       validate: (v: string) => validatePasswordLogin(v),
//     }),
//   };

//   // Triggered only once there are no formErrors
//   const onSubmit: SubmitHandler<LoginParams> = async function (
//     data
//   ): Promise<void> {
//     await new Promise<void>((resolve) => {
//       setTimeout(() => {
//         console.log(data);
//         resolve();
//       }, 5000);
//     });

//     console.log(data.email, data.password);
//   };

//   return (
//     <div className="login-form-container">
//       <Logo
//         text={"chatterbox"}
//         color={"white"}
//         size={60}
//         handleClick={() => void navigate("/")}
//       />
//       <form
//         className="login-form"
//         onSubmit={(e) => {
//           e.preventDefault();
//           //handleSubmit is a react-hook-form function that returns a function handling the event and returns a promise. We use void to explicitly ignore the returned promise as we have no asynchronous logic in the onSubmit handler.
//           void handleSubmit(onSubmit)(e);
//         }}
//       >
//         <h1>Login</h1>

//         <Input
//           options={emailOptions}
//           error={errors.email}
//         >
//           <label>email</label>
//         </Input>

//         <PasswordInput
//           options={passwordOptions}
//           error={errors.password}
//         >
//           <label>password</label>
//         </PasswordInput>
//         <p style={{ fontSize: "var(--font-caption" }}>
//           New here? <Link to="/register">Register here.</Link>
//         </p>

//         <Button
//           type={"submit"}
//           disabled={isSubmitting}
//         >
//           Continue
//         </Button>
//       </form>
//     </div>
//   );
// }

// export default Login;
