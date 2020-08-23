import React, { useState, useEffect } from "react";

// IntlMessages
import IntlMessages from "../../../utils/IntlMessages";

// material ui
import Edit from "@material-ui/icons/Edit";
import MapIcon from "@material-ui/icons/Map";
import Add from "@material-ui/icons/Add";
import Chip from "@material-ui/core/Chip";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import CloudUpload from "@material-ui/icons/CloudUpload";
import LinearProgress from "@material-ui/core/LinearProgress";

// router
import { withRouter } from "react-router-dom";

// components
import RctCollapsibleCard from "../../../components/cards/RctCollapsibleCard";
import ConfirmDialogSlide from "../../../components/dialogs/ConfirmDialogSlide";
import CustomerModalForm from "./CustomerModalForm";
import PageTitleBar from "../../../components/common/PageTitleBar";
import MUIDataTable from "mui-datatables";
import LocationViewerModal from "../../../components/common/LocationViewerModal";
import MassiveUploadModal from "../../../components/common/MassiveUploadModal";

// redux
import { connect } from "react-redux";

// actions
import {
  createCustomer,
  updateCustomer,
  deleteCustomers,
  getCustomers,
  openModalFrom,
  closeModalFrom,
  openDeleteDialog,
  closeDeleteDialog,
  createCustomers,
  openMassiveModal,
  closeMassiveModal,
} from "../../../redux/customer/actions";

// helpers
import { getTableColums } from "../../../helpers/helpers";
import { validateMassiveCustomers } from "../../../helpers/validators";

import { NotificationManager } from "react-notifications";

