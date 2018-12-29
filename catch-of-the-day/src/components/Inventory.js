import React from 'react';
import PropTypes from "prop-types";
import firebase from 'firebase';
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";
import Login from "./Login";
import base, {firebaseApp} from '../base';

class Inventory extends React.Component {
  static propTypes = {
    index: PropTypes.string,
    storeId: PropTypes.string.isRequired,
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

  state = {
    uid: null,
    owner: null
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

  authHandler = async (authData) => {
    // console.log(authData);
    // 1. Look up the current store in the firebase database.
    const store = await base.fetch(this.props.storeId, {context: this});
    // console.log(store);

    // 2. Claim it if there is no owner.
    if (!store.owner) {
      // Save it as our own.
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid
      });
    }

    // 3. Set the state of the inventory component to reflect the current user.
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid
    });
  };

  authenticate = (service) => {
    const authProvider = new firebase.auth[`${service}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };

  render() {
    const fishKeys = Object.keys(this.props.fishes);
    return <Login authenticate={this.authenticate}/>;
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
