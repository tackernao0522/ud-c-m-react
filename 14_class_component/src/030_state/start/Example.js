import { Component } from 'react'

class SwitchButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      switchOn: true,
      label: 'On',
    }
    this.changeSwitch = this.changeSwitch.bind(this)
  }

  changeSwitch() {
    // console.log('clicked')
    // console.log(this) // undefinedになる bindすると取得できる

    this.setState((prevState) => {
      return {
        switchOn: !prevState.switchOn,
        label: !prevState.switchOn ? 'On' : 'Off',
      }
    })
  }

  render() {
    const { label } = this.state
    return <button onClick={this.changeSwitch}>{label}</button>
  }
}

const Example = () => {
  return (
    <>
      <SwitchButton />
    </>
  )
}

export default Example
