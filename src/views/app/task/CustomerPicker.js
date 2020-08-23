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
import LinearProgress from "@material-ui/core/LinearProgress";

// components
import IntlMessages from "../../../utils/IntlMessages";
import { RctCard, RctCardContent } from "../../../components/cards/RctCard";
import RctCollapsibleCard from "../../../components/cards/RctCollapsibleCard";
import CustomerModalForm from "../customer/CustomerModalForm";

// redux
import { connect } from "react-redux";
import {
  getCustomers,
  openModalFrom,
  closeModalFrom,
  createCustomer,
} from "../../../redux/customer/actions";

import { Scrollbars } from "react-custom-scrollbars";

const CustomerPicker = (props) => {
  const [finalItems, setFinalItems] = useState([]);
  const onAddUpdateTaskModalClose = () => {
    props.closeModal();
  };

  const filterItems = (keyWord) => {
    let finalKeyWord = keyWord.toLowerCase();

    let filteredItems = props.customer.data.items.filter((item) => {
      if (item.name.toLowerCase().includes(finalKeyWord)) {
        return true;
      }
    });

    setFinalItems(filteredItems);
  };

  useEffect(() => {
    props.getCustomers();
  }, []);

  useEffect(() => {
    filterItems("");
  }, [props.customer.data.items]);

  useEffect(() => {
    if (props.customer.customerCommingFromTaskForm) {
      onSelectCustomer(props.customer.customerCommingFromTaskForm);
    }
  }, [props.customer.customerCommingFromTaskForm]);

  const onSelectCustomer = (customer) => {
    props.onSelectCustomer(customer);
    props.closeModal();
  };

  return (
    <>
      <CustomerModalForm
        isOpen={props.customer.isCustomerModalFormOpen}
        closeModal={() => {
          props.closeModalFrom();
        }}
        customer={{}}
        submitCustomerForm={(customer) => {
          props.createCustomer(customer, true);
        }}
        loading={props.customer.loading}
      />

      <Modal isOpen={props.isOpen} toggle={() => onAddUpdateTaskModalClose()}>
        <ModalHeader toggle={() => onAddUpdateTaskModalClose()}>
          Customer selector
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
                      placeholder="Search Customers"
                      onChange={(e) => {
                        filterItems(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
            </RctCardContent>
          </RctCard>

          {((!props.customer.loading && !(finalItems.length === 0)) ||
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
                        <TableCell>Country</TableCell>
                        <TableCell>StreetName</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <Fragment>
                        {finalItems.map((customer) => (
                          <TableRow hover key={customer.id}>
                            <TableCell>{customer.name}</TableCell>
                            <TableCell>{customer.state}</TableCell>
                            <TableCell>{customer.streetName}</TableCell>
                            <TableCell>
                              <IconButton
                                className="text-success"
                                aria-label="Delete"
                                onClick={() => onSelectCustomer(customer)}
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
          {props.customer.loading && (
            <CircularProgress
              className="mr-30 mb-10 progress-primary"
              size={35}
            />
          )}
          <Button
            variant="contained"
            className={props.loading ? "" : "text-white btn-success"}
            onClick={() => {
              props.openModalFrom();
            }}
            disabled={props.customer.loading}
          >
            <IntlMessages id="button.add" />
          </Button>
          <Button
            variant="contained"
            className="text-white btn-danger"
            onClick={() => onAddUpdateTaskModalClose()}
          >
            <IntlMessages id="button.cancel" />
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

const mapStateToProps = ({ customer }) => {
  return { customer };
};

export default connect(mapStateToProps, {
  getCustomers,
  openModalFrom,
  closeModalFrom,
  createCustomer,
})(CustomerPicker);
