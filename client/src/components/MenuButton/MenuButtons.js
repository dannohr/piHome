import React from "react";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import ListItemText from "@material-ui/core/ListItemText";
import Link from "@material-ui/core/Link";

import "./MenuButtons.css";

const styles = {
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
};

const menuItemStyle = {
  color: "#ff6f00",
  textAlign: "right",
  fontSize: "25px"
};

class MenuButtons extends React.Component {
  state = {
    left: false
  };

  toggleDrawer = (side, open) => () => {
    console.log(this.state);
    this.setState({
      left: open
    });
  };

  render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>
          <Link>
            <ListItem button key="0">
              <ListItemText
                primary={
                  <Typography variant="h6" style={menuItemStyle}>
                    Weather
                  </Typography>
                }
              />
            </ListItem>
          </Link>

          <Link>
            <ListItem button key="1">
              <ListItemText
                primary={
                  <Typography variant="h6" style={menuItemStyle}>
                    Calendar
                  </Typography>
                }
              />
            </ListItem>
          </Link>

          <Link>
            <ListItem button key="2">
              <ListItemText
                primary={
                  <Typography variant="h6" style={menuItemStyle}>
                    Recipes
                  </Typography>
                }
              />
            </ListItem>
          </Link>
        </List>
        <Divider />
        <List>
          <ListItem button key="3">
            <ListItemText
              primary={
                <Typography
                  // variant="h6"
                  style={menuItemStyle}
                >
                  Thermostat
                </Typography>
              }
            />
          </ListItem>
          <ListItem button key="4">
            <ListItemText
              primary={
                <Typography
                  // variant="h6"
                  style={menuItemStyle}
                >
                  Cabinet Lights
                </Typography>
              }
            />
          </ListItem>
          <ListItem button key="5">
            <ListItemText
              primary={
                <Typography
                  // variant="h6"
                  style={menuItemStyle}
                >
                  Wifi Outlet 1
                </Typography>
              }
            />
          </ListItem>
          <ListItem button key="6">
            <ListItemText
              primary={
                <Typography
                  // variant="h6"
                  style={menuItemStyle}
                >
                  Wifi Outlet 2
                </Typography>
              }
            />
          </ListItem>
        </List>
      </div>
    );

    return (
      <div>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          size="large"
          onClick={this.toggleDrawer("left", true)}
        >
          MENU
        </Button>

        <Drawer
          open={this.state.left}
          onClose={this.toggleDrawer("left", false)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer("left", false)}
            onKeyDown={this.toggleDrawer("left", false)}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

MenuButtons.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MenuButtons);
