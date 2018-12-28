import React from 'react';
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";

class Inventory extends React.Component {
  renderFishEditForm = (key) => {
    return (
      <EditFishForm key={key} index={key} fish={this.props.fishes[key]} modifyFish={this.props.modifyFish}/>
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
