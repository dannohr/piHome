import React from "react";
import MenuButtons from "../MenuButton/MenuButtons";

import "./Header.css";

class Header extends React.Component {
  render() {
    return (
      <div className="Header">
        <table>
          <tr>
            <td class="d1">left</td>
            <td class="d2">Page Title</td>
            <td class="d3">
              <MenuButtons />
            </td>
          </tr>
        </table>
      </div>
    );
  }
}

export default Header;
