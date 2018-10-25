'use strict'

import React from 'react'
import PropTypes from 'prop-types'
import * as THREE from 'three'

export default class Renderer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {width:0, height:0}
  }

  render() {
    const {style={}} = this.props
    const {renderer, width, height} = this.state
    return <canvas ref={this.canvasDidMount} style={style}>
      {React.Children.map(this.props.children,
        function(child) {
          return React.cloneElement(child, {
            ...child.props,
            renderer: {Renderer: renderer, width, height}
          })
        }
      )}
    </canvas>
  }


  componentWillUnmount() {
    cancelAnimationFrame(this.raf)
  }


  canvasDidMount = canvas => {
    const onWindowResize = () => {
      setTimeout(()=> {
        this.resize()
      }, 2000)
    }
    window.renderer = this
    if (!canvas) return
    const renderer = this.renderer = new THREE.WebGLRenderer({canvas})
    renderer.setClearColor(0xffffff)
    this.setState({renderer})
    this.canvas = canvas
    window.addEventListener('resize', onWindowResize)
    this.resize()
    this.frame()
  }

  resize = () => {
    const {canvas, renderer: r} = this
    const {devicePixelRatio: dpr} = window
    const {innerWidth: width, innerHeight: height} = window
    this.setState({width, height})
    r.setPixelRatio(dpr)
    r.setSize(width, height)
  }

  raycaster = new THREE.Raycaster()
  frame = () => {
    this.raf = null
    const {scene, camera, renderer} = this
    if (!scene || !camera || !renderer) return
    renderer.render(scene, camera)
    this.raf = requestAnimationFrame(this.frame)
  }

  getChildContext() {
    return {
      setScene: scene => {
        this.scene = scene
        this.frame()
      },
      setCamera: camera => {
        this.camera = camera
        this.frame()
      }
    }
  }
}

Renderer.childContextTypes = {
  setScene: PropTypes.func,
  setCamera: PropTypes.func,
}

export class Scene extends React.Component {
  constructor(props) {
    super(props)
  }
  scene = new THREE.Scene()
  componentDidMount() {
    this.context.setScene(this.scene)
  }

  componentWillReceiveProps({fog, renderer: {Renderer}}) {
    if (!Renderer) return
    if (fog) {
      this.scene.fog = fog
      Renderer.setClearColor(this.scene.fog.color)
    }
  }

  componentWillUnmount() {
    this.context.setScene(null)
  }

  getChildContext() {
    return {Scene: this.scene}
  }

  render() {
    const {renderer} = this.props

    return <div>
      {React.Children.map(this.props.children,
        function(child) {
          return (
            React.cloneElement(child, {
              ...child.props,
              renderer
            })
          )
        }
      )}
    </div>
  }
}
Scene.contextTypes = Renderer.childContextTypes
Scene.childContextTypes = {
  Scene: PropTypes.object,
}

require('three-orbit-controls-loader')(THREE)
export class OrbitalCamera extends React.Component {
  componentDidMount() {
    this.update(this.props)
  }

  componentWillReceiveProps(incoming) {
    this.update(incoming)
  }

  update({position, renderer: {Renderer, width, height}}) {
    if(!width || !height || !Renderer) return
    if(!this.camera)
      this.camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000)
    const {camera} = this
    camera.position.set(...position)
    camera.updateProjectionMatrix()
    if(!this.controls) {
      const c = this.controls = new THREE.OrbitControls(
        camera,
        Renderer.domElement)
      Renderer.controls = c
      c.enableZoom = true
    }
    this.context.setCamera(camera)
  }

  render() { return <div /> }
}
OrbitalCamera.contextTypes = Renderer.childContextTypes

const ComponentFor = EntityClass => {
  class Entity extends React.Component {

    constructor(props){
      super(props)
    }
    componentDidMount() {
      this.updateEntity(this.props)
    }

    componentWillReceiveProps(props) {
      this.updateEntity(props)
    }

    componentWillUnmount() {
      this.context.Scene.remove(this.entity)
    }

    updateEntity(props) {
      if (!this.entity) {
        this.entity = new EntityClass()
        this.context.Scene.add(this.entity)
      }

      Object.keys(props).map((key) => {
        if(this.entity[key] && this.entity[key].set) {
          this.entity[key].set(...props[key])
        } else {
          this.entity[key] = props[key]
        }
      })

      if(this.entity.updateMatrix) {
        this.entity.updateMatrix()
        this.entity.matrixAutoUpdate = false
      }
    }

    render() { return <div>{this.props.children}</div> }
  }
  Entity.contextTypes = Scene.childContextTypes
  Entity.displayName = EntityClass.name
  return Entity
}

export const Mesh = ComponentFor(THREE.Mesh)
export const DirectionalLight = ComponentFor(THREE.DirectionalLight)
export const AmbientLight = ComponentFor(THREE.AmbientLight)
