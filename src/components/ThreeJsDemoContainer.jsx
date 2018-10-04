import React, { Component } from 'react';
import css from 'styled-jsx/css'
import Three, { Scene, OrbitalCamera, Mesh, DirectionalLight, AmbientLight } from './ThreeContextEnvironment';
import { v4 } from 'uuid';

const THREE = require('three');

const fullWindow = {
  width: '50vw',
  height: '50vh',
};

const platform = new THREE.SphereGeometry( 20, 170, 170 );
const material = new THREE.MeshPhongMaterial( { color: 0x0042ff, flatShading: true } );

const randomPosition = () => [
   ( Math.random() - 0.5 ) * 1000,
   ( Math.random() - 0.5 ) * 1000,
   ( Math.random() - 0.5 ) * 1000
];
const positions = new Array(50).fill('x').map(randomPosition);

const threeJsDemoContainerContainer = {
    fontSize:'24px',
    fontWeight:'bold',
    marginTop:'1em',
    marginBottom:'1em',
    marginLeft:'20px',
    marginRight:'20px'
}

function ThreeJsDemoContainer() {
  return(
    <div style={threeJsDemoContainerContainer}>
      <div style={fullWindow}>
        <Three style={fullWindow}>
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
                  geometry={platform}
                  material={material}
                  position={position} />
              )
            }
          </Scene>
        </Three>
      </div>
    </div>
  );
}

export default ThreeJsDemoContainer;
