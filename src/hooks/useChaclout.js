import { useState } from "react";

function useCheckout(valid) {
  const [inputValue, setInputValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const enteredValueIsValid = valid(inputValue);
  const hasError = isTouched;

  function valueChangeHandeler(event) {
    setInputValue(event.target.value);
  }

  function inputBlurHandeler() {
    setIsTouched(true);
  }

  function resetValue() {
    setInputValue("");
  }

  return {
    value: inputValue,
    isValid: enteredValueIsValid,
    hasError,
    valueChangeHandeler,
    inputBlurHandeler,
    resetValue,
  };
}

export default useCheckout;
