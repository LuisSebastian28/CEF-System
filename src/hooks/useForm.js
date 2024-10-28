import { useEffect, useMemo, useState, useCallback } from 'react';

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

  // Definimos createValidators con useCallback
  const createValidators = useCallback(() => {
    const formCheckedValues = {};

    for (const formField of Object.keys(formValidations)) {
      const [fn, errorMessage = 'Este campo es requerido'] = formValidations[formField];
      formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;
    }

    setFormValidation(formCheckedValues);
  }, [formState, formValidations]); // Asegúrate de incluir formState y formValidations

  // useEffect para crear validaciones solo cuando el estado del formulario cambie
  useEffect(() => {
    createValidators();
  }, [formState, createValidators]);

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
