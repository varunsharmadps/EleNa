import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';

const styles = {
  root: {
    width: 200,
  },
  slider: {
    padding: '22px 0px',
  },
};

class PercentageSlider extends React.Component {
  state = {
    value: 50,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <Typography id="label">% Shortest Path</Typography>
        <Slider
          classes={{ container: classes.slider }}
          value={value}
          aria-labelledby="label"
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

PercentageSlider.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PercentageSlider);