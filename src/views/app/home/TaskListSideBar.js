import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IntlMessages from "../../../utils/IntlMessages";
import Divider from "@material-ui/core/Divider";
import CircularProgress from "@material-ui/core/CircularProgress";


const TaskItem = ({ item }) => {
  return (
    <>
      <ListItem button>
        <Avatar className="bg-pink">
          <i className="zmdi zmdi-folder"></i>
        </Avatar>
        <ListItemText primary={item.type} secondary={item.customer} />
        
      </ListItem>
      <Divider variant="inset" />
    </>
  );
};

const TaskListSideBar = (props) => {
  return (
    <div className="chat-sidebar rct-customizer">
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h5" color="inherit">
            <IntlMessages id="sidebar.task" />
          </Typography>
        </Toolbar>
      </AppBar>
      {props.loading && (
        <div style={{ width: "100%", textAlign: "center", marginTop:'20px' }}>
          <CircularProgress className="mr-30 mb-10 progress-primary" />
        </div>
      )}
      <List className="p-0 list-divider">
        {props.data.items.map((item) => {
          return <TaskItem key={item.id} item={item} />;
        })}
      </List>
    </div>
  );
};

export default TaskListSideBar;
