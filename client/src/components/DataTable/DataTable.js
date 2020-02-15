import React from "react";
import MaterialTable from "material-table";

const DataTable = function(props) {
  return (
    <div>
      <MaterialTable
        columns={props.columns}
        data={props.data}
        title={props.title}
        options={{
          padding: "dense",
          rowStyle: {
            // backgroundColor: "#EEE",
            color: "black"
          },
          cellStyle: {
            fontSize: 12
          },
          sorting: true
        }}
        editable={{
          onRowAdd: newData =>
            // console.log(newData);
            new Promise((resolve, reject) => {
              props.handleAdd(newData);
              resolve();
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              props.handleUpdate(newData);
              resolve();
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              props.handleDelete(oldData.id);
              resolve();
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