const Customer = (props) => {
  const { match } = props;

  const [editCustomer, setEditCustomer] = useState({});
  const [itemsToDelete, setItemsToDelete] = useState([]);
  const [positionToShow, setPositionToShow] = useState(undefined);

  //table options
  const options = {
    filterType: "dropdown",
    responsive: "stacked",
    // page: props.customer.data.pagination.currentPage,
    // rowsPerPage: props.customer.data.pagination.itemsPerPage,
    onRowsDelete: (rowsDeleted, newTableData) => {
      let ids = [];
      rowsDeleted.data.forEach((rowDeleted) => {
        ids.push(props.customer.data.items[rowDeleted.dataIndex].id);
      });
      setItemsToDelete(ids);
      props.openDeleteDialog();
      return false;
    },
  };

  const columns = getTableColums(props.customer.data.items, []);

  const finalColumns =
    columns.length > 0
      ? [
          {
            name: "id",
            label: "Id",
          },
          {
            name: "name",
            label: <IntlMessages id="form.name" />,
          },
          {
            name: "email",
            label: <IntlMessages id="form.email" />,
          },
          {
            name: "mobile_number",
            label: <IntlMessages id="form.mobilenumber" />,
          },
          {
            name: "street_name",
            label: <IntlMessages id="form.streetname" />,
          },
          {
            name: "state",
            label: <IntlMessages id="form.state" />,
          },
          {
            name: "postal_code",
            label: <IntlMessages id="form.postalcode" />,
          },
          {
            name: "country",
            label: <IntlMessages id="form.country" />,
          },
          {
            name: "Location",
            label: <IntlMessages id="form.location" />,
            options: {
              customBodyRender: (value, tableMeta, updateValue) => {
                return (
                  <MapIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      let customer = props.customer.data.items.find(
                        (customer) => {
                          if (customer.id === tableMeta.rowData[0]) {
                            return true;
                          }
                        }
                      );

                      setPositionToShow({
                        lat: customer.latitude,
                        lng: customer.longitude,
                      });
                    }}
                  />
                );
              },
            },
          },
          {
            name: "Action",
            label: <IntlMessages id="form.action" />,
            options: {
              customBodyRender: (value, tableMeta, updateValue) => {
                return (
                  <Edit
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setCustomerToEdit(tableMeta.rowData[0]);
                    }}
                  />
                );
              },
            },
          },
        ]
      : [];

  // open form modal
  const openCustomerModal = () => {
    setEditCustomer({});
    props.openModalFrom();
  };

  // close form modal
  const closeModal = () => {
    props.closeModalFrom();
  };

  // set item to edit
  const setCustomerToEdit = (id) => {
    let customerToEdit = props.customer.data.items.find((customer) => {
      if (customer.id === id) {
        return true;
      }
    });
    setEditCustomer(customerToEdit);
    props.openModalFrom();
  };

  // submit form
  const submitCustomerForm = (data) => {
    if (editCustomer.id) {
      props.updateCustomer({ ...data, id: editCustomer.id });
    } else {
      let addToArray = false;
      if (
        props.customer.data.pagination.currentPage ===
        props.customer.data.pagination.numberOfPages
      ) {
        addToArray = true;
      }
      props.createCustomer(data, addToArray);
    }
  };

  const deleteItems = () => {
    props.deleteCustomers(itemsToDelete);
  };
  // load items
  useEffect(() => {
    props.getCustomers();
  }, []);

  return (
    <div className="data-table-wrapper">
      <PageTitleBar
        title={<IntlMessages id="sidebar.customer" />}
        match={props.match}
      />

      <RctCollapsibleCard fullBlock>
        {props.customer.loading && <LinearProgress />}
        <MUIDataTable
          title={
            props.customer.loading === false && (
              <>
                <Tooltip
                  title={<IntlMessages id="button.add" />}
                  placement="bottom"
                >
                  <Button
                    variant="contained"
                    className="upgrade-btn tour-step-4 text-white"
                    color="primary"
                    style={{ marginRight: "10px" }}
                    startIcon={<Add />}
                    onClick={openCustomerModal}
                  >
                    <IntlMessages id="button.add" />
                  </Button>
                </Tooltip>
                <Tooltip
                  title={<IntlMessages id="button.upload" />}
                  placement="bottom"
                >
                  <Button
                    variant="contained"
                    className="upgrade-btn tour-step-4 text-white"
                    color="secondary"
                    startIcon={<CloudUpload />}
                    onClick={props.openMassiveModal}
                  >
                    <IntlMessages id="button.upload" />
                  </Button>
                </Tooltip>
              </>
            )
          }
          data={props.customer.data.items}
          columns={finalColumns}
          options={options}
        />
      </RctCollapsibleCard>
      {props.customer.isCustomerModalFormOpen && (
        <CustomerModalForm
          isOpen={props.customer.isCustomerModalFormOpen}
          closeModal={closeModal}
          customer={editCustomer}
          submitCustomerForm={submitCustomerForm}
          loading={props.customer.loading}
        />
      )}
      <ConfirmDialogSlide
        message={<IntlMessages id="message.confirmDelete" />}
        tittle={<IntlMessages id="tittle.delete" />}
        isOpen={props.customer.isDeleteDialogOpen}
        closeDialog={() => {
          props.closeDeleteDialog();
        }}
        onAcept={deleteItems}
        loading={props.customer.loading}
      />
      <LocationViewerModal
        position={positionToShow}
        closeModal={() => setPositionToShow(undefined)}
      />
      <MassiveUploadModal
        isOpen={props.customer.isMassiveModalFormOpen}
        saveData={props.createCustomers}
        validationFunction={validateMassiveCustomers}
        closeModal={props.closeMassiveModal}
        loading={props.customer.loading}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return { customer: state.customer };
};
const mapDispatchToProps = (dispatch) => {
  return {
    createCustomer: (customerData, addToArray) =>
      dispatch(createCustomer(customerData, addToArray)),
    createCustomers: (customers) => dispatch(createCustomers(customers)),
    updateCustomer: (customerData) => dispatch(updateCustomer(customerData)),
    deleteCustomers: (ids) => dispatch(deleteCustomers(ids)),
    getCustomers: () => dispatch(getCustomers()),
    openModalFrom: () => dispatch(openModalFrom()),
    closeModalFrom: () => dispatch(closeModalFrom()),
    openDeleteDialog: () => dispatch(openDeleteDialog()),
    closeDeleteDialog: () => dispatch(closeDeleteDialog()),
    openMassiveModal: () => dispatch(openMassiveModal()),
    closeMassiveModal: () => dispatch(closeMassiveModal()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Customer)
);
