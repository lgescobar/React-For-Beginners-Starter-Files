import React from 'react';
import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'
import sampleFishes from '../sample-fishes'
import Fish from "./Fish";

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };

  addFish = (fish) => {
    console.log("Adding a fish!", fish);
    /*
     * 1. Take a copy of the existing state.
     *
     * Note: A deep clone is not necessary!!
     */
    const fishes = {...this.state.fishes};

    // 2. Add the new fish to the (partially) copied state.
    fishes[`fish${Date.now()}`] = fish;

    /*
     * 3. Set the new fishes object to state
     *
     * Note: We shall just pass the piece of state that we want to update!
     */
    this.setState({fishes});
  };

  loadSampleFishes = () => {
    this.setState({fishes: sampleFishes});
  };

  addToOrder = (key) => {
    // 1. Take a copy of state.
    const order = {...this.state.order};

    // 2. Either add to the order or update the quantity in the order.
    order[key] = order[key] + 1 || 1;

    // 3. Push new state
    this.setState({order});
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Louis is on fire"/>
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder}/>
            ))}
          </ul>
        </div>
        <Order/>
        <Inventory addFish={this.addFish} loadSampleFishes={this.loadSampleFishes}/>
      </div>
    )
  }
}

export default App;
