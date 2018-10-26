import React from 'react'
import ThreeJsDemoContainer from './ThreeJsDemoContainer'
import Grid from 'react-css-grid'
import PropTypes from 'prop-types'
import * as THREE from 'three'

class MainContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      platform: new THREE.SphereGeometry( 20, 170, 170 ),
      shading: new THREE.MeshPhongMaterial( { color: 0x4200ff , flatShading: true } )
    }
  }

  render() {
    return(
      <div>
          <ThreeJsDemoContainer
            material={this.state.platform}
            shading={this.state.shading}>
          </ThreeJsDemoContainer>
      </div>
    )
  }
}


export default MainContainer
