import React from 'react';

class EditFishForm extends React.Component {
  nameRef = React.createRef();
  priceRef = React.createRef();
  statusRef = React.createRef();
  descRef = React.createRef();
  imageRef = React.createRef();

  modifyFish = (e) => {
    e.preventDefault();
    return;

    // const fish = {
    //   name: this.nameRef.current.value,
    //   price: this.priceRef.current.value,
    //   status: this.statusRef.current.value,
    //   desc: this.descRef.current.value,
    //   image: this.imageRef.current.value
    // };
    //
    // this.props.addFish(fish);
    //
    // // Reset the form after adding the new fish.
    // e.currentTarget.reset();
  };

  render() {
    const {name, price, status, desc, image} = this.props.fish;

    return (
      <div className="fish-edit">
        {/*onSubmit={this.modifyFish}*/}
        <input name="name" ref={this.nameRef} type="text" placeholder="Name" defaultValue={name}/>
        <input name="price" ref={this.priceRef} type="text" placeholder="Price" defaultValue={price}/>
        <select name="status" ref={this.statusRef} defaultValue={status}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea name="desc" ref={this.descRef} placeholder="Description" defaultValue={desc}/>
        <input name="image" ref={this.imageRef} type="text" placeholder="Image" defaultValue={image}/>
        {/*<button type="submit">+ Add Fish</button>*/}
      </div>
    )
  }
}

export default EditFishForm;
