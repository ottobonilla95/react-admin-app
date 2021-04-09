import React from "react";
import { connect } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Link } from "react-router-dom";
import screenfull from "screenfull";
import Tooltip from "@material-ui/core/Tooltip";
import MenuIcon from "@material-ui/icons/Menu";
import { withRouter } from "react-router-dom";

// actions
import { collapsedSidebarAction } from "../../../redux/settings/actions";

// intl messages
import IntlMessages from "../../../utils/IntlMessages";

const Header = (props) => {
  const { horizontalMenu, agencyMenu, location } = props.settings;

  // function to change the state of collapsed sidebar
  const onToggleNavCollapsed = (event) => {
    const val = !props.settings.navCollapsed;
    props.collapsedSidebarAction(val);
  };

  // open dashboard overlay
  const openDashboardOverlay = (e) => {
    var el = document.getElementsByClassName("dashboard-overlay")[0];
    el.classList.toggle("d-none");
    el.classList.toggle("show");
    if (el.classList.contains("show")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    e.preventDefault();
  };

  // close dashboard overlay
  const closeDashboardOverlay = () => {
    var e = document.getElementsByClassName("dashboard-overlay")[0];
    e.classList.remove("show");
    e.classList.add("d-none");
    document.body.style.overflow = "";
  };

  // toggle screen full
  const toggleScreenFull = () => {
    screenfull.toggle();
  };

  const submitTaskForm = (data) => {
    props.createTask(data);
  };

  return (
    <AppBar position="static" className="rct-header">
      <Toolbar className="d-flex justify-content-between w-100 pl-0">
        <div className="d-flex align-items-center">
          {(horizontalMenu || agencyMenu) && (
            <div className="site-logo">
              <Link to="/" className="logo-mini">
                <img
                  src={require("Assets/img/appLogo.png")}
                  className="mr-15"
                  alt="site logo"
                  width="35"
                  height="35"
                />
              </Link>
              <Link to="/" className="logo-normal">
                <img
                  src={require("Assets/img/appLogoText.png")}
                  className="img-fluid"
                  alt="site-logo"
                  width="67"
                  height="17"
                />
              </Link>
            </div>
          )}
          {!agencyMenu && (
            <ul className="list-inline mb-0 navbar-left">
              {!horizontalMenu ? (
                <li
                  className="list-inline-item"
                  onClick={(e) => onToggleNavCollapsed(e)}
                >
                  <Tooltip title="Sidebar Toggle" placement="bottom">
                    <IconButton
                      color="inherit"
                      mini="true"
                      aria-label="Menu"
                      className="humburger p-0"
                    >
                      <MenuIcon />
                    </IconButton>
                  </Tooltip>
                </li>
              ) : (
                <li className="list-inline-item">
                  <Tooltip title="Sidebar Toggle" placement="bottom">
                    <IconButton
                      color="inherit"
                      aria-label="Menu"
                      className="humburger p-0"
                      component={Link}
                      to="/"
                    >
                      <i className="ti-layout-sidebar-left"></i>
                    </IconButton>
                  </Tooltip>
                </li>
              )}
            </ul>
          )}
        </div>
        <ul className="navbar-right list-inline mb-0">
          <li className="list-inline-item">
            <Tooltip title="Full Screen" placement="bottom">
              <IconButton
                aria-label="settings"
                onClick={() => toggleScreenFull()}
              >
                <i className="zmdi zmdi-crop-free"></i>
              </IconButton>
            </Tooltip>
          </li>
        </ul>
      </Toolbar>
    </AppBar>
  );
};

// map state to props
const mapStateToProps = ({ settings, task, agent }) => {
  return { settings, task, agent };
};

export default withRouter(
  connect(mapStateToProps, {
    collapsedSidebarAction,
  })(Header)
);
