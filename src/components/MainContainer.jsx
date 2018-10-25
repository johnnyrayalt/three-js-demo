import React from 'react'
import ThreeJsDemoContainer from './ThreeJsDemoContainer'
import Grid from 'react-css-grid'
import PropTypes from 'prop-types'

class MainContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      colors: {
        red: 0x4200ff,
        blue: 0x0042ff
      }
    }
  }

  render() {
    return(
      <Grid
        width={'25vw'}>
        <ThreeJsDemoContainer colors={this.state.colors.red}></ThreeJsDemoContainer>
        <ThreeJsDemoContainer colors={this.state.colors.blue}></ThreeJsDemoContainer>
      </Grid>
    )
  }
}


export default MainContainer
