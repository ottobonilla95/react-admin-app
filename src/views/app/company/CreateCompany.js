import React from "react";

// redux
import { connect } from "react-redux";

// actions
import { createCompany, } from "../../../redux/company/actions";

// components
import CompanyForm from "./CompanyForm";

// CircularProgress
import CircularProgress from "@material-ui/core/CircularProgress";

const CreateCompany = (props) => {
  // submit form
  const onCompanyFormSubmit = (data) => {
    props.createCompany(data);
  };


  return (
    <>
      {props.loading ? (
        <CircularProgress className="mr-30 mb-10 progress-primary" />
      ) : (
        <CompanyForm
          onSubmit={onCompanyFormSubmit}
          loading={props.loading}
          currentCompany={{}}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return { loading: state.company.loading };
};

export default connect(mapStateToProps, {
  createCompany,
})(CreateCompany);
