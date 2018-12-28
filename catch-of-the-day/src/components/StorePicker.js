import React from 'react';
import {getFunName} from "../helpers";

class StorePicker extends React.Component {
  storeNameInput = React.createRef();

  // Use field instead of method, because they have the class reference automatically mounted as "this"
  goToStore = (e) => {
    // 1. Stop the form from submitting.
    e.preventDefault();

    // 2. Get text from input.
    const storeName = this.storeNameInput.current.value;

    /*
     * 3. Change page to "/store/WHATEVER_THEY_ENTERED"
     *
     * Used the history prop inherited directly from the router component (because the store picker ist a direct
     * descendant of it). This allows us to change the URL using push states and avoid a page refresh.
     * The router then picks up and change the rendered component according to the new URL.
     */
    this.props.history.push(`/store/${storeName}`);
  };

  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please enter a store</h2>
        <input type="text" ref={this.storeNameInput} required placeholder="Store Name" defaultValue={getFunName()}/>
        <button type="submit">Visit Store &rarr;</button>
      </form>
    )
  }
}

export default StorePicker;
