import React, { useState } from "react";

const useForm = <T extends object>(initialValues: T, callback: Function) => {
  const [values, setValues] = useState<T>(initialValues);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let element = e.target as HTMLInputElement;
    setValues((values) => ({ ...values, [element.name]: element?.value }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    callback();
  };

  return { onChange, onSubmit, values };
};

export default useForm;
