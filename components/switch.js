import React from 'react';
import Switch from '@material-ui/core/Switch';

class Switches extends React.Component {
  state = {
    checked: true
  };

  handleChange =  event => {
    // console.log(event.target.checked);
    this.setState({ ["checked"]: event.target.checked });
    this.props.onChange(event.target.checked)
  };

  render() {
    return (
      <div>
        <Switch
          checked={this.state.checked}
          onChange={this.handleChange}
          value="checkedA"
        />
      </div>
    );
  }
}

export default Switches;