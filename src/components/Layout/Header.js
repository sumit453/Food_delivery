/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";
import mealImage from "../../assets/meals.jpg";

function Header(props) {
  return (
    <React.Fragment>
      <header className={classes.header}>
        <h1>Food Corner</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealImage} alt="Food image" />
      </div>
    </React.Fragment>
  );
}

export default Header;
