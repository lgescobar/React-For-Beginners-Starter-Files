import React from 'react';
import {formatPrice} from "../helpers";
import {TransitionGroup, CSSTransition} from 'react-transition-group';

class Order extends React.Component {
  calculateTotal = (orderIds) => orderIds.reduce((subtotal, key) => {
    const fish = this.props.fishes[key];
    const quantity = this.props.order[key];
    const isAvailable = fish && fish.status === 'available';

    return subtotal + (isAvailable ? quantity * fish.price : 0);
  }, 0);

  renderOrderLine = (key) => {
    const fish = this.props.fishes[key];
    const count = this.props.order[key];
    const isAvailable = fish && fish.status === 'available';
    const transitionOptions = {
      key,
      classNames: "order",
      timeout: {
        enter: 500,
        exit: 500
      }
    };

    // Make sure the fish is loaded before we continue.
    if (!fish) {
      return null;
    }

    // Currify function and create with it a custom event handler.
    const removeFromOrderButton = <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>;

    if (!isAvailable) {
      return (
        <CSSTransition {...transitionOptions}>
          <li key={key}>
            Sorry, {fish ? fish.name : 'fish'} is no longer available
            {removeFromOrderButton}
          </li>
        </CSSTransition>
      )
    }

    return (
      <CSSTransition {...transitionOptions}>
        <li key={key}>
          <span>
            <TransitionGroup component="span" className="count">
              <CSSTransition key={count} classNames="count" timeout={{enter: 500, exit: 500}}>
                <span>{count}</span>
              </CSSTransition>
            </TransitionGroup>
            lbs {fish.name}
            {formatPrice(fish.price)}
            {removeFromOrderButton}
          </span>
        </li>
      </CSSTransition>
    )
  };

  render() {
    const orderIds = Object.keys(this.props.order);
    const total = this.calculateTotal(orderIds);

    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <TransitionGroup component="ul" className="order">
          {orderIds.map(this.renderOrderLine)}
        </TransitionGroup>
        <div className="total">
          Total:&nbsp;
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    )
  }
}

export default Order;
