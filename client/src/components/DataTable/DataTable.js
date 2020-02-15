import React from "react";
import {
  createMuiTheme,
  //   makeStyles,
  //   withStyles,
  MuiThemeProvider
} from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
// import { Grid, Button } from "@material-ui/core";
import MaterialTable from "material-table";

const DataTable = function(props) {
  return (
    <div>
      <MaterialTable
        columns={props.columns}
        data={props.data}
        title="Daily Usage Data"
        //   options={{
        //     rowStyle: {
        //       backgroundColor: "#EEE",
        //       color: "black"
        //     },
        //     cellStyle: {
        //       fontSize: 15
        //     }
        //   }}
        editable={{
          isEditable: rowData => rowData.name === "a", // only name(a) rows would be editable
          isDeletable: rowData => rowData.name === "b", // only name(a) rows would be deletable

          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  /* const data = this.state.data;
                          data.push(newData);
                          this.setState({ data }, () => resolve()); */
                }
                resolve();
              }, 1000);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  /* const data = this.state.data;
                          const index = data.indexOf(oldData);
                          data[index] = newData;
                          this.setState({ data }, () => resolve()); */
                }
                resolve();
              }, 1000);
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  /* let data = this.state.data;
                          const index = data.indexOf(oldData);
                          data.splice(index, 1);
                          this.setState({ data }, () => resolve()); */
                }
                resolve();
              }, 1000);
            })
        }}
      />
    </div>
  );
};

// const theme = createMuiTheme({
//   palette: {
//     secondary: {
//       main: green[600]
//     }
//   },
//   overrides: {
//     MuiTableCell: {
//       body: {
//         fontSize: 20
//       },
//       cell: {
//         color: green
//       }
//     }
//   }
// });

// const styles = theme => ({
//   highlight: {
//     backgroundColor: "#43a047 !important",
//     "& *": {
//       color: "rgba(255, 255, 255, 0.8)"
//     }
//   }
// });

export default DataTable;
// export default withStyles(styles, { withTheme: true })(DataTable);
