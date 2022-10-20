import { useState } from "react";
import classes from "./Checkout.module.css";
import useCheckout from "../../hooks/useChaclout";

const CheckoutTwo = (props) => {
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    postalCode: true,
    city: true,
  });

  const {
    value: enteredNameValue,
    isValid: nameValid,
    hasError: namehasError,
    valueChangeHandeler: nameChangeHandeler,
    inputBlurHandeler: nameBlurHandeler,
    resetValue: resetNameValue,
  } = useCheckout((value) => value.trim() !== "");

  const {
    value: enteredStreetValue,
    hasError: streetHasError,
    valueChangeHandeler: streetChangeHandeler,
    inputBlurHandeler: streetBlurHandeler,
    isValid: streetValid,
    resetValue: resetStreetValue,
  } = useCheckout((value) => value.trim() !== "");

  const {
    value: enteredPostalValue,
    isValid: postalValid,
    hasError: postalHasError,
    valueChangeHandeler: postalChangeHandeler,
    inputBlurHandeler: postalBlurHandeler,
    resetValue: resetPostalValue,
  } = useCheckout((value) => value.trim().length !== 5 && value.trim() !== "");

  const {
    value: enteredCityValue,
    isValid: cityValid,
    hasError: cityHasError,
    valueChangeHandeler: cityChangeHandeler,
    inputBlurHandeler: cityBlurHandeler,
    resetValue: resetCityValue,
  } = useCheckout((value) => value.trim() !== "");

  function confirmHandler(event) {
    event.preventDefault();

    setFormInputValidity({
      name: nameValid,
      street: streetValid,
      postalCode: postalValid,
      city: cityValid,
    });

    const formIsValid = nameValid && streetValid && cityValid && postalValid;

    if (!formIsValid) {
      return;
    }

    props.onConformed({
      name: enteredNameValue,
      street: enteredStreetValue,
      postalCode: enteredPostalValue,
      city: enteredCityValue,
    });

    resetNameValue();
    resetStreetValue();
    resetCityValue();
    resetPostalValue();
  }

  const nameControlClasses = `${classes.control} ${
    !namehasError && formInputValidity.name ? "" : classes.invalid
  }`;
  const streetControlClasses = `${classes.control} ${
    !streetHasError && formInputValidity.street ? "" : classes.invalid
  }`;
  const postalControlClasses = `${classes.control} ${
    !postalHasError && formInputValidity.postalCode ? "" : classes.invalid
  }`;
  const cityCotrolClasses = `${classes.control} ${
    !cityHasError && formInputValidity.city ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          value={enteredNameValue}
          type="text"
          id="name"
          onChange={nameChangeHandeler}
          onBlur={nameBlurHandeler}
        />
        {namehasError || !formInputValidity.name ? (
          <p>Please enter a valid name!</p>
        ) : null}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input
          value={enteredStreetValue}
          type="text"
          id="street"
          onChange={streetChangeHandeler}
          onBlur={streetBlurHandeler}
        />
        {streetHasError || !formInputValidity.street ? (
          <p>Please enter a valid street!</p>
        ) : null}
      </div>
      <div className={postalControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input
          value={enteredPostalValue}
          type="text"
          id="postal"
          onChange={postalChangeHandeler}
          onBlur={postalBlurHandeler}
        />
        {postalHasError || !formInputValidity.postalCode ? (
          <p>Please enter a valid postalCode (5 characters long)!</p>
        ) : null}
      </div>
      <div className={cityCotrolClasses}>
        <label htmlFor="city">City</label>
        <input
          value={enteredCityValue}
          type="text"
          id="city"
          onChange={cityChangeHandeler}
          onBlur={cityBlurHandeler}
        />
        {cityHasError || !formInputValidity.city ? (
          <p>Please enter a valid city!</p>
        ) : null}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default CheckoutTwo;
