import React from 'react';
import PropTypes from "prop-types";

class EditFishForm extends React.Component {
  static propTypes = {
    index: PropTypes.string,
    modifyFish: PropTypes.func,
    fish: PropTypes.shape({
      name: PropTypes.string,
      price: PropTypes.number,
      status: PropTypes.string,
      desc: PropTypes.string,
      image: PropTypes.string
    })
  };

  handleModifyFish = (e) => {
    e.preventDefault();

    // 1. Take a copy of the current fish and override it with changed property.
    const updatedFish = {
      ...this.props.fish,
      // Computed property name + override changed property (wombo combo!)
      [e.currentTarget.name]: e.currentTarget.value
    };

    // 2. Let changes "swim up" to where the state lives.
    this.props.modifyFish(this.props.index, updatedFish);
  };

  render() {
    const {name, price, status, desc, image} = this.props.fish;

    return (
      <div className="fish-edit">
        <input
          name="name"
          type="text"
          placeholder="Name"
          onChange={this.handleModifyFish}
          value={name}
        />
        <input
          name="price"
          type="text"
          placeholder="Price"
          onChange={this.handleModifyFish}
          value={price}
        />
        <select name="status" onChange={this.handleModifyFish} value={status}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea
          name="desc"
          placeholder="Description"
          onChange={this.handleModifyFish}
          value={desc}
        />
        <input
          name="image"
          type="text"
          placeholder="Image"
          onChange={this.handleModifyFish}
          value={image}
        />
        {/* Inline functions are actually not recommended because of little losses in performance. */}
        <button onClick={() => this.props.deleteFish(this.props.index)}>Remove Fish</button>
      </div>
    )
  }
}

export default EditFishForm;
