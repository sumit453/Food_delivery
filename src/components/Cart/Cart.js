import React, { useContext, useState } from "react";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
// import Checkout from "./CheckoutUseRef";
import CheckoutTwo from "./CheckoutUseState";

function Cart(props) {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmittig, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  const hasItems = cartCtx.items.length > 0;

  function cartItemRemoveHandeler(id) {
    cartCtx.removeItem(id);
  }

  function cartItemAddHandeler(item) {
    cartCtx.addItem({ ...item, amount: 1 });
  }

  function orderHandeler() {
    setIsCheckout(true);
  }

  const submitOrderHandeler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://react-http-5dcb5-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  const cartItem = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandeler.bind(null, item.id)}
          onAdd={cartItemAddHandeler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandeler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModuleContent = (
    <React.Fragment>
      <div className={classes["cart-items"]}>
        {cartItem}

        <div className={classes.total}>
          <span>Total Amount</span>
          <span>{totalAmount}</span>
        </div>
        {isCheckout && (
          <CheckoutTwo
            onConformed={submitOrderHandeler}
            onCancel={props.onClose}
          />
        )}
        {!isCheckout && modalActions}
      </div>
    </React.Fragment>
  );

  const isSubmittigModalContent = <p>Sending order data...</p>;

  const didSubmittigModalContent = (
    <React.Fragment>
      <p>Successfully send the order!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmittig && !didSubmit && cartModuleContent}
      {isSubmittig && isSubmittigModalContent}
      {!isSubmittig && didSubmit && didSubmittigModalContent}
    </Modal>
  );
}

export default Cart;
