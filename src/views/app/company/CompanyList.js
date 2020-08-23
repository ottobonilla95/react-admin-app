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

const CompanyList = (props) => {
  const [currentCompany, setCurrentCompany] = useState(undefined);
  const [editCompany, setEditCompany] = useState({});

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

  // submit form
  const submitCompanyForm = (data) => {
    if (editCompany.id) {
      props.updateCompany({ ...data, id: editCompany.id });
    } else {
      props.createCompany(data);
    }
  };

  const onEditCompany = (id) => {
    history.push(`${props.match.path}edit?id=${id}`);
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
                  <td colSpan="100%">
                    {/* <Pagination className="mb-0 py-10 px-10">
                      <PaginationItem>
                        <PaginationLink previous href="#" />
                      </PaginationItem>
                      <PaginationItem active>
                        <PaginationLink
                          href="#"
                          onClick={(e) => e.preventDefault()}
                        >
                          1
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#"
                          onClick={(e) => e.preventDefault()}
                        >
                          2
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#"
                          onClick={(e) => e.preventDefault()}
                        >
                          3
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          next
                          href="#"
                          onClick={(e) => e.preventDefault()}
                        />
                      </PaginationItem>
                    </Pagination> */}
                  </td>
                </tr>
              </tfoot>
            </table>
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
