import React from "react";
import "./DestinationStyles.css";

class DestinationData extends React.Component {
  render() {
    const { name, description, image } = this.props.destination;
    return (
      <div className="destination-card">
        <img src={image} alt={name} />
        <h2>{name}</h2>
        <p>{description}</p>
      </div>
    );
  }
}

export default DestinationData;
