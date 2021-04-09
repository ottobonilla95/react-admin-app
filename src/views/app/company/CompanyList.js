/**
 * Company Management Page
 */
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

import Avatar from "@material-ui/core/Avatar";

// material ui
import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles } from "@material-ui/core/styles";

// delete confirmation dialog
import ConfirmDialogSlide from "../../../components/dialogs/ConfirmDialogSlide";

// page title bar
import PageTitleBar from "../../../components/common/PageTitleBar";

// intl messages
import IntlMessages from "../../../utils/IntlMessages";

// rct card box
import RctCollapsibleCard from "../../../components/cards/RctCollapsibleCard";

// rct section loader
import RctSectionLoader from "../../../components/loaders/SectionLoader";

// redux
import { connect } from "react-redux";

// moment
import moment from "moment";

// actions
import {
  createCompany,
  updateCompany,
  deleteCompany,
  getCompanys,
  openDeleteDialog,
  closeDeleteDialog,
} from "../../../redux/company/actions";

import history from "../../../utils/history";

const useStyles = makeStyles({
  messageContainer: {
    width: "100%",
    paddingLeft: 20,
    paddingRight: 20,
    textAlign: "center",
  },
  message: {
    backgroundColor: "#f5f5f5",
    borderRadius: 5,
    padding:10
  },
});

const CompanyList = (props) => {
  const classes = useStyles();
  const [currentCompany, setCurrentCompany] = useState(undefined);

  const [companyToDelete, setCompanyToDelete] = useState(undefined);

  useEffect(() => {
    props.getCompanys();
  }, []);

  const onDelete = (company) => {
    props.openDeleteDialog();
    setCompanyToDelete(company.id);
  };

  const opnAddNewCompanyModal = (e) => {
    e.preventDefault();
    history.push(`${props.match.path}create`);
  };

  return (
    <>
      <div className="company-management">
        <Helmet>
          <title> Companys Management</title>
          <meta name="description" content="Widgets" />
        </Helmet>
        <PageTitleBar
          title={<IntlMessages id="sidebar.company" />}
          match={props.match}
        />
        <RctCollapsibleCard fullBlock>
          {props.company.loading && <LinearProgress />}
          <div className="table-responsive">
            <div className="d-flex justify-content-between py-20 px-10 border-bottom">
              <div></div>
              <div>
                <a
                  href="#"
                  onClick={(e) => opnAddNewCompanyModal(e)}
                  color="primary"
                  className="caret btn-sm mr-10"
                >
                  <IntlMessages id="company.addnew" />
                  <i className="zmdi zmdi-plus ml-2"></i>
                </a>
              </div>
            </div>
            <table className="table table-middle table-hover mb-0">
              <thead>
                <tr>
                  <th>
                    <IntlMessages id="company.company" />
                  </th>
                  <th>
                    <IntlMessages id="company.email" />
                  </th>
                  <th>
                    <IntlMessages id="company.phonenumber" />
                  </th>
                  <th>
                    <IntlMessages id="company.address" />
                  </th>
                  <th>
                    <IntlMessages id="company.creationdate" />
                  </th>
                  <th>
                    <IntlMessages id="company.action" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {props.company.data.items &&
                  props.company.data.items.map((company) => (
                    <tr key={company.id}>
                      <td>
                        <div className="media">
                          <div className="media-body">
                            <h5 className="mb-5 fw-bold">{company.name}</h5>
                          </div>
                        </div>
                      </td>
                      <td>{company.email}</td>
                      <td>{company.mobile_number}</td>
                      <td>{company.address}</td>
                      <td>
                        {moment(company.creation_date).format("DD MMM YYYY")}
                      </td>
                      <td className="list-action">
                        <button
                          type="button"
                          className="rct-link-btn"
                          onClick={() => setCurrentCompany(company)}
                        >
                          <i className="ti-eye"></i>
                        </button>

                        <button
                          type="button"
                          className="rct-link-btn"
                          onClick={() => onEditCompany(company.id)}
                        >
                          <i className="ti-pencil"></i>
                        </button>
                        <button
                          type="button"
                          className="rct-link-btn"
                          onClick={() => onDelete(company)}
                        >
                          <i className="ti-close"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
              <tfoot className="border-top">
                <tr>
                  <td colSpan="100%"></td>
                </tr>
              </tfoot>
            </table>
            {props.company.data.items && props.company.data.items.length === 0 && (
              <div className={classes.messageContainer}>
                <p className={classes.message}>No companies found</p>
              </div>
            )}
          </div>
          {props.company.loading && <RctSectionLoader />}
        </RctCollapsibleCard>

        <ConfirmDialogSlide
          tittle={<IntlMessages id="tittle.delete" />}
          message={<IntlMessages id="message.confirmDeleteSingular" />}
          isOpen={props.company.isDeleteDialogOpen}
          closeDialog={() => {
            props.closeDeleteDialog();
          }}
          onAcept={() => {
            props.deleteCompany(companyToDelete);
          }}
          loading={props.company.loading}
        />

        <Dialog
          onClose={() => setCurrentCompany(undefined)}
          open={currentCompany !== undefined}
        >
          <DialogContent>
            {currentCompany && (
              <div>
                <div className="clearfix d-flex">
                  <div className="media pull-left">
                    <Avatar className="mr-15">
                      {currentCompany.name.charAt(0)}
                    </Avatar>

                    <div className="media-body">
                      <p>
                        <h3>{currentCompany.name}</h3>
                      </p>
                      <p>
                        <span className="fw-bold"> Email:</span>
                        <span style={{ display: "block" }}>
                          {currentCompany.email}
                        </span>
                      </p>
                      <p>
                        <span className="fw-bold"> Mobile number:</span>
                        <span style={{ display: "block" }}>
                          {currentCompany.mobile_number}
                        </span>
                      </p>
                      <p>
                        <span className="fw-bold"> Address:</span>
                        <span style={{ display: "block" }}>
                          {currentCompany.address}
                        </span>
                      </p>
                      <p>
                        <span className="fw-bold">Number of users:</span>

                        <span style={{ marginLeft: "10px" }}>
                          {currentCompany.users.length}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

const mapStateToProps = ({ company, auth }) => {
  return { company, auth };
};

export default connect(mapStateToProps, {
  createCompany,
  updateCompany,
  deleteCompany,
  getCompanys,
  openDeleteDialog,
  closeDeleteDialog,
})(CompanyList);
