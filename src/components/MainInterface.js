import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import PercentageSlider from './PercentageSlider';
import ElevationToggles from './ElevationToggles';
import '../styles/MainInterface.css';
import MapView from './MapView';
import { createMuiTheme } from '@material-ui/core/styles';

const mytheme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#4285F4',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

const styles = theme => ({
  root: {
    display: 'flex',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: '35vw',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    margin: 0,
    boxShadow: "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)",
    backgroundColor: mytheme.palette.primary.main
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
    padding: 0
  },
  button: {
    margin: theme.spacing.unit,
    position: 'relative',
    padding: [0],
    width: '20%',
    display: 'flex',
    marginLeft: '40%',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
  },
  goText: {
    color: '#ffffff'
  }
});

class MainInterface extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      renderRoute: false
    }
  }

  render() {
    const { classes } = this.props;
    let map;
    if(this.state.renderRoute) {
      map = <MapView route={this.state.route}></MapView>
    } else {
      map = <MapView></MapView>
    }

    return (
      <div className={classes.root}>
        <CssBaseline />
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper),
          }}
        >
          <h1 className="elenaLogo">EleNa</h1>
          <Input
            placeholder="Source"
            id="source"
            className={classes.input}
            inputProps={{
              'aria-label': 'Description',
            }}
          />
          <Input
            placeholder="Destination"
            id="destination"
            className={classes.input}
            inputProps={{
              'aria-label': 'Description',
            }}
          />
          <ElevationToggles></ElevationToggles>
          <PercentageSlider></PercentageSlider>
          <Button variant="contained" className={classes.button} onClick={() => { this.sendRequest() }}>
          <span className={classes.goText}>Go!</span>
          </Button>
        </Drawer>
        <main className={classes.content}>
            {map}
        </main>
      </div>
    ); }

    sendRequest() {

        const source = document.getElementById('source').value;
        const destination = document.getElementById('destination').value;
        const percentage = Number(document.getElementsByClassName("MuiSlider-root-91")[0].getAttribute("aria-valuenow")) + 100;

        fetch("http://localhost:8080/get_route", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*'
          },
          body: JSON.stringify({
            Source: source,
            Destination: destination,
            Max_min: 'test3',
            Percentage: percentage
          })
        })
        .then(res => res.json())
        .then(json => {
            this.setState({
              route: json["Route"],
              renderRoute: true
            });
        });
    }
  }

MainInterface.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainInterface);
