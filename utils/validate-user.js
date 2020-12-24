const validatePasswordInput = (password) => {
  let passwordArr = [];

  if (password.trim() === "") {
    passwordArr.push("Password should not be empty");
  }
  if (password.length < 8) {
    // !password.match(/^(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.[!#$%^&? "])$/)
    passwordArr.push("Password should contain at least 8 characters");
  }
  // if (!password.match(/^(?=.*[a-zA-Z])$/)) {
  //   passwordArr.push(
  //     "Password should contain at least one lowercase character and one uppercase character"
  //   );
  // }
  // if (!password.match(/^(?=.*\d)$/)) {
  //   passwordArr.push("Password should contain at least one number");
  // }

  return passwordArr.length ? { password: passwordArr } : {};
};

const validateRegistrationInput = (
  username,
  email,
  firstName,
  lastName,
  password,
  confirmPassword
) => {
  let errors = {};

  if (username.trim() === "") {
    errors.username = "Username should not be empty";
  }
  if (email.trim() === "") {
    errors.email = " Email should not be empty";
  } else if (
    !email.match(
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/
    )
  ) {
    errors.email = "Please enter a valid email";
  }
  if (firstName.trim() === "") {
    errors.firstName = "First name should not be empty";
  }
  if (lastName.trim() === "") {
    errors.lastName = "Last name should not be empty";
  }
  errors = { ...errors, ...validatePasswordInput(password) };
  if (confirmPassword.trim() === "") {
    errors.confirmPassword = "Confirm password should not be empty";
  } else if (confirmPassword !== password) {
    errors.confirmPassword = "Confirm password & password don't match";
  }

  return { errors, valid: Object.keys(errors).length < 1 };
};

const validateLoginInput = (username, password) => {
  let errors = {};

  if (username.trim() === "") {
    errors.username = "Username should not be empty";
  }
  if (password.trim() === "") {
    errors.password = "Password should not be empty";
  }
  errors = { ...errors };
  return { errors, valid: Object.keys(errors).length < 1 };
};

const validateUserEditInput = (firstName, lastname, email) => {
  let errors = {};

  if (email.trim() === "") {
    errors.email = " Email should not be empty";
  } else if (
    !email.match(
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/
    )
  ) {
    errors.email = "Please enter a valid email";
  }
  if (firstName.trim() === "") {
    errors.firstName = "First name should not be empty";
  }
  if (lastName.trim() === "") {
    errors.lastName = "Last name should not be empty";
  }

  return { errors, valid: Object.keys(errors).length < 1 };
};

module.exports = {
  validateLoginInput,
  validateRegistrationInput,
  validateUserEditInput,
  validatePasswordInput,
};
