import React from 'react';
import PropTypes from "prop-types";
import firebase from 'firebase/app';
import 'firebase/auth';
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

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({user});
      }
    });
  }

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
    // 1. Look up the current store in the firebase database.
    const store = await base.fetch(this.props.storeId, {context: this});

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

  logout = async () => {
    await firebase.auth().signOut();
    this.setState({uid: null});
  };

  render() {
    const fishKeys = Object.keys(this.props.fishes);
    const logoutButton = <button onClick={this.logout}>Log Out!</button>;

    // 1. Check if the user is logged in.
    if (!this.state.uid) {
      return <Login authenticate={this.authenticate}/>;
    }

    // 2. Check if the logged in user is NOT the owner of the store.
    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry, this store doesn't belong to you :(</p>
          <p>{logoutButton}</p>
        </div>
      )
    }

    // 3. The current user owns the store, show the full inventory.
    return (
      <div className="inventory">
        <h2>Inventory</h2>
        <p>{logoutButton}</p>
        {fishKeys.map(this.renderFishEditForm)}
        <AddFishForm addFish={this.props.addFish}/>
        <button onClick={this.props.loadSampleFishes}>Load Sample Fishes</button>
      </div>
    )
  }
}

export default Inventory;
