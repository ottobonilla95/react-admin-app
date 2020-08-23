/**
 * Email Prefrences Page
 */
import React, { Component, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import CircularProgress from "@material-ui/core/CircularProgress";

import { Scrollbars } from "react-custom-scrollbars";
import { Badge } from "reactstrap";
import Tooltip from "@material-ui/core/Tooltip";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import StarIcon from "@material-ui/icons/Star";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

import Chip from "@material-ui/core/Chip";
// redux
import { connect } from "react-redux";

// actions
import {
  setLanguage,
  rtlLayoutAction,
} from "../../../../redux/settings/actions";
import { updateProfileLanguage } from "../../../../redux/auth/actions";

// intl messages
import IntlMessages from "../../../../utils/IntlMessages";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const LanguagePrefrences = (props) => {
  const { languages } = props.settings;

  const [currentLanguage, setCurrentLanguage] = useState({});

  const classes = useStyles();

  // // on change language
  const onChangeLanguage = (lang) => {
    setCurrentLanguage(lang);
  };

  const onSaveChanges = () => {
    props.updateProfileLanguage(currentLanguage.languageId);
  };

  useEffect(() => {
    setCurrentLanguage(props.settings.locale);
  }, [props.locale]);

  return (
    <div className="prefrences-wrapper">
      <div className="row">
        <div className="col-sm-12 col-md-8">
          <div className="search-filter p-0 mb-50">
            <h3>Language: </h3>

            <List
              component="nav"
              className={classes.root}
              aria-label="contacts"
            >
              <ListItem button>
                <ListItemText primary="Language" />
                <ListItemSecondaryAction>
                  {currentLanguage.icon && (
                    <img
                      src={require(`Assets/flag-icons/${currentLanguage.icon}.png`)}
                      className="mr-10"
                      width="25"
                      height="16"
                      alt="lang-icon"
                    />
                  )}
                </ListItemSecondaryAction>
              </ListItem>
            </List>

            <List
              component="nav"
              className={classes.root}
              aria-label="contacts"
              subheader={<ListSubheader>Settings</ListSubheader>}
            >
              {languages.map((language, key) => (
                <ListItem
                  button
                  key={key}
                  onClick={() => onChangeLanguage(language)}
                >
                  <ListItemIcon>
                    <img
                      src={require(`Assets/flag-icons/${language.icon}.png`)}
                      className="mr-10"
                      width="25"
                      height="16"
                      alt="lang-icon"
                    />
                  </ListItemIcon>
                  <ListItemText primary={language.name} />
                </ListItem>
              ))}
            </List>
          </div>

          {props.auth.loading ? (
            <CircularProgress />
          ) : (
            <Button
              variant="contained"
              color="primary"
              className="text-white btn-lg"
              onClick={() => onSaveChanges()}
            >
              <IntlMessages id="button.save" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

// map state to props
const mapStateToProps = ({ settings, auth }) => {
  return { settings, auth };
};

export default connect(mapStateToProps, {
  setLanguage,
  rtlLayoutAction,
  updateProfileLanguage,
})(LanguagePrefrences);
