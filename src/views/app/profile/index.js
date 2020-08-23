/**
 * User Profile Page
 */
import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import { Helmet } from "react-helmet";
// Components
import Profile from "./component/Profile";
import LanguagePreferences from "./component/LanguagePrefrences";
import ThemePreferences from "./component/ThemePrefrences";
import EmailPreferences from "./component/EmailPreferences";

import UserBlock from "./component/UserBlock";

// rct card box
import { RctCard } from "../../../components/cards/RctCard";

// page title bar
import PageTitleBar from "../../../components/common/PageTitleBar";

// intl messages
import IntlMessages from "../../../utils/IntlMessages";

// For Tab Content
function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

export default class UserProfile extends Component {
  state = {
    activeTab: this.props.location.state
      ? this.props.location.state.activeTab
      : 0,
  };

  handleChange = (event, value) => {
    this.setState({ activeTab: value });
  };

  render() {
    const { activeTab } = this.state;
    return (
      <div className="userProfile-wrapper">
        <Helmet>
          <title>User Profile</title>
          <meta name="description" content="User Profile" />
        </Helmet>
        <PageTitleBar
          title={<IntlMessages id="sidebar.userProfile" />}
          match={this.props.match}
        />
        <RctCard>
          <UserBlock />
          <div className="rct-tabs">
            <AppBar position="static">
              <Tabs
                value={activeTab}
                onChange={this.handleChange}
                variant="scrollable"
                scrollButtons="off"
                indicatorColor="primary"
              >
                <Tab
                  icon={<i className="ti-user"></i>}
                  label={<IntlMessages id="profile.myProfile" />}
                />
                <Tab
                  icon={<i className="ti-email"></i>}
                  label={<IntlMessages id="profile.emailPreferences" />}
                />
                <Tab
                  icon={<i className="ti-email"></i>}
                  label={<IntlMessages id="profile.languagePreferences" />}
                />
                <Tab
                  icon={<i className="ti-email"></i>}
                  label={<IntlMessages id="profile.themePreferences" />}
                />
              </Tabs>
            </AppBar>
            {activeTab === 0 && (
              <TabContainer>
                <Profile />
              </TabContainer>
            )}

            {activeTab === 1 && (
              <TabContainer>
                <EmailPreferences />
              </TabContainer>
            )}
            {activeTab === 2 && (
              <TabContainer>
                <LanguagePreferences />
              </TabContainer>
            )}
            {activeTab === 3 && (
              <TabContainer>
                <ThemePreferences />
              </TabContainer>
            )}
          </div>
        </RctCard>
      </div>
    );
  }
}
