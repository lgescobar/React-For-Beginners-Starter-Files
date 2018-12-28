import React from 'react';
import {getFunName} from "../helpers";

class StorePicker extends React.Component {
  storeNameInput = React.createRef();

  // Use field instead of method, because they have the class reference automatically mounted as "this"
  goToStore = (e) => {
    // 1. Stop the form from submitting.
    e.preventDefault();

    // 2. Get text from input.
    console.log(this.storeNameInput);

    // 3. Change page to "/store/WHATEVER_THEY_ENTERED"
  };

  render() {
    return (
      <form action="" className="store-selector" onSubmit={this.goToStore}>
        <h2>Please enter a store</h2>
        <input ref={this.storeNameInput} type="text" required placeholder="Store Name" defaultValue={getFunName()}/>
        <button type="submit">Visit Store &rarr;</button>
      </form>
    )
  }
}

export default StorePicker;
