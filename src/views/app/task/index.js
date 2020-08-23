import React, { useState, useEffect } from "react";
import PageTitleBar from "../../../components/common/PageTitleBar";
import IntlMessages from "../../../utils/IntlMessages";
import Button from "@material-ui/core/Button";
import CloudUpload from "@material-ui/icons/CloudUpload";
import Edit from "@material-ui/icons/Edit";
import Add from "@material-ui/icons/Add";
import { withRouter } from "react-router-dom";
import RctCollapsibleCard from "../../../components/cards/RctCollapsibleCard";
import MUIDataTable from "mui-datatables";
import Tooltip from "@material-ui/core/Tooltip";
import ConfirmDialogSlide from "../../../components/dialogs/ConfirmDialogSlide";

import MassiveUploadModal from "../../../components/common/MassiveUploadModal";

// redux
import { connect } from "react-redux";

// actions
import {
  createTask,
  createTasks,
  updateTask,
  deleteTasks,
  getTasks,
  openModalFrom,
  openEditModalFrom,
  closeModalFrom,
  openDeleteDialog,
  closeDeleteDialog,
  openMassiveModal,
  closeMassiveModal,
} from "../../../redux/task/actions";

import LinearProgress from "@material-ui/core/LinearProgress";

// helpers
import { getTableColums } from "../../../helpers/helpers";
import { validateMassiveTasks } from "../../../helpers/validators";

const Task = (props) => {
  const { match } = props;

  const [itemsToDelete, setItemsToDelete] = useState([]);

  //table options
  const options = {
    filterType: "dropdown",
    responsive: "stacked",
    // page: props.task.data.pagination.currentPage,
    // rowsPerPage: props.task.data.pagination.itemsPerPage,
    onRowsDelete: (rowsDeleted, newTableData) => {
      let ids = [];
      rowsDeleted.data.forEach((rowDeleted) => {
        ids.push(props.task.data.items[rowDeleted.dataIndex].id);
      });
      setItemsToDelete(ids);
      props.openDeleteDialog();
      return false;
    },
  };

  const columns = getTableColums(props.task.data.items, [
    "planogram_id",
    "customer_id",
    "agent_id",
    "agentData",
  ]);

  const finalColumns =
    columns.length > 0
      ? [
          {
            name: "id",
            label: "Id",
          },
          ...columns,
          {
            name: "Action",
            options: {
              customBodyRender: (value, tableMeta, updateValue) => {
                return (
                  <Edit
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setTaskToEdit(tableMeta.rowData[0]);
                    }}
                  />
                );
              },
            },
          },
        ]
      : [];

  // open form modal
  const openTaskModal = () => {
    props.openModalFrom();
  };

  // close form modal
  const closeModal = () => {
    props.closeModalFrom();
  };

  // set item to edit
  const setTaskToEdit = (id) => {
    let taskToEdit = props.task.data.items.find((task) => {
      if (task.id === id) {
        return true;
      }
    });
    props.openEditModalFrom(taskToEdit);
  };

  const deleteItems = () => {
    props.deleteTasks(itemsToDelete);
  };
  // load items
  useEffect(() => {
    props.getTasks();
  }, []);

  return (
    <div className="data-table-wrapper">
      <PageTitleBar
        title={<IntlMessages id="sidebar.task" />}
        match={props.match}
      />

      <RctCollapsibleCard fullBlock>
        {props.task.loading && <LinearProgress />}
        <MUIDataTable
          title={
            props.task.loading === false && (
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
                    onClick={openTaskModal}
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
          data={props.task.data.items}
          columns={finalColumns}
          options={options}
        />
      </RctCollapsibleCard>

      <ConfirmDialogSlide
        message={<IntlMessages id="message.confirmDelete" />}
        tittle={<IntlMessages id="tittle.delete" />}
        isOpen={props.task.isDeleteDialogOpen}
        closeDialog={() => {
          props.closeDeleteDialog();
        }}
        onAcept={deleteItems}
        loading={props.task.loading}
      />
      <MassiveUploadModal
        isOpen={props.task.isMassiveModalFormOpen}
        saveData={props.createTasks}
        validationFunction={validateMassiveTasks}
        closeModal={props.closeMassiveModal}
        loading={props.task.loading}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return { task: state.task };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createTask: (taskData, addToArray) =>
      dispatch(createTask(taskData, addToArray)),
    createTasks: (tasks) => dispatch(createTasks(tasks)),
    updateTask: (taskData) => dispatch(updateTask(taskData)),
    deleteTasks: (ids) => dispatch(deleteTasks(ids)),
    getTasks: () => dispatch(getTasks()),
    openModalFrom: () => dispatch(openModalFrom()),
    openEditModalFrom: (task) => dispatch(openEditModalFrom(task)),
    closeModalFrom: () => dispatch(closeModalFrom()),
    openDeleteDialog: () => dispatch(openDeleteDialog()),
    closeDeleteDialog: () => dispatch(closeDeleteDialog()),
    openMassiveModal: () => dispatch(openMassiveModal()),
    closeMassiveModal: () => dispatch(closeMassiveModal()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Task));
