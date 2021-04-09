import React from "react";

// material-ui
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";

// history
import history from "../../utils/history";

const useStyles = makeStyles({
  mainContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: 20,
  },
  formContainer: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    width: "80%",
  },
});

const GestView = () => {
  const classes = useStyles();
  return (
    <div className="rct-session-wrapper">
      <div className={classes.mainContainer}>
        <div className={classes.formContainer}>
          <h1 className="font-weight-bold">Admin App</h1>
          <p>This is a example of an app build with react and python flask.</p>
          <p>CRUD of several entities.</p>
          <Divider />
          <h3>Instructions</h3>
          <p>first login with the superAdmin credentians below.</p>
          <p>Create a company with at least one admin user.</p>
          <p>Login with one of the users created for the company.</p>
          <Divider />
          <h3>Credentials</h3>
          <p style={{ fontWeight: "bold" }}>username</p>
          <p>otto</p>
          <p style={{ fontWeight: "bold" }}>password</p>
          <p>121212</p>
          <Divider />
          <h2>Technologies</h2>
          <h4>Front end</h4>
          <div style={{ paddingLeft: 20 }}>
            <ul>
              <li>React Js</li>
              <ul style={{ marginLeft: 20 }}>
                <li>axios</li>
                <li>bootstrap</li>
                <li>google-map-react</li>
                <li>mui-datatables</li>
                <li>react-bootstrap-sweetalert</li>
                <li>react-cropper</li>
                <li>react-dropzone-component</li>
                <li>react-hook-form</li>
                <li>react-intl</li>
                <li>react-notifications</li>
                <li>react-redux</li>
                <li>react-router-dom</li>
                <li>reactstrap</li>
                <li>redux</li>
                <li>redux-saga</li>
                <li>xlsx</li>
              </ul>

              <li>Material UI</li>
              <li>Reactify</li>
            </ul>
          </div>
          <h4>Back end (Python Flask)</h4>
          <div style={{ paddingLeft: 20 }}>
            <ul>
              <li>cloudinary</li>
              <li>Flask</li>
              <li>Flask-Cors</li>
              <li>Flask-JWT-Extended</li>
              <li>flask-marshmallow</li>
              <li>Flask-Migrate</li>
              <li>Flask-RESTful</li>
              <li>Flask-Script</li>
              <li> Flask-SQLAlchemy</li>
              <li>Jinja2</li>
              <li>marshmallow</li>
              <li>marshmallow-sqlalchemy</li>
              <li>psycopg2</li>
            </ul>
          </div>
          <h4>Database</h4>
          <div style={{ paddingLeft: 20 }}>
            <ul>
              <li>postgreSQL</li>
            </ul>
          </div>

          <Button
            color="secondary"
            className="btn-block text-white w-100"
            variant="contained"
            size="large"
            onClick={() => history.push("/user")}
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GestView;
