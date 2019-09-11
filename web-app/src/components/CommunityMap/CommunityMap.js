// @flow
import React, { Component } from 'react'
import { Map, TileLayer } from 'react-leaflet'

class CommunityMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: -31.80,
      lng: -64.42,
      zoom: 13,
    }
  }

  render() {
    const position = [this.state.lat, this.state.lng]
    return (
      <Map center={position} zoom={this.state.zoom} style={{flex: "auto"}}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </Map>
    );
  }
}

export default CommunityMap;