import React from "react";
import ButtonMenu from "../ButtonMenu/ButtonMenu";
import ButtonRefresh from "../ButtonRefresh/ButtonRefresh";

import "./Header.css";

class Header extends React.Component {
  render() {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <td className="d1">
                <ButtonRefresh />
              </td>
              <td className="d2">{this.props.headerTitle}</td>
              <td className="d3">
                <ButtonMenu updateHeaderTitle={this.props.updateHeaderTitle} />
              </td>
            </tr>
          </thead>
        </table>
      </div>
    );
  }
}

export default Header;
