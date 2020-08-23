import React, { useState, useEffect } from "react";

// material ui
import Switch from "@material-ui/core/Switch";
import Drawer from "@material-ui/core/Drawer";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { makeStyles } from "@material-ui/core/styles";

// IntlMessages
import IntlMessages from "../../../utils/IntlMessages";

import "./styles.css";

// reactstrap
import { DropdownToggle, DropdownMenu, Dropdown } from "reactstrap";

// Scrollbars
import { Scrollbars } from "react-custom-scrollbars";

// components
import AgentSideBar from "./AgentSideBar";
import TaskListSideBar from "./TaskListSideBar";
import CustomerMarker from "../../../components/maps/CustomerMarker";
import GoogleMapComponent from "../../../components/maps/GoogleMapComponent";

// redux
import { connect } from "react-redux";

// actions
import { getAgents } from "../../../redux/agent/actions";
import { getCustomers } from "../../../redux/customer/actions";
import { getTasks } from "../../../redux/task/actions";
import { toggleShowCustomer } from "../../../redux/settings/actions";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const useStyles = makeStyles((theme) => ({
  menu: {
    backgroundColor: "red !important",
  },
}));

const Home = (props) => {
  const classes = useStyles();
  const [customizer, setCustomizer] = useState(undefined);
  const [isOpenMapOptions, setIsOpenMapOptions] = useState(false);

  useEffect(() => {
    props.getAgents();
    props.getCustomers();
    props.getTasks();
  }, []);
  return (
    <>
      <div className="full-map-wrapper">
        <GoogleMapComponent>
          {props.settings.showCustomers &&
            props.customer.data.items.map((customer) => (
              <CustomerMarker
                key={customer.id}
                {...customer}
                lat={customer.latitude}
                lng={customer.longitude}
                text="My Marker"
              />
            ))}
        </GoogleMapComponent>
      </div>
      <div className="fixed-plugin">
        <Dropdown
          isOpen={isOpenMapOptions}
          toggle={() => setIsOpenMapOptions(!isOpenMapOptions)}
        >
          <DropdownToggle className="bg-secondary">
            <Tooltip
              title={<IntlMessages id="mapOptions.mapSettings" />}
              placement="left"
            >
              <i className="zmdi zmdi-settings font-2x tour-step-6 spin-icon"></i>
            </Tooltip>
          </DropdownToggle>
          <DropdownMenu>
            <Scrollbars
              className="rct-scroll"
              autoHeight
              autoHeightMin={100}
              autoHeightMax={530}
              autoHide
              autoHideDuration={100}
            >
              <ul className="list-unstyled mb-0 p-10 app-settings">
                <li className="header-title mb-10">
                  <IntlMessages id="mapOptions.mapSettings" />
                </li>

                <li className="header-title box-layout-option">
                  <FormControlLabel
                    control={
                      <Switch
                        checked={props.settings.showCustomers}
                        onChange={(e) => {
                          props.toggleShowCustomer();
                        }}
                        className="switch-btn"
                      />
                    }
                    label={<IntlMessages id="mapOptions.customer" />}
                    className="m-0"
                  />
                </li>
              </ul>
            </Scrollbars>
          </DropdownMenu>
        </Dropdown>
        <br />
        <Dropdown isOpen={false} toggle={() => setCustomizer("agent")}>
          <DropdownToggle className="bg-success">
            <Tooltip
              title={<IntlMessages id="sidebar.agent" />}
              placement="left"
            >
              <i className="zmdi zmdi-account-circle font-2x tour-step-6"></i>
            </Tooltip>
          </DropdownToggle>
        </Dropdown>
        <br />
        <Dropdown isOpen={false} toggle={() => setCustomizer("tasklist")}>
          <DropdownToggle className="bg-warning">
            <Tooltip
              title={<IntlMessages id="sidebar.task" />}
              placement="left"
            >
              <i className="zmdi zmdi-format-list-numbered font-2x tour-step-6"></i>
            </Tooltip>
          </DropdownToggle>
        </Dropdown>
      </div>
      <Drawer
        anchor={"right"}
        open={customizer !== undefined || props.task.isTaskSideBarFormOpen}
        onClose={() => {
          setCustomizer(undefined);
          if (props.task.loading) {
            return;
          }
          // props.closeSideBarFrom();
        }}
      >
        {customizer === "agent" && <AgentSideBar {...props.agent} />}
        {customizer === "tasklist" && <TaskListSideBar {...props.task} />}
      </Drawer>
    </>
  );
};

const mapStateToProps = ({ task, agent, customer, settings }) => {
  return { task, agent, customer, settings };
};

export default connect(mapStateToProps, {
  getAgents,
  getCustomers,
  getTasks,
  toggleShowCustomer,
})(Home);
