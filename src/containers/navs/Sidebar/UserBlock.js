/**
 * User Block Component
 */
import React, { Component } from "react";
import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Badge } from "reactstrap";
import { NotificationManager } from "react-notifications";

// material ui
import Avatar from "@material-ui/core/Avatar";

// components
import SupportPage from "../Support";

// redux action
import { logoutUser } from "../../../redux/auth/actions";

// intl messages
import IntlMessages from "../../../utils/IntlMessages";

class UserBlock extends Component {
  state = {
    userDropdownMenu: false,
    isSupportModal: false,
  };

  /**
   * Logout User
   */
  logoutUser(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  /**
   * Toggle User Dropdown Menu
   */
  toggleUserDropdownMenu() {
    this.setState({ userDropdownMenu: !this.state.userDropdownMenu });
  }

  /**
   * Open Support Modal
   */
  openSupportModal() {
    this.setState({ isSupportModal: true });
  }

  /**
   * On Close Support Page
   */
  onCloseSupportPage() {
    this.setState({ isSupportModal: false });
  }

  /**
   * On Submit Support Page
   */
  onSubmitSupport() {
    this.setState({ isSupportModal: false });
    NotificationManager.success("Message has been sent successfully!");
  }

  render() {
    return (
      <div className="top-sidebar">
        <div className="sidebar-user-block">
          <Dropdown
            isOpen={this.state.userDropdownMenu}
            toggle={() => this.toggleUserDropdownMenu()}
            className="rct-dropdown"
          >
            <DropdownToggle tag="div" className="d-flex align-items-center">
              <div className="user-profile">
                {this.props.auth.user.user.profile_image ? (
                  <img
                    src={this.props.auth.user.user.profile_image}
                    alt="user profile"
                    className="img-fluid rounded-circle"
                    style={{ width: "50px", height: "50px" }}
                  />
                ) : (
                  <Avatar className="mr-15">
                    {this.props.auth.user.user.username
                      ? this.props.auth.user.user.username.charAt(0)
                      : ""}
                  </Avatar>
                )}
              </div>
              <div className="user-info">
                <span className="user-name ml-4">
                  {this.props.auth.user.user.username}
                </span>
                <i className="zmdi zmdi-chevron-down dropdown-icon mx-4"></i>
              </div>
            </DropdownToggle>
            <DropdownMenu>
              <ul className="list-unstyled mb-0">
                <li className="p-15 border-bottom user-profile-top bg-primary rounded-top">
                  <p className="text-white mb-0 fs-14">
                    {this.props.auth.user.user.username}
                  </p>
                  <span className="text-white fs-14">
                    {this.props.auth.user.user.email}
                  </span>
                </li>
                <li>
                  <Link
                    to={{
                      pathname: "/app/profile",
                      state: { activeTab: 0 },
                    }}
                  >
                    <i className="zmdi zmdi-account text-primary mr-3"></i>
                    <span>
                      <IntlMessages id="widgets.profile" />
                    </span>
                  </Link>
                </li>

                <li className="border-top">
                  <a href="#" onClick={(e) => this.logoutUser(e)}>
                    <i className="zmdi zmdi-power text-danger mr-3"></i>
                    <span>
                      <IntlMessages id="widgets.logOut" />
                    </span>
                  </a>
                </li>
              </ul>
            </DropdownMenu>
          </Dropdown>
        </div>
        <SupportPage
          isOpen={this.state.isSupportModal}
          onCloseSupportPage={() => this.onCloseSupportPage()}
          onSubmit={() => this.onSubmitSupport()}
        />
      </div>
    );
  }
}

// map state to props
const mapStateToProps = ({ settings, auth }) => {
  return { settings, auth };
};

export default connect(mapStateToProps, {
  logoutUser,
})(UserBlock);
