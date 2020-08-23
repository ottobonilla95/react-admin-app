import React, { useState } from "react";
import UserModalForm from "../user-management/UserModalForm";
import Avatar from "@material-ui/core/Avatar";

// reactstrap
import { Alert } from "reactstrap";

// intl messages
import IntlMessages from "../../../utils/IntlMessages";

// moment
import moment from "moment";

const UserComponent = (props) => {
  const [editUser, setEditUser] = useState({});

  const [isUserModalFormOpen, setIsUserModalFormOpen] = useState(false);

  const opnAddNewUserModal = (e) => {
    e.preventDefault();
    setEditUser({});
    setIsUserModalFormOpen(true);
  };
  // submit form
  const submitUserForm = (data) => {
    if (editUser.id) {
      props.AddUser({ ...data, id: editUser.id, role: editUser.role });
    } else {
      props.AddUser({ ...data });
    }

    setIsUserModalFormOpen(false);
  };

  const onDelete = (userToDelete) => {
    props.DeleteUser(userToDelete);
  };

  const onEditUser = (id) => {
    let userToEdit = props.users.find((user) => {
      if (user.id === id) {
        return true;
      }
    });
    setEditUser(userToEdit);
    setIsUserModalFormOpen(true);
  };

  return (
    <>
      <a
        href="#"
        onClick={(e) => opnAddNewUserModal(e)}
        color="primary"
        className="caret btn-sm mr-10"
      >
        <IntlMessages id="company.addnewuser" />
        <i className="zmdi zmdi-plus ml-2"></i>
      </a>
      {!props.users.length ? (
        <Alert color="dark">
          <IntlMessages id="company.nousersaddedyet" />
        </Alert>
      ) : (
        <table className="table table-middle table-hover mb-0">
          <thead>
            <tr>
              <th> <IntlMessages id="usermanagement.user" /></th>
              <th><IntlMessages id="usermanagement.email" /></th>
              <th><IntlMessages id="usermanagement.creationdate" /></th>
              <th><IntlMessages id="usermanagement.action" /></th>
            </tr>
          </thead>
          <tbody>
            {props.users.map((user, index) => (
              <tr key={index}>
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
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>

                <td>{moment(user.creation_date).format("DD MMM YYYY")}</td>
                <td className="list-action">
                  {user.id && (
                    <button
                      type="button"
                      className="rct-link-btn"
                      onClick={() => onEditUser(user.id)}
                    >
                      <i className="ti-pencil"></i>
                    </button>
                  )}

                  <button
                    type="button"
                    className="rct-link-btn"
                    onClick={() => onDelete(user)}
                  >
                    <i className="ti-close"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <UserModalForm
        isOpen={isUserModalFormOpen}
        closeModal={() => setIsUserModalFormOpen(false)}
        user={editUser}
        submitUserForm={submitUserForm}
      />
    </>
  );
};

export default UserComponent;
