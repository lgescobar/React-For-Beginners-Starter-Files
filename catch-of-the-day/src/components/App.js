import React from 'react';
import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'
import sampleFishes from '../sample-fishes'

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

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Louis is on fire"/>
        </div>
        <Order/>
        <Inventory addFish={this.addFish} loadSampleFishes={this.loadSampleFishes}/>
      </div>
    )
  }
}

export default App;
