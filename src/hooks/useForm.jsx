import { useState } from "react";

function useForm(initialState = {}, validations = [], onSubmit = () => {}) {
  const { isValid: initialIsValid, errors: initialErrors } = validate(
    validations,
    initialState
  );
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState(initialErrors);
  const [isValid, setValid] = useState(initialIsValid);
  const [touched, setTouched] = useState({});
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('')

  const changeHandler = (event) => {
    const newValues = { ...values, [event.target.name]: event.target.value };
    const { isValid, errors } = validate(validations, newValues);
    setValues(newValues);
    setValid(isValid);
    setErrors(errors);
    setTouched({ ...touched, [event.target.name]: true });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    onSubmit(values);
    setAmount(values.amount);
    setRecipient(values.recipient);
  };

  return { values, changeHandler, isValid, errors, touched, submitHandler };
}

function isRequired(value) {
  return value != null && value.trim().length > 0;
}

function validate(validations, values) {
  const errors = validations
    .map((validation) => validation(values))
    .filter((validation) => typeof validation === "object");
  return {
    isValid: errors.length === 0,
    errors: errors.reduce((errors, error) => ({ ...errors, ...error }), {}),
  };
}

export { useForm, isRequired, validate };
