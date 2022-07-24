import style from "./FormInput.module.scss";

const FormInput = ({ handleChange, label, ...otherProps }) => (
  <div className={style.formGroup}>
    <input
      className={style.formGroup__input}
      onChange={handleChange}
      {...otherProps}
    />
    {label ? (
      <label
        className={`${
          otherProps.value.length ? "shrink" : ""
        } style.formGroup__inputLabel`}
      >
        {label}
      </label>
    ) : null}
  </div>
);

export default FormInput;
