import React from 'react';
import PropTypes from "prop-types";
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";

class Inventory extends React.Component {
  static propTypes = {
    index: PropTypes.string,
    modifyFish: PropTypes.func,
    deleteFish: PropTypes.func,
    loadSampleFishes: PropTypes.func,
    fishes: PropTypes.objectOf(
      PropTypes.shape({
        name: PropTypes.string,
        price: PropTypes.number,
        status: PropTypes.string,
        desc: PropTypes.string,
        image: PropTypes.string
      })
    )
  };

  renderFishEditForm = (key) => {
    return (
      <EditFishForm
        key={key}
        index={key}
        fish={this.props.fishes[key]}
        modifyFish={this.props.modifyFish}
        deleteFish={this.props.deleteFish}
      />
    )
  };

  render() {
    const fishKeys = Object.keys(this.props.fishes);
    return (
      <div className="inventory">
        {fishKeys.map(this.renderFishEditForm)}
        <AddFishForm addFish={this.props.addFish}/>
        <button onClick={this.props.loadSampleFishes}>Load Sample Fishes</button>
      </div>
    )
  }
}

export default Inventory;
