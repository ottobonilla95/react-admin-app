import React, { useEffect } from "react";

// redux
import { connect } from "react-redux";

// actions
import { updateCompany, getCompany } from "../../../redux/company/actions";

// components
import CompanyForm from "./CompanyForm";

// CircularProgress
import CircularProgress from "@material-ui/core/CircularProgress";

const UpdateCompany = (props) => {
  // submit form
  const onCompanyFormSubmit = (data) => {
    props.updateCompany(data);
  };

  useEffect(() => {
    const params = new URLSearchParams(props.location.search);
    const id = params.get("id");
    props.getCompany(id);
  }, []);

  return (
    <>
      {props.loading ? (
        <CircularProgress className="mr-30 mb-10 progress-primary" />
      ) : (
        <CompanyForm
          onSubmit={onCompanyFormSubmit}
          loading={props.loading}
          currentCompany={props.currentCompany || {}}
        />
      )}
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  const params = new URLSearchParams(ownProps.location.search);
  const id = params.get("id");

  let currentCompany = state.company.data.items.find((company) => {
    if (company.id === +id) {
      return true;
    }
  });

  return { loading: state.company.loading, currentCompany: currentCompany };
};

export default connect(mapStateToProps, {
  updateCompany,
  getCompany,
})(UpdateCompany);
