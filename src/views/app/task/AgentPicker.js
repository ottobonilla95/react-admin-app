import React, { useEffect, useState, Fragment } from "react";

import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

// meterial ui
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";

// reactstrap
import { Media, Badge } from "reactstrap";

// components
import LoaderButton from "../../../components/buttons/LoaderButton";
import IntlMessages from "../../../utils/IntlMessages";
import { RctCard, RctCardContent } from "../../../components/cards/RctCard";
import RctCollapsibleCard from "../../../components/cards/RctCollapsibleCard";

// redux
import { connect } from "react-redux";
import { getAgents } from "../../../redux/agent/actions";

// scrollbar
import { Scrollbars } from "react-custom-scrollbars";

const AgentPicker = (props) => {
  const [finalItems, setFinalItems] = useState([]);
  const onAddUpdateTaskModalClose = () => {
    props.closeModal();
  };

  const filterItems = (keyWord) => {
    let finalKeyWord = keyWord.toLowerCase();
    let filteredItems = props.agent.data.items.filter((item) => {
      if (
        item.first_name.toLowerCase().includes(finalKeyWord) ||
        item.last_name.toLowerCase().includes(finalKeyWord)
      ) {
        return true;
      }
    });

    setFinalItems(filteredItems);
  };

  useEffect(() => {
    props.getAgents();
  }, []);

  useEffect(() => {
    filterItems("");
  }, [props.agent.data.items]);

  const onSelectAgent = (agent) => {
    props.onSelectAgent(agent);
    props.closeModal();
  };

  return (
    <Modal isOpen={props.isOpen} toggle={() => onAddUpdateTaskModalClose()}>
      <ModalHeader toggle={() => onAddUpdateTaskModalClose()}>
        Agent Picker
      </ModalHeader>
      <ModalBody>
        <RctCard>
          <RctCardContent>
            <div className="row">
              <div className="col-sm-12 col-md-12 col-lg-12">
                <div className="search-bar">
                  <TextField
                    fullWidth
                    id="standard-with-placeholder"
                    placeholder="Search Agents"
                    onChange={(e) => {
                      filterItems(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
          </RctCardContent>
        </RctCard>

        {((!props.agent.loading && !(finalItems.length === 0)) ||
          finalItems.length > 0) && (
          <RctCollapsibleCard heading="Employee Payroll" fullBlock>
            <Scrollbars
              className="rct-scroll"
              autoHide
              autoHideDuration={100}
              style={{ height: "300px" }}
            >
              <div className="table-responsive">
                <Table>
                  <TableHead>
                    <TableRow hover>
                      <TableCell>Name</TableCell>
                      <TableCell>Mobile Number</TableCell>
                      {/* <TableCell>Location</TableCell> */}
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <Fragment>
                      {finalItems.map((agent) => (
                        <TableRow hover key={agent.id}>
                          <TableCell>
                            <Media>
                              <Media left>
                                <Media
                                  object
                                  src={agent.image}
                                  alt="User Profile 1"
                                  className="mr-20"
                                  style={{ borderRadius: "5px" }}
                                  width="40"
                                  height="40"
                                />
                              </Media>
                              <Media body>
                                <h5 className="m-0 pt-15">
                                  {agent.first_name} {agent.last_name}
                                </h5>
                              </Media>
                            </Media>
                          </TableCell>
                          <TableCell>{agent.mobile_number}</TableCell>
                          {/* <TableCell>
                            {agent.homeAddress}, {agent.country}
                          </TableCell> */}
                          <TableCell>
                            <IconButton
                              className="text-success"
                              aria-label="Delete"
                              onClick={() => onSelectAgent(agent)}
                            >
                              <i className="zmdi zmdi-check-all"></i>
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </Fragment>
                  </TableBody>
                </Table>
              </div>
            </Scrollbars>
          </RctCollapsibleCard>
        )}
      </ModalBody>
      <ModalFooter>
        {props.agent.loading && (
          <CircularProgress
            className="mr-30 mb-10 progress-primary"
            size={35}
          />
        )}
        <Button
          variant="contained"
          className="text-white btn-danger"
          onClick={() => onAddUpdateTaskModalClose()}
        >
          <IntlMessages id="button.cancel" />
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = ({ agent }) => {
  return { agent };
};

export default connect(mapStateToProps, { getAgents })(AgentPicker);
