import React, { useState, useEffect, useRef } from "react";

// router
import { withRouter } from "react-router-dom";

import { Helmet } from "react-helmet";

// material-ui
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SearchIcon from "@material-ui/icons/Search";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/lab/Pagination";
import TextField from "@material-ui/core/TextField";
import Add from "@material-ui/icons/Add";
import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles } from "@material-ui/core/styles";
// components
import PlanogramModalForm from "./PlanogramModalForm";
import { RctCard, RctCardContent } from "../../../components/cards/RctCard";
import ConfirmDialogSlide from "../../../components/dialogs/ConfirmDialogSlide";
import PageTitleBar from "../../../components/common/PageTitleBar";
import IntlMessages from "../../../utils/IntlMessages";

// redux
import { connect } from "react-redux";

// actions
import {
  createPlanogram,
  updatePlanogram,
  deletePlanogram,
  getPlanograms,
  openModalFrom,
  closeModalFrom,
  openDeleteDialog,
  closeDeleteDialog,
} from "../../../redux/planogram/actions";

const useStyles = makeStyles({
  planogramEmptyImage: {
    backgroundColor: "lightgray",
    width: "100%",
    paddingTop: "100%",
    position: "relative",
  },
});

const Planogram = (props) => {
  const { match } = props;
  const classes = useStyles();

  const [editPlanogram, setEditPlanogram] = useState({});
  const [itemToDelete, setItemToDelete] = useState(undefined);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 10,
    itemsPerPage: 16,
    totalItems: 1,
  });
  const [finalItems, setFinalItems] = useState([]);
  const searchField = useRef(null);

  // open form modal
  const openPlanogramModal = () => {
    setEditPlanogram({});
    props.openModalFrom();
  };

  // close form modal
  const closeModal = () => {
    props.closeModalFrom();
  };

  // set item to edit
  const setPlanogramToEdit = (id) => {
    let planogramToEdit = props.planogram.data.items.find((planogram) => {
      if (planogram.id === id) {
        return true;
      }
    });
    setEditPlanogram(planogramToEdit);
    props.openModalFrom();
  };

  // submit form
  const submitPlanogramForm = (data) => {
    if (editPlanogram.id) {
      props.updatePlanogram({ ...data, id: editPlanogram.id });
    } else {
      props.createPlanogram(data);
    }
  };

  const deleteItems = () => {
    props.deletePlanogram(itemToDelete);
  };

  const sortItems = (page) => {
    let finalKeyWord = searchField.current.children[0].children[0].value.toLowerCase();

    let finalItemsFiltered = props.planogram.data.items.filter((item) => {
      if (
        item.name.toLowerCase().includes(finalKeyWord) ||
        item.description.toLowerCase().includes(finalKeyWord)
      ) {
        return true;
      }
    });

    let finalPage;

    if (page) {
      finalPage = page;
    } else {
      finalPage = pagination.currentPage;
    }

    let totalPages = Math.ceil(
      finalItemsFiltered.length / pagination.itemsPerPage
    );

    let totalItems = finalItemsFiltered.length;

    let finalPagination = {
      currentPage: finalPage,
      totalPages: totalPages,
      itemsPerPage: 16,
      totalItems: totalItems,
    };

    var startValue =
      (finalPagination.currentPage - 1) * finalPagination.itemsPerPage;
    var finalValue = startValue + finalPagination.itemsPerPage;

    let finalItemsToShow = [];
    for (var i = startValue; i < finalValue; i++) {
      if (finalItemsFiltered[i] !== undefined) {
        finalItemsToShow.push(finalItemsFiltered[i]);
      }
    }

    setPagination(finalPagination);
    if (!finalItemsFiltered.length) {
      setFinalItems([]);
      return;
    }
    setFinalItems(finalItemsToShow);
  };

  const handlePaginationChange = (e, value) => {
    sortItems(value);
  };

  // load items
  useEffect(() => {
    props.getPlanograms();
  }, []);

  useEffect(() => {
    sortItems(1);
  }, [props.planogram.data]);

  return (
    <div className="clients-wrapper">
      <Helmet>
        <title>clients</title>
        <meta name="description" content="Blank Page" />
      </Helmet>
      <PageTitleBar
        title={<IntlMessages id="sidebar.planogram" />}
        match={props.match}
      />
      <div className="search-bar-wrap">
        {props.planogram.loading && <LinearProgress />}
        <RctCard>
          <RctCardContent>
            <div className="row">
              <div className="col-sm-12 col-md-3 col-lg-3 align-items-center mb-10 mb-sm-0">
                <h2 className="mb-0 text-capitalize">
                  <IntlMessages id="planogram.search" />
                </h2>
              </div>
              <div className="col-sm-12 col-md-9 col-lg-9">
                <div className="d-sm-flex">
                  <div className="search-bar">
                    <TextField
                      disabled={props.planogram.loading}
                      id="standard-with-placeholder"
                      placeholder="Search Projects"
                      ref={searchField}
                      onChange={(e) => {
                        sortItems(1);
                      }}
                    />
                  </div>

                  <Button
                    variant="contained"
                    className="upgrade-btn tour-step-4 text-white"
                    color="primary"
                    style={{ marginRight: "10px" }}
                    startIcon={<Add />}
                    disabled={props.planogram.loading}
                    onClick={openPlanogramModal}
                  >
                    <IntlMessages id="button.add" />
                  </Button>
                </div>
              </div>
            </div>
          </RctCardContent>
        </RctCard>
      </div>
      <div>
        <RctCard>
          <div className="p-sm-20 pt-sm-30 p-10 pt-15 border-top">
            <div className="row">
              {finalItems.map((item) => {
                return (
                  <div
                    className="col-xs-12 col-sm-6 col-md-3 mb-5 mt-5"
                    key={item.id}
                  >
                    <Card>
                      <CardActionArea
                        onClick={() => {
                          setPlanogramToEdit(item.id);
                        }}
                      >
                        {item.image ? (
                          <CardMedia
                            component="img"
                            alt="Contemplative Reptile"
                            image={item.image}
                            title="Contemplative Reptile"
                          />
                        ) : (
                          <CardMedia
                            component="div"
                            className={classes.planogramEmptyImage}
                          />
                        )}

                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h2">
                            {item.name}
                          </Typography>
                          <Typography gutterBottom variant="h6">
                            {item.updatedDate}
                          </Typography>

                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            {item.description}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            <IntlMessages id="planogram.version" />:
                            {item.version}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions>
                        <div style={{ marginLeft: "auto" }}>
                          <Tooltip title={<IntlMessages id="button.delete" />}>
                            <IconButton
                              aria-label="delete"
                              onClick={() => {
                                setItemToDelete(item.id);
                                props.openDeleteDialog();
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </div>
                      </CardActions>
                    </Card>
                  </div>
                );
              })}

              <div className="col-sm-12 col-md-6 col-lg-3"></div>
            </div>
            <div className="row mt-5">
              <Pagination
                style={{ margin: "0 auto" }}
                count={pagination.totalPages}
                page={pagination.currentPage}
                onChange={handlePaginationChange}
              />
            </div>
          </div>
        </RctCard>
      </div>
      <PlanogramModalForm
        isOpen={props.planogram.isPlanogramModalFormOpen}
        closeModal={closeModal}
        planogram={editPlanogram}
        submitPlanogramForm={submitPlanogramForm}
        loading={props.planogram.loading}
      />
      <ConfirmDialogSlide
        message={<IntlMessages id="message.confirmDeleteSingular" />}
        tittle={<IntlMessages id="tittle.delete" />}
        isOpen={props.planogram.isDeleteDialogOpen}
        closeDialog={() => {
          props.closeDeleteDialog();
        }}
        onAcept={deleteItems}
        loading={props.planogram.loading}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return { planogram: state.planogram };
};
const mapDispatchToProps = (dispatch) => {
  return {
    createPlanogram: (planogramData, addToArray) =>
      dispatch(createPlanogram(planogramData, addToArray)),
    updatePlanogram: (planogramData) =>
      dispatch(updatePlanogram(planogramData)),
    deletePlanogram: (id) => dispatch(deletePlanogram(id)),
    getPlanograms: () => dispatch(getPlanograms()),
    openModalFrom: () => dispatch(openModalFrom()),
    closeModalFrom: () => dispatch(closeModalFrom()),
    openDeleteDialog: () => dispatch(openDeleteDialog()),
    closeDeleteDialog: () => dispatch(closeDeleteDialog()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Planogram)
);
