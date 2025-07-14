import React from "react";
import Input from "../atoms/Input";

const FormGroup = ({ fields, values, onChange }) => (
  <>
    {fields.map((field) => (
      <Input
        key={field.name}
        label={field.label}
        type={field.type}
        name={field.name}
        value={values[field.name]}
        onChange={onChange}
        required={field.required}
      />
    ))}
  </>
);

export default FormGroup;