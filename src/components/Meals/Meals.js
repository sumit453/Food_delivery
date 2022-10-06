import React from "react";
import AvailableMeals from "./AvailableMeals";
import MealsSummary from "./MealsSummery";

function Meals(props) {
  return (
    <React.Fragment>
      <MealsSummary />
      <AvailableMeals />
    </React.Fragment>
  );
}

export default Meals;
