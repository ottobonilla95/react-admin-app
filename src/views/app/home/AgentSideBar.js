import React, { useState, useEffect } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IntlMessages from "../../../utils/IntlMessages";
import Input from "@material-ui/core/Input";

import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import CircularProgress from "@material-ui/core/CircularProgress";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import { Badge } from "reactstrap";

const AgentSideBar = (props) => {
  const [items, setItems] = useState([]);

  const filterItems = (keyWord) => {
    let finalItems = props.data.items.filter((item) => {
      if (item.first_name.toLowerCase().includes(keyWord.toLowerCase())) {
        return true;
      }
    });
    setItems(finalItems);
  };

  useEffect(() => {
    filterItems("");
  }, [props.data.items]);

  return (
    <div className="chat-sidebar rct-customizer">
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h5" color="inherit">
            <IntlMessages id="sidebar.agent" />
          </Typography>
        </Toolbar>
      </AppBar>

      <List className="p-0 list-divider">
        <FormControl style={{ width: "100%", marginTop: "10px" }}>
          <Input
            style={{ margin: "0 auto", width: "95%" }}
            id="adornment-password"
            placeholder="Search..."
            onChange={(e) => {
              filterItems(e.target.value);
            }}
            startAdornment={
              <InputAdornment position="start">
                <i className="zmdi zmdi-search"></i>
              </InputAdornment>
            }
          />
        </FormControl>
        {props.loading && (
          <div
            style={{ width: "100%", textAlign: "center", marginTop: "20px" }}
          >
            <CircularProgress className="mr-30 mb-10 progress-primary" />
          </div>
        )}
        {items.map((item) => {
          return (
            <ListItem button key={item.id}>
              <Avatar alt="user 1" className="img-fluid" src={item.image} />
              <ListItemText
                primary={item.first_name}
                secondary={item.mobile_number}
              />
              <ListItemSecondaryAction>
                <Badge color="success" className="badge-pill">
                  Online
                </Badge>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export default AgentSideBar;
