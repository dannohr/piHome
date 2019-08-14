import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const styles = {
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
};

class ButtonChart extends React.Component {
  refreshPage = () => () => {
    console.log("Refresh Page");
    window.location.reload();
  };

  handleRefresh() {
    console.log("Refresh Page");
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          size="large"
          onClick={this.refreshPage()}
        >
          Refresh
        </Button>
      </div>
    );
  }
}

ButtonChart.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ButtonChart);
