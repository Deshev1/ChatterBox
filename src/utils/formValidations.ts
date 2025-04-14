//Dependency
// import { parsePhoneNumberFromString } from "libphonenumber-js";

export const validateUsername = function (username: string): boolean | string {
  const trimmedUsername = username.trim();

  if (!trimmedUsername) {
    return "Username cannot be empty.";
  }

  if (trimmedUsername.length < 5) {
    return "Username must be at least 5 characters long.";
  }

  if (trimmedUsername.length > 35) {
    return "Username must be no more than 35 characters long.";
  }

  return true;
};

export const validatePasswordRegister = function (
  password: string
): boolean | string {
  const trimmedPassword = password.trim();

  if (!trimmedPassword) {
    return "Password cannot be empty.";
  }

  if (trimmedPassword.length < 8) {
    return "Password must be at least 8 characters long.";
  }

  if (trimmedPassword.length > 128) {
    return "Password must be no more than 128 characters long.";
  }

  if (!/[a-z]/.test(trimmedPassword)) {
    return "Password must contain at least one lowercase letter.";
  }

  if (!/[A-Z]/.test(trimmedPassword)) {
    return "Password must contain at least one uppercase letter.";
  }

  if (!/\d/.test(trimmedPassword)) {
    return "Password must contain at least one number.";
  }

  if (!/[^\w\s]/.test(trimmedPassword)) {
    return "Password must contain at least one special character.";
  }

  return true;
};

export const validatePasswordLogin = function (
  password: string
): boolean | string {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])[A-Za-z\d\W]{8,128}$/;

  const trimmedPassword = password.trim();

  if (!trimmedPassword) return "Password cannot be empty";

  if (trimmedPassword.length < 8) {
    return "Password must be at least 8 characters long.";
  }

  if (trimmedPassword.length > 128) {
    return "Password must be no more than 128 characters long.";
  }

  if (!passwordRegex.test(trimmedPassword))
    return "Password must meet all complexity requirements.";

  return true;
};

export const validateEmail = function (email: string): boolean | string {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const trimmedEmail = email.trim();

  if (!trimmedEmail) {
    return "Email cannot be empty.";
  }

  if (!emailRegex.test(trimmedEmail)) {
    return "Email is not valid.";
  }

  return true;
};

export const validateTeamName = function (username: string): boolean | string {
  const trimmedUsername = username.trim();

  if (!trimmedUsername) {
    return "Team name cannot be empty.";
  }

  if (trimmedUsername.length < 5) {
    return "Team name must be at least 5 characters long.";
  }

  if (trimmedUsername.length > 35) {
    return "Username must be no more than 35 characters long.";
  }

  return true;
};

// export const validateNumber = function (number: number) {
//   const phoneNumber: object | undefined = parsePhoneNumberFromString(
//     `+${number}`
//   );

//   if (!phoneNumber || !phoneNumber.isValid()) return false;

//   return true;
// };

// export const validateUserDetails = function (formData, setErrors) {
//   const newErrors = {};

//   //Regex validations
//   if (!nameRegex.test(formData.firstName)) {
//     newErrors.firstName = "Invalid first name!";
//   }
//   if (!nameRegex.test(formData.lastName)) {
//     newErrors.lastName = "Invalid last name!";
//   }

//   if (!usernameRegex.test(formData.username)) {
//     newErrors.username = "Invalid username!";
//   }

//   if (!emailRegex.test(formData.email)) {
//     newErrors.email = "Invalid email!";
//   }

//   if (formData.password) {
//     if (!passwordRegex.test(formData.password)) {
//       newErrors.password = "Invalid password!";
//     }
//   }

//   //Phone validation
//   const phoneNumber = parsePhoneNumberFromString(`+${formData.number}`);

//   if (!phoneNumber || !phoneNumber.isValid()) {
//     newErrors.number = "Invalid phone number";
//   }

//   setErrors(newErrors);

//   return Object.keys(newErrors).length === 0;
// };
