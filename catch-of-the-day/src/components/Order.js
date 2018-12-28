import React from 'react';
import {formatPrice} from "../helpers";

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

    // Make sure the fish is loaded before we continue.
    if (!fish) {
      return null;
    }

    if (!isAvailable) {
      return (
        <li key={key}>
          Sorry, {fish ? fish.name : 'fish'} is no longer available
        </li>
      )
    }

    return (
      <li key={key}>
        {count} lbs {fish.name} {formatPrice(fish.price)}
      </li>
    )
  };

  render() {
    const orderIds = Object.keys(this.props.order);
    const total = this.calculateTotal(orderIds);

    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <ul className="order">
          {orderIds.map(this.renderOrderLine)}
        </ul>
        <div className="total">
          Total:&nbsp;
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    )
  }
}

export default Order;
