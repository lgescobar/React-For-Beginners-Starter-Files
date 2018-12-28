import React from 'react';
import PropTypes from 'prop-types';
import {formatPrice} from "../helpers";

class Fish extends React.Component {
  static propTypes = {
    addToOrder: PropTypes.func,
    details: PropTypes.shape({
      name: PropTypes.string.isRequired,
      price: PropTypes.number,
      status: PropTypes.string,
      desc: PropTypes.string,
      image: PropTypes.string
    })
  };

  handleAddToOrder = () => {
    this.props.addToOrder(this.props.index);
  };

  render() {
    const {name, price, status, desc, image} = this.props.details;
    const isAvailable = status === 'available';
    return (
      <li className="menu-fish">
        <img src={image} alt={name}/>
        <h3 className="fish-name">
          {name}
          <span className="price">{formatPrice(price)}</span>
        </h3>
        <p>{desc}</p>
        <button disabled={!isAvailable} onClick={this.handleAddToOrder}>
          {isAvailable ? 'Add To Cart' : 'Sold Out!'}
        </button>
      </li>
    )
  }
}

export default Fish;
