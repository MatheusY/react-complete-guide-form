import useInput from "../hooks/use-input";

const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const BasicForm = (props) => {
  const {
    value: enteredFirstName,
    isValid: firstNameInputIsValid,
    hasError: firstNameInputHasError,
    valueChangeHandler: firstNameChangeHandler,
    valueBlurHandler: firstNameBlurHandler,
    reset: resetFirstNameInput,
  } = useInput((name) => name.trim() !== "");

  const {
    value: enteredLastName,
    isValid: lastNameInputIsValid,
    hasError: lastNameInputHasError,
    valueChangeHandler: lastNameChangeHandler,
    valueBlurHandler: lastNameBlurHandler,
    reset: resetLastNameInput,
  } = useInput((lastName) => lastName.trim() !== "");

  const {
    value: enteredEmail,
    isValid: emailInputIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    valueBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput(validateEmail);

  let formIsValid = false;

  if (firstNameInputIsValid && lastNameInputIsValid && emailInputIsValid) {
    formIsValid = true;
  }

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    console.log(enteredFirstName);

    resetFirstNameInput();
    resetLastNameInput();
    resetEmailInput();
  };

  const firstNameClass = firstNameInputHasError
    ? "form-control invalid"
    : "form-control";

  const lastNameClass = lastNameInputHasError
    ? "form-control invalid"
    : "form-control";

  const emailClass = emailInputHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmitHandler}>
      <div className="control-group">
        <div className={firstNameClass}>
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            id="name"
            value={enteredFirstName}
            onChange={firstNameChangeHandler}
            onBlur={firstNameBlurHandler}
          />
          {firstNameInputHasError && (
            <p className="error-text">Name must be informed!</p>
          )}
        </div>
        <div className={lastNameClass}>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            value={enteredLastName}
            onChange={lastNameChangeHandler}
            onBlur={lastNameBlurHandler}
          />
          {lastNameInputHasError && (
            <p className="error-text">Last Name must be informed!</p>
          )}
        </div>
      </div>
      <div className={emailClass}>
        <label htmlFor="email">E-Mail Address</label>
        <input
          type="text"
          id="email"
          value={enteredEmail}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
        />
        {emailInputHasError && (
            <p className="error-text">Email invalid!</p>
          )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
