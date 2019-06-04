import React from "react";
import MenuButtons from "../MenuButton/MenuButtons";
import RefreshButton from "../RefreshButton/RefreshButton";

import "./Header.css";

class Header extends React.Component {
  render() {
    return (
      <div className="Header">
        <table>
          <thead>
            <tr>
              <td className="d1">
                <RefreshButton />
              </td>
              <td className="d2">{this.props.headerTitle}</td>
              <td className="d3">
                <MenuButtons />
              </td>
            </tr>
          </thead>
        </table>
      </div>
    );
  }
}

export default Header;
