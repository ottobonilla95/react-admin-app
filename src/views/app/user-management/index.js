/**
 * User Management Page
 */
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

import {
  Pagination,
  PaginationItem,
  PaginationLink,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Badge,
} from "reactstrap";
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
  createUser,
  updateUser,
  deleteUser,
  getUsers,
  openDeleteDialog,
  closeDeleteDialog,
  openModalFrom,
  closeModalFrom,
} from "../../../redux/admin/actions";

import UserModalForm from "./UserModalForm";

const UserProfile = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [editUser, setEditUser] = useState({});

  const [userToDelete, setUserToDelete] = useState(undefined);
  const [addNewUserModal, setAddNewUserModal] = useState(false);

  useEffect(() => {
    props.getUsers();
  }, []);

  const onDelete = (user) => {
    props.openDeleteDialog();
    setUserToDelete(user.id);
  };

  const opnAddNewUserModal = (e) => {
    e.preventDefault();
    setEditUser({});
    props.openModalFrom();
  };

  // submit form
  const submitUserForm = (data) => {
    if (editUser.id) {
      props.updateUser({ ...data, id: editUser.id });
    } else {
      props.createUser(data);
    }
  };

  /**
   * On Add & Update User Modal Close
   */
  const onAddUpdateUserModalClose = () => {
    setAddNewUserModal(false);
  };

  const onEditUser = (id) => {
    let userToEdit = props.user.data.items.find((user) => {
      if (user.id === id) {
        return true;
      }
    });
    setEditUser(userToEdit);
    props.openModalFrom();
  };

  return (
    <>
      <div className="user-management">
        <Helmet>
          <title>Users Management</title>
          <meta name="description" content="Widgets" />
        </Helmet>
        <PageTitleBar
          title={<IntlMessages id="sidebar.userManagement" />}
          match={props.match}
        />
        <RctCollapsibleCard fullBlock>
          {props.user.loading && <LinearProgress />}
          <div className="table-responsive">
            <div className="d-flex justify-content-between py-20 px-10 border-bottom">
              <div></div>
              <div>
                <a
                  href="#"
                  onClick={(e) => opnAddNewUserModal(e)}
                  color="primary"
                  className="caret btn-sm mr-10"
                >
                  <IntlMessages id="usermanagement.addnewuser" />
                  <i className="zmdi zmdi-plus ml-2"></i>
                </a>
              </div>
            </div>
            <table className="table table-middle table-hover mb-0">
              <thead>
                <tr>
                  <th>
                    <IntlMessages id="usermanagement.user" />
                  </th>
                  <th>
                    <IntlMessages id="usermanagement.email" />
                  </th>

                  <th>
                    <IntlMessages id="usermanagement.type" />
                  </th>
                  <th>
                    <IntlMessages id="usermanagement.creationdate" />
                  </th>
                  <th>
                    <IntlMessages id="usermanagement.action" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {props.user.data.items &&
                  props.user.data.items.map((user) => (
                    <tr key={user.id}>
                      <td>
                        <div className="media">
                          {user.profile_image ? (
                            <img
                              src={user.profile_image}
                              alt="user prof"
                              className="rounded-circle mr-15"
                              width="50"
                              height="50"
                            />
                          ) : (
                            <Avatar className="mr-15">
                              {user.username.charAt(0)}
                            </Avatar>
                          )}
                          <div className="media-body">
                            <h5 className="mb-5 fw-bold">{user.username}</h5>
                            {/* <Badge color="warning">{user.type}</Badge> */}
                          </div>
                        </div>
                      </td>
                      <td>{user.email}</td>
                      {/* <td className="d-flex justify-content-start">
                      <span
                        className={`badge badge-xs ${user.badgeClass} mr-10 mt-10 position-relative`}
                      >
                        &nbsp;
                      </span>
                      <div className="status">
                        <span className="d-block">{user.status}</span>
                        <span className="small">{user.lastSeen}</span>
                      </div>
                    </td> */}
                      <td>
                        <span
                          className={`badge ${
                            user.role.id === 2
                              ? "badge-primary"
                              : "badge-secondary"
                          }  badge-pill`}
                        >
                          {user.role.name}
                        </span>
                      </td>
                      <td>
                        {moment(user.creation_date).format("DD MMM YYYY")}
                      </td>
                      <td className="list-action">
                        <button
                          type="button"
                          className="rct-link-btn"
                          onClick={() => setCurrentUser(user)}
                        >
                          <i className="ti-eye"></i>
                        </button>
                        {props.auth.user.user.id !== user.id && (
                          <>
                            <button
                              type="button"
                              className="rct-link-btn"
                              onClick={() => onEditUser(user.id)}
                            >
                              <i className="ti-pencil"></i>
                            </button>
                            <button
                              type="button"
                              className="rct-link-btn"
                              onClick={() => onDelete(user)}
                            >
                              <i className="ti-close"></i>
                            </button>
                          </>
                        )}
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
          {props.user.loading && <RctSectionLoader />}
        </RctCollapsibleCard>

        <ConfirmDialogSlide
          tittle={<IntlMessages id="tittle.delete" />}
          message={<IntlMessages id="message.confirmDeleteSingular" />}
          isOpen={props.user.isDeleteDialogOpen}
          closeDialog={() => {
            props.closeDeleteDialog();
          }}
          onAcept={() => {
            props.deleteUser(userToDelete);
          }}
          loading={props.user.loading}
        />

        <Dialog
          onClose={() => setCurrentUser(undefined)}
          open={currentUser !== undefined}
        >
          <DialogContent>
            {currentUser && (
              <div>
                <div className="clearfix d-flex">
                  <div className="media pull-left">
                    {currentUser.profile_image ? (
                      <img
                        src={currentUser.profile_image}
                        alt="user prof"
                        className="rounded-circle mr-15"
                        width="50"
                        height="50"
                      />
                    ) : (
                      <Avatar className="mr-15">
                        {currentUser.username.charAt(0)}
                      </Avatar>
                    )}

                    <div className="media-body">
                      <p>
                        Name:{" "}
                        <span className="fw-bold">{currentUser.username}</span>
                      </p>
                      <p>
                        Email:{" "}
                        <span className="fw-bold">{currentUser.email}</span>
                      </p>

                      <p>
                        Account Type:
                        <span
                          className={`badge ${
                            currentUser.role.id === 2
                              ? "badge-primary"
                              : "badge-secondary"
                          } badge-pill`}
                          style={{ marginLeft: "15px" }}
                        >
                          {currentUser.role.name}
                        </span>
                      </p>
                      {/* <p>Status: {currentUser.status}</p>
                    <p>Last Seen: {currentUser.lastSeen}</p> */}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>

      <UserModalForm
        isOpen={props.user.isUserModalFormOpen}
        closeModal={props.closeModalFrom}
        user={editUser}
        submitUserForm={submitUserForm}
        loading={props.user.loading}
      />
    </>
  );
};

const mapStateToProps = ({ user, auth }) => {
  return { user, auth };
};

export default connect(mapStateToProps, {
  createUser,
  updateUser,
  deleteUser,
  getUsers,
  openDeleteDialog,
  closeDeleteDialog,
  openModalFrom,
  closeModalFrom,
})(UserProfile);
