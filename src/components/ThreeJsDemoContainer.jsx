import React, { Component } from 'react'
import css from 'styled-jsx/css'
import Three, { Scene, OrbitalCamera, Mesh, DirectionalLight, AmbientLight } from './ThreeContextEnvironment'
import { v4 } from 'uuid'
import PropTypes from 'prop-types'

const THREE = require('three')

const randomPosition = () => [
   ( Math.random() - 0.5 ) * 1000,
   ( Math.random() - 0.5 ) * 1000,
   ( Math.random() - 0.5 ) * 1000
]
const positions = new Array(50).fill('x').map(randomPosition)

const threeJsDemoContainerContainer = {
  width:'600px',
  height:'600px',
  margin:0,
  overflow:'hidden'
}

function ThreeJsDemoContainer(props) {
  return(
    <div style={threeJsDemoContainerContainer}>
        <Three>
          <Scene fog={new THREE.FogExp2( 0xffffff, 0.002 )}>
            <OrbitalCamera enableZoom={false} position={[0, 0, 500]} />
            <DirectionalLight color={0xffffff}
              position={[1, 1, 1]} />
            <DirectionalLight color={0xffffff}
              position={[-1, -1, -1]} />
            <AmbientLight color={0xffffff}/>
            {
              positions.map(position =>
                <Mesh key={position}
                  geometry={props.platform}
                  material={props.shading}
                  position={position} />
              )
            }
          </Scene>
        </Three>
    </div>
  )
}

ThreeJsDemoContainer.propTypes = {
  platform: PropTypes.object,
  shading: PropTypes.object
}

export default ThreeJsDemoContainer
