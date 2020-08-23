import React, { useEffect } from "react";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

// config
import AppConfig from '../../../constants/AppConfig';

import IntlMessages from "../../../utils/IntlMessages";

import NavMenuItem from "./NavMenuItem";

// redux actions
import { onToggleMenu } from "../../../redux/settings/actions";

// history
import history from "../../../utils/history";

const SidebarContent = (props) => {
  const toggleMenu = (menu, stateCategory) => {
    let data = {
      menu,
    };
    props.onToggleMenu(data);
  };

  useEffect(() => {
    if (props.sidebar.sidebarMenus.length) {

      if (!location.pathname.replace( `${AppConfig.publicUrl}/app`, "")) {
        history.push(props.sidebar.sidebarMenus[0].path);
      }
    }
  }, [props.sidebar.sidebarMenus]);

  const { sidebarMenus } = props.sidebar;

  return (
    <div className="rct-sidebar-nav">
      <nav className="navigation">
        <List
          className="rct-mainMenu p-0 m-0 list-unstyled"
          subheader={
            <ListSubheader className="side-title" component="li">
              <IntlMessages id="sidebar.general" />
            </ListSubheader>
          }
        >
          {sidebarMenus.map((menu, key) => (
            <NavMenuItem
              menu={menu}
              key={key}
              onToggleMenu={() => toggleMenu(menu, "category1")}
            />
          ))}
        </List>
      </nav>
    </div>
  );
};

// map state to props
const mapStateToProps = ({ sidebar }) => {
  return { sidebar };
};

export default withRouter(
  connect(mapStateToProps, {
    onToggleMenu,
  })(SidebarContent)
);
