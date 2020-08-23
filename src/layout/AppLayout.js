/**
 * App Routes
 */
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Sidebar from "react-sidebar";
import { Scrollbars } from "react-custom-scrollbars";
import classnames from "classnames";

// Components
import Header from "../containers/navs/Header";
import SidebarContent from "../containers/navs/Sidebar";
import Footer from "../containers/navs/Footer";
import ThemeOptions from "../containers/navs/ThemeOptions";
import TaskModalForm from "../views/app/task/TaskModalForm";

// preload Components
import PreloadHeader from "../components/PreloadLayouts/PreloadHeader";
import PreloadSidebar from "Components/PreloadLayouts/PreloadSidebar";

// app config
import AppConfig from "Constants/AppConfig";
// actions
import {
  collapsedSidebarAction,
 
} from "../redux/settings/actions";

import { closeModalFrom, createTask, updateTask } from "../redux/task/actions";

class AppLayout extends Component {
  state = {
    loadingHeader: true,
    loadingSidebar: true,
  };

  UNSAFE_componentWillMount() {
    this.updateDimensions();
  }

  componentDidMount() {
    const { windowWidth } = this.state;
    window.addEventListener("resize", this.updateDimensions);
  
    setTimeout(() => {
      this.setState({ loadingHeader: false, loadingSidebar: false });
    }, 114);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { windowWidth } = this.state;
    if (nextProps.location !== this.props.location) {
      if (windowWidth <= 1199) {
        this.props.collapsedSidebarAction(false);
      }
    }
  }

  updateDimensions = () => {
    this.setState({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    });
  };

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }

  renderPage() {
    const { pathname } = this.props.location;
    const { children } = this.props;

    if (pathname === "/app/home") {
      return (
        <>
          <div className="rct-page-content p-0">{children}</div>
          <TaskModalForm
            isOpen={this.props.task.isTaskModalFormOpen}
            closeModal={() => {
              this.props.closeModalFrom();
            }}
            createTask={(task) => this.props.createTask(task)}
            updateTask={(task) => this.props.updateTask(task)}
            currentTask={this.props.task.currentTask}
            loading={this.props.task.loading}
          />
        </>
      );
    }
    return (
      <>
        <Scrollbars
          className="rct-scroll"
          autoHide
          autoHideDuration={100}
          style={this.getScrollBarStyle()}
        >
          <div className="rct-page-content">
            {children}

            <Footer />
          </div>
        </Scrollbars>
        <TaskModalForm
          isOpen={this.props.task.isTaskModalFormOpen}
          closeModal={() => {
            this.props.closeModalFrom();
          }}
          createTask={(task) => this.props.createTask(task)}
          updateTask={(task) => this.props.updateTask(task)}
          currentTask={this.props.task.currentTask}
          loading={this.props.task.loading}
        />
      </>
    );
  }

  // render header
  renderHeader() {
    const { loadingHeader } = this.state;
    if (loadingHeader) {
      return <PreloadHeader />;
    }
    return <Header />;
  }

  //render Sidebar
  renderSidebar() {
    const { loadingSidebar } = this.state;
    if (loadingSidebar) {
      return <PreloadSidebar />;
    }
    return <SidebarContent />;
  }

  //Scrollbar height
  getScrollBarStyle() {
    return {
      height: "calc(100vh - 50px)",
    };
  }

  render() {
    const { navCollapsed, rtlLayout, miniSidebar } = this.props.settings;
    const { windowWidth } = this.state;
    return (
      <div className="app">
        <div className="app-main-container">
          <Sidebar
            sidebar={this.renderSidebar()}
            open={windowWidth <= 1199 ? navCollapsed : false}
            docked={windowWidth > 1199 ? !navCollapsed : false}
            pullRight={rtlLayout}
            onSetOpen={() => this.props.collapsedSidebarAction(false)}
            styles={{ content: { overflowY: "" } }}
            contentClassName={classnames({
              "app-conrainer-wrapper": miniSidebar,
            })}
          >
            <div className="app-container">
              <div className="rct-app-content">
                <div className="app-header">{this.renderHeader()}</div>
                <div className="rct-page">{this.renderPage()}</div>
              </div>
            </div>
          </Sidebar>
          {/* <ThemeOptions /> */}
        </div>
      </div>
    );
  }
}

// map state to props
const mapStateToProps = ({ settings, task }) => {
  return { settings, task };
};

export default withRouter(
  connect(mapStateToProps, {
    collapsedSidebarAction,
    closeModalFrom,
    createTask,
    updateTask,
  })(AppLayout)
);
