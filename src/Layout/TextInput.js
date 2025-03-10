import { useEffect, useState } from "react";
import classes from "Layout/TextInput.module.scss";

const TextInput = (props) => {
  const {initiateFocus , focusRef , noneRef} = props
  const [isTouched, setIsTouched] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [firstTyping, setFirstTyping] = useState(false);

  const enteredInput = props.enteredInput;

  const changeHandler = (event) => {
    if(event.target.value.length<=150 && props.setLimit){
      props.setInput(event.target.value);
    }
    if(!props.setLimit){
      props.setInput(event.target.value);
    }
    if (!firstTyping) {
      setFirstTyping(true);
      // setIsTouched(false);
    }
    setIsTouched(true);
  };

  const focusHandler = () => {
    setIsFocused(true);
  };

  const blurHandler = () => {
    setIsTouched(true);
    setIsFocused(false);
  };

  let isInputValid = true;

  for (let i = 0; i < props.validation?.length; i++) {
    isInputValid = isInputValid && props.validation[i](enteredInput);
  }
  let hasError = props.hasError;

  if (isTouched && !isInputValid) {
    hasError = true;
  }

  useEffect(() => {
    if (props.inputValidity) props.inputValidity(isInputValid);
  }, [isInputValid]);

  useEffect(() => {
    if (props.text?.toLowerCase().includes("password")) {
      props.setFocus(isFocused);
      props.error(hasError);
    }
  }, [isFocused, hasError]);

  return (
    <div
      className={`${classes.box} ${props.className} ${
        hasError && classes.box_error
      }`}
    >
      <div className={`${classes.overlay} `}>
        {props.multiline ? (
          <textarea
            type={props.type}
            className={`${classes.input} ${
              hasError ? classes.input_error : undefined
            } ${props.disabled && classes.input_disabled} ${props.highlightTrue ? 'bg-[#fff9e7]' : ''}`}
            onChange={changeHandler}
            onBlur={blurHandler}
            onFocus={focusHandler}
            value={enteredInput}
            disabled={props.disabled}
            maxLength={props.maxLength}
            name={props.name}
            rows={3}
            placeholder={isFocused ? "" : props.placeholder || props.text}
          />
        ) : (
          <input
            type={props.type}
            className={`${classes.input} ${
              hasError ? classes.input_error : undefined
            } ${props.disabled && classes.input_disabled} ${props.highlightTrue ? 'bg-[#fff9e7]' : ''}`}
            style={{ height: props?.customStyle?.height && "48px" }}
            onChange={changeHandler}
            onBlur={blurHandler}
            onFocus={focusHandler}
            value={enteredInput}
            disabled={props.disabled}
            maxLength={props.maxLength}
            name={props.name}
            placeholder={isFocused ? "" : props.placeholder || props.text}
            ref={initiateFocus?focusRef:noneRef}
          />
        )}

        <label
          className={`${classes.label} ${
            (isFocused || enteredInput !== "") && classes.label_focus
          }`}
        >
          {(enteredInput !== "" || isFocused) && props.text}
        </label>
      </div>
      {hasError && <div className={classes.error}>{props.errorMessage}</div>}
    </div>
  );
};
export default TextInput;

// !isFocused? props.text :
