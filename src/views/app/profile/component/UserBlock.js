/**
 * User Block
 */
import React, { Component } from "react";

// redux
import { connect } from "react-redux";

// material ui
import Avatar from "@material-ui/core/Avatar";

const UserBlock = (props) => {
  return (
    <div className="profile-top mb-20">
      <img
        src={require("Assets/img/profile-bg.jpg")}
        alt="profile banner"
        className="img-fluid"
        width="1920"
        height="345"
      />
      <div className="profile-content">
        <div className="media">
          {props.auth.user.user.profile_image ? (
            <img
              src={props.auth.user.user.profile_image}
              alt="user profile"
              className="rounded-circle mr-30 bordered"
              width="140"
              height="140"
            />
          ) : (
            <Avatar
              className="mr-15"
              style={{ width: "140px", height: "140px" }}
            >
              <h1>{props.auth.user.user.username.charAt(0)}</h1>
            </Avatar>
          )}

          <div className="media-body pt-25">
            <div className="mb-20">
              <h2>{props.auth.user.user.username}</h2>
              <p>{props.auth.user.user.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps, null)(UserBlock);
