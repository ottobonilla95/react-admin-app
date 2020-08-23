import React, { useState, useEffect } from "react";

// IntlMessages
import IntlMessages from "../../../utils/IntlMessages";

// router
import { withRouter } from "react-router-dom";

// MUIDataTable
import MUIDataTable from "mui-datatables";

// styles
import { tableImage } from "../app-styles";

// components
import ImageViewerModal from "../../../components/common/ImageViewerModal";
import RctCollapsibleCard from "../../../components/cards/RctCollapsibleCard";
import ConfirmDialogSlide from "../../../components/dialogs/ConfirmDialogSlide";
import PageTitleBar from "../../../components/common/PageTitleBar";
import MassiveUploadModal from "../../../components/common/MassiveUploadModal";

import AgentModalForm from "./AgentModalForm";
import {
  createAgent,
  createAgents,
  updateAgent,
  deleteAgents,
  getAgents,
  openModalFrom,
  closeModalFrom,
  openDeleteDialog,
  closeDeleteDialog,
  openMassiveModal,
  closeMassiveModal,
} from "../../../redux/agent/actions";

import { connect } from "react-redux";

// material ui
import Avatar from "@material-ui/core/Avatar";
import LinearProgress from "@material-ui/core/LinearProgress";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import CloudUpload from "@material-ui/icons/CloudUpload";
import Edit from "@material-ui/icons/Edit";
import Add from "@material-ui/icons/Add";

// helpers
import { getTableColums } from "../../../helpers/helpers";
import { validateMassiveAgents } from "../../../helpers/validators";

const Agent = (props) => {
  const { match } = props;

  const [editAgent, setEditAgent] = useState({});
  const [itemsToDelete, setItemsToDelete] = useState([]);
  const [image, setImage] = useState(undefined);

  const seeFullImage = (image) => {
    setImage(image);
  };

  //table options
  const options = {
    filterType: "dropdown",
    responsive: "stacked",
    // page: props.agent.data.pagination.currentPage,
    // rowsPerPage: props.agent.data.pagination.itemsPerPage,
    onRowsDelete: (rowsDeleted, newTableData) => {
      let ids = [];
      rowsDeleted.data.forEach((rowDeleted) => {
        ids.push(props.agent.data.items[rowDeleted.dataIndex].id);
      });
      setItemsToDelete(ids);
      props.openDeleteDialog();
      return false;
    },
  };

  const columns = getTableColums(props.agent.data.items, []);

  // set up columns
  const finalColumns =
    columns.length > 0
      ? [
          {
            name: "id",
            label: "Id",
          },
          {
            name: "finalImage",
            label: <IntlMessages id="form.image" />,
            options: {
              customBodyRender: (value, tableMeta, updateValue) => {
                const image = props.agent.data.items[tableMeta.rowIndex].image;
                const first_name =
                  props.agent.data.items[tableMeta.rowIndex].first_name;
                if (image) {
                  return (
                    <img
                      src={image}
                      style={tableImage}
                      onClick={() => {
                        if (image) {
                          seeFullImage(image);
                        }
                      }}
                    />
                  );
                }
                return (
                  <Avatar className="mr-15">{first_name.charAt(0)}</Avatar>
                );
              },
            },
          },
          {
            name: "username",
            label: <IntlMessages id="form.username" />,
          },
          {
            name: "first_name",
            label: <IntlMessages id="form.firstname" />,
          },
          {
            name: "last_name",
            label: <IntlMessages id="form.lastname" />,
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
            name: "country",
            label: <IntlMessages id="form.country" />,
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
                      setAgentToEdit(tableMeta.rowData[0]);
                    }}
                  />
                );
              },
            },
          },
        ]
      : [];

  // open form modal
  const openAgentModal = () => {
    setEditAgent({});
    props.openModalFrom();
  };

  // close form modal
  const closeModal = () => {
    props.closeModalFrom();
  };

  // set item to edit
  const setAgentToEdit = (id) => {
    let agentToEdit = props.agent.data.items.find((agent) => {
      if (agent.id === id) {
        return true;
      }
    });
    setEditAgent(agentToEdit);
    props.openModalFrom();
  };

  // submit form
  const submitAgentForm = (data) => {
    if (editAgent.id) {
      props.updateAgent({ ...data, id: editAgent.id });
    } else {
      props.createAgent(data);
    }
  };

  const deleteItems = () => {
    props.deleteAgents(itemsToDelete);
  };
  // load items
  useEffect(() => {
    props.getAgents();
  }, []);

  return (
    <div className="data-table-wrapper">
      <PageTitleBar
        title={<IntlMessages id="sidebar.agent" />}
        match={props.match}
      />

      <RctCollapsibleCard fullBlock>
        {props.agent.loading && <LinearProgress />}
        <MUIDataTable
          title={
            props.agent.loading === false && (
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
                    onClick={openAgentModal}
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
          data={props.agent.data.items}
          columns={finalColumns}
          options={options}
        />
      </RctCollapsibleCard>
      <AgentModalForm
        isOpen={props.agent.isAgentModalFormOpen}
        closeModal={closeModal}
        agent={editAgent}
        submitAgentForm={submitAgentForm}
        loading={props.agent.loading}
      />

      <ConfirmDialogSlide
        message={<IntlMessages id="message.confirmDelete" />}
        tittle={<IntlMessages id="tittle.delete" />}
        isOpen={props.agent.isDeleteDialogOpen}
        closeDialog={() => {
          props.closeDeleteDialog();
        }}
        onAcept={deleteItems}
        loading={props.agent.loading}
      />
      <ImageViewerModal
        image={image}
        closeModal={() => {
          setImage(undefined);
        }}
      />
      <MassiveUploadModal
        isOpen={props.agent.isMassiveModalFormOpen}
        saveData={props.createAgents}
        validationFunction={validateMassiveAgents}
        closeModal={props.closeMassiveModal}
        loading={props.agent.loading}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return { agent: state.agent };
};
const mapDispatchToProps = (dispatch) => {
  return {
    createAgent: (agentData, addToArray) =>
      dispatch(createAgent(agentData, addToArray)),
    updateAgent: (agentData) => dispatch(updateAgent(agentData)),
    createAgents: (agents) => dispatch(createAgents(agents)),
    deleteAgents: (ids) => dispatch(deleteAgents(ids)),
    getAgents: () => dispatch(getAgents()),
    openModalFrom: () => dispatch(openModalFrom()),
    closeModalFrom: () => dispatch(closeModalFrom()),
    openDeleteDialog: () => dispatch(openDeleteDialog()),
    closeDeleteDialog: () => dispatch(closeDeleteDialog()),
    openMassiveModal: () => dispatch(openMassiveModal()),
    closeMassiveModal: () => dispatch(closeMassiveModal()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Agent));
