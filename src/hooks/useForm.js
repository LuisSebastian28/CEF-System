import { useEffect, useMemo, useState } from 'react';

export const useForm = (initialForm = {}, formValidations = {}) => {
  // Inicializamos el formulario
  const initializedForm = useMemo(() => {
    const newForm = {};
    for (const key in initialForm) {
      newForm[key] = initialForm[key] ?? '';
    }
    return newForm;
  }, [initialForm]);

  const [formState, setFormState] = useState(initializedForm);
  const [formValidation, setFormValidation] = useState({});

  // useEffect para crear validaciones solo cuando el estado del formulario cambie
  useEffect(() => {
    createValidators();
  }, [formState]);

  useEffect(() => {
    setFormState(initializedForm); // Reinicia el formulario cuando cambien los valores iniciales
  }, [initializedForm]);

  // Esta función verifica si el formulario es válido o no
  const isFormValid = useMemo(() => {
    for (const formValue of Object.keys(formValidation)) {
      if (formValidation[formValue] !== null) return false;
    }
    return true;
  }, [formValidation]);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onResetForm = () => {
    setFormState(initializedForm);
  };

  const createValidators = () => {
    const formCheckedValues = {};

    for (const formField of Object.keys(formValidations)) {
      const [fn, errorMessage = 'Este campo es requerido'] = formValidations[formField];
      formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;
    }

    setFormValidation(formCheckedValues);
  };

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,
    ...formValidation,
    isFormValid,
    setFormState,
  };
};
