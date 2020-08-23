/**
 * Email Prefrences Page
 */
import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import { connect } from "react-redux";
import classnames from "classnames";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import Switch from "@material-ui/core/Switch";
import Tooltip from "@material-ui/core/Tooltip";

import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";

// redux actions
import {
  toggleSidebarImage,
  setSidebarBgImageAction,
  miniSidebarAction,
  darkModeAction,
  boxLayoutAction,
  rtlLayoutAction,
  changeThemeColor,
  toggleDarkSidebar,
} from "../../../../redux/settings/actions";

import { updateProfileTheme } from "../../../../redux/auth/actions";

// intl messages
import IntlMessages from "../../../../utils/IntlMessages";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  rootlist: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: "nowrap",
    transform: "translateZ(0)",
  },
}));

const ThemePreferences = (props) => {
  useEffect(() => {
    const { darkMode, boxLayout, rtlLayout, miniSidebar } = props;
    if (darkMode) {
      darkModeHanlder(true);
    }
    if (boxLayout) {
      boxLayoutHanlder(true);
    }
    if (rtlLayout) {
      rtlLayoutHanlder(true);
    }
    if (miniSidebar) {
      miniSidebarHanlder(true);
    }
  }, []);

  /**
   * Set Sidebar Background Image
   */
  const setSidebarBgImage = (sidebarImage, e) => {
    props.setSidebarBgImageAction(sidebarImage);
    e.preventDefault();
  };

  const miniSidebarHanlder = (isTrue) => {
    if (isTrue) {
      document.body.classList.add("mini-sidebar");
    } else {
      document.body.classList.remove("mini-sidebar");
    }
    setTimeout(() => {
      props.miniSidebarAction(isTrue);
    }, 100);
  };

  const darkModeHanlder = (isTrue) => {
    if (isTrue) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    props.darkModeAction(isTrue);
  };

  const boxLayoutHanlder = (isTrue) => {
    if (isTrue) {
      document.body.classList.add("boxed-layout");
    } else {
      document.body.classList.remove("boxed-layout");
    }
    props.boxLayoutAction(isTrue);
  };

  const rtlLayoutHanlder = (isTrue) => {
    var root = document.getElementsByTagName("html")[0];
    if (isTrue) {
      root.setAttribute("dir", "rtl");
      document.body.classList.add("rtl");
    } else {
      root.setAttribute("dir", "ltr");
      document.body.classList.remove("rtl");
    }
    props.rtlLayoutAction(isTrue);
  };

  const changeThemeColor = (theme) => {
    const { themes } = props.settings;
    for (const appTheme of themes) {
      if (document.body.classList.contains(`theme-${appTheme.name}`)) {
        document.body.classList.remove(`theme-${appTheme.name}`);
      }
    }
    document.body.classList.add(`theme-${theme.name}`);
    darkModeHanlder(false);
    props.changeThemeColor(theme);
  };

  const {
    themes,
    activeTheme,
    enableSidebarBackgroundImage,
    sidebarBackgroundImages,
    selectedSidebarImage,
    miniSidebar,
    darkMode,
    boxLayout,
    rtlLayout,
    navCollapsed,
    isDarkSidenav,
  } = props.settings;

  const classes = useStyles();

  return (
    <div className="prefrences-wrapper">
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <IntlMessages id="themeOptions.themeColor" />
          </Grid>
          <Grid item xs={6}>
            <a href="#" onClick={(e) => e.preventDefault()}>
              <div>
                {themes.map((theme, key) => (
                  <Tooltip title={theme.name} placement="top" key={key}>
                    <img
                      onClick={() => changeThemeColor(theme)}
                      src={require(`Assets/img/${theme.name}-theme.png`)}
                      alt="theme"
                      className={classnames("img-fluid mr-5", {
                        active: theme.id === activeTheme.id,
                      })}
                    />
                  </Tooltip>
                ))}
              </div>
            </a>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <IntlMessages id="themeOptions.sidebarOverlay" />
          </Grid>
          <Grid item xs={6}>
            <IntlMessages id="themeOptions.sidebarLight" />
            <FormControlLabel
              className="m-0"
              control={
                <Switch
                  checked={isDarkSidenav}
                  onClick={() => props.toggleDarkSidebar()}
                  color="primary"
                  className="switch-btn"
                />
              }
            />
            <IntlMessages id="themeOptions.sidebarDark" />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={3}>
            <FormControlLabel
              className="m-0"
              control={
                <Switch
                  checked={enableSidebarBackgroundImage}
                  onClick={() => props.toggleSidebarImage()}
                  color="primary"
                  className="switch-btn"
                />
              }
              label={<IntlMessages id="themeOptions.sidebarImage" />}
            />
          </Grid>
          {enableSidebarBackgroundImage && (
            <Grid item xs={8}>
              {sidebarBackgroundImages.map((sidebarImage, key) => (
                <a
                  className={classnames("img-holder", {
                    active: selectedSidebarImage === sidebarImage,
                  })}
                  href="#"
                  key={key}
                  onClick={(e) => setSidebarBgImage(sidebarImage, e)}
                >
                  <img
                    src={sidebarImage}
                    alt="sidebar"
                    style={{
                      maxWidth: "150px",
                      minWidth: "150px",
                      maxHeight: "250px",
                      borderRadius: "5px",
                      objectFit: "cover",
                      marginRight: "15px",
                    }}
                  />
                </a>
              ))}
            </Grid>
          )}
        </Grid>
        <hr />
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <IntlMessages id="themeOptions.appSettings" />
          </Grid>
          <Grid item xs={8}>
            <FormControlLabel
              style={{ display: "block" }}
              control={
                <Switch
                  disabled={navCollapsed}
                  checked={miniSidebar}
                  onChange={(e) => miniSidebarHanlder(e.target.checked)}
                  className="switch-btn"
                />
              }
              label={<IntlMessages id="themeOptions.miniSidebar" />}
              className="m-0"
            />
            <FormControlLabel
              style={{ display: "block" }}
              control={
                <Switch
                  checked={boxLayout}
                  onChange={(e) => boxLayoutHanlder(e.target.checked)}
                  className="switch-btn"
                />
              }
              label={<IntlMessages id="themeOptions.boxLayout" />}
              className="m-0"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={rtlLayout}
                  onChange={(e) => rtlLayoutHanlder(e.target.checked)}
                  className="switch-btn"
                />
              }
              label={<IntlMessages id="themeOptions.rtlLayout" />}
              className="m-0"
            />
            <FormControlLabel
              style={{ display: "block" }}
              control={
                <Switch
                  checked={darkMode}
                  onChange={(e) => darkModeHanlder(e.target.checked)}
                  className="switch-btn"
                />
              }
              label={<IntlMessages id="themeOptions.darkMode" />}
              className="m-0"
            />
          </Grid>
        </Grid>
      </div>

      <hr />

      <div className="row">
        <div className="col-sm-12 col-md-8">
          {props.auth.loading ? (
            <CircularProgress />
          ) : (
            <Button
              variant="contained"
              color="primary"
              className="text-white btn-lg"
              onClick={() => {
                props.updateProfileTheme({
                  activeTheme: activeTheme.id,
                  isDarkSidenav,
                  enableSidebarBackgroundImage,
                  selectedSidebarImage,
                  miniSidebar,
                  boxLayout,
                  rtlLayout,
                  darkMode,
                });
              }}
            >
              <IntlMessages id="button.save" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = ({ settings, auth }) => {
  return { settings, auth };
};

export default connect(mapStateToProps, {
  toggleSidebarImage,
  setSidebarBgImageAction,
  miniSidebarAction,
  darkModeAction,
  boxLayoutAction,
  rtlLayoutAction,
  changeThemeColor,
  toggleDarkSidebar,
  updateProfileTheme,
})(ThemePreferences);
