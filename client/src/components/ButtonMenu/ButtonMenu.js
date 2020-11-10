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

import "./ButtonMenu.css";

const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
};

const menuItemStyle = {
  color: "#ff6f00",
  textAlign: "right",
  fontSize: "25px",
};

class ButtonMenu extends React.Component {
  state = {
    left: false,
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      left: open,
    });
  };

  render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>
          <Link component={RouterLink} to="/">
            <ListItem button key="0">
              <ListItemText
                primary={
                  <Typography
                    variant="h6"
                    style={menuItemStyle}
                    onClick={() =>
                      this.props.updateHeaderTitle("Current Weather")
                    }
                  >
                    Weather
                  </Typography>
                }
              />
            </ListItem>
          </Link>

          <Link component={RouterLink} to="/calendar">
            <ListItem button key="1">
              <ListItemText
                primary={
                  <Typography
                    variant="h6"
                    style={menuItemStyle}
                    onClick={() => this.props.updateHeaderTitle("Calendar")}
                  >
                    Calendar
                  </Typography>
                }
              />
            </ListItem>
          </Link>

          <Link component={RouterLink} to="/recipes">
            <ListItem button key="2">
              <ListItemText
                primary={
                  <Typography
                    variant="h6"
                    style={menuItemStyle}
                    onClick={() => this.props.updateHeaderTitle("Recipes")}
                  >
                    Recipes
                  </Typography>
                }
              />
            </ListItem>
          </Link>
          <Link component={RouterLink} to="/electricusage">
            <ListItem button key="3">
              <ListItemText
                primary={
                  <Typography
                    variant="h6"
                    style={menuItemStyle}
                    onClick={() =>
                      this.props.updateHeaderTitle("Electric Tracking")
                    }
                  >
                    Electricity
                  </Typography>
                }
              />
            </ListItem>
          </Link>

          <Link component={RouterLink} to="/ondemandtable">
            <ListItem button key="9">
              <ListItemText
                primary={
                  <Typography
                    variant="h6"
                    style={menuItemStyle}
                    onClick={() =>
                      this.props.updateHeaderTitle("On Demand Meter Reads")
                    }
                  >
                    On Demand
                  </Typography>
                }
              />
            </ListItem>
          </Link>
        </List>
        <Divider />

        <List>
          <Link component={RouterLink} to="/thermostat">
            <ListItem button key="3">
              <ListItemText
                primary={
                  <Typography
                    style={menuItemStyle}
                    onClick={() => this.props.updateHeaderTitle("Thermostat")}
                  >
                    Thermostat
                  </Typography>
                }
              />
            </ListItem>
          </Link>

          {/* <Link component={RouterLink} to="/dailyusagetable">
            <ListItem button key="4">
              <ListItemText
                primary={
                  <Typography
                    style={menuItemStyle}
                    onClick={() =>
                      this.props.updateHeaderTitle("Electric Meter Data")
                    }
                  >
                    Electric Meter Data
                  </Typography>
                }
              />
            </ListItem>
          </Link> */}

          <Link component={RouterLink} to="/outlet1">
            <ListItem button key="5">
              <ListItemText
                primary={
                  <Typography
                    style={menuItemStyle}
                    onClick={() => this.props.updateHeaderTitle("Outlet 1")}
                  >
                    Wifi Outlet 1
                  </Typography>
                }
              />
            </ListItem>
          </Link>

          <Link component={RouterLink} to="/outlet2">
            <ListItem button key="6">
              <ListItemText
                primary={
                  <Typography
                    style={menuItemStyle}
                    onClick={() => this.props.updateHeaderTitle("Outlet 2")}
                  >
                    Wifi Outlet 2
                  </Typography>
                }
              />
            </ListItem>
          </Link>
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

ButtonMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonMenu);
