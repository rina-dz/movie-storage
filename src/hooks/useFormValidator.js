import React from 'react';

export function useForm() {
  const [values, setValues] = React.useState({});

  const handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setValues({ ...values, [name]: value });
  };

  return { values, handleChange, setValues };
}

export default function useFormWithValidation(callBack) {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (values.name && values.email && values.password) {
      callBack({ name: values.name, email: values.email, password: values.password })
    } else {
      if (values.email && values.password) {
        callBack({ email: values.email, password: values.password })
      } else {
        callBack({ name: values.name, email: values.email })
      }
    }
  };

  return { values, handleChange, handleSubmit, errors, isValid };
}

