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

import ImageViewerModal from "../../../components/common/ImageViewerModal";
import { tableImage } from "../app-styles";

import { connect } from "react-redux";
import MassiveUploadModal from "../../../components/common/MassiveUploadModal";

import ProductModalForm from "./ProductModalForm";
import {
  createProduct,
  createProducts,
  updateProduct,
  deleteProducts,
  getProducts,
  openModalFrom,
  closeModalFrom,
  openDeleteDialog,
  closeDeleteDialog,
  openMassiveModal,
  closeMassiveModal,
} from "../../../redux/product/actions";

import LinearProgress from "@material-ui/core/LinearProgress";

// helpers
import { getTableColums } from "../../../helpers/helpers";
import { validateMassiveProducts } from "../../../helpers/validators";

// product image
import ProductImage from "../../../assets/img/product.png";

const Product = (props) => {
  const { match } = props;

  const [editProduct, setEditProduct] = useState({});
  const [itemsToDelete, setItemsToDelete] = useState([]);
  const [image, setImage] = useState(undefined);

  const seeFullImage = (image) => {
    setImage(image);
  };

  //table options
  const options = {
    filterType: "dropdown",
    responsive: "stacked",
    // page: props.product.data.pagination.currentPage,
    // rowsPerPage: props.product.data.pagination.itemsPerPage,
    onRowsDelete: (rowsDeleted, newTableData) => {
      let ids = [];
      rowsDeleted.data.forEach((rowDeleted) => {
        ids.push(props.product.data.items[rowDeleted.dataIndex].id);
      });
      setItemsToDelete(ids);
      props.openDeleteDialog();
      return false;
    },
  };

  const columns = getTableColums(props.product.data.items, []);

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
                const image =
                  props.product.data.items[tableMeta.rowIndex].image;
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

                return <img src={ProductImage} style={tableImage} />;
              },
            },
          },

          {
            name: "name",
            label: <IntlMessages id="form.name" />,
          },
          {
            name: "upc",
            label: <IntlMessages id="form.upc" />,
          },
          {
            name: "brand",
            label: <IntlMessages id="form.brand" />,
          },
          {
            name: "sub_brand",
            label: <IntlMessages id="form.subbrand" />,
          },
          {
            name: "category",
            label: <IntlMessages id="form.category" />,
          },
          {
            name: "sub_category",
            label: <IntlMessages id="form.subcategory" />,
          },
          {
            name: "container",
            label: <IntlMessages id="form.container" />,
          },
          {
            name: "volume",
            label: <IntlMessages id="form.volume" />,
          },
          {
            name: "width_size",
            label: <IntlMessages id="form.widthsize" />,
          },
          {
            name: "height_size",
            label: <IntlMessages id="form.heightsize" />,
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
                      setProductToEdit(tableMeta.rowData[0]);
                    }}
                  />
                );
              },
            },
          },
        ]
      : [];
  // open form modal
  const openProductModal = () => {
    setEditProduct({});
    props.openModalFrom();
  };

  // close form modal
  const closeModal = () => {
    props.closeModalFrom();
  };

  // set item to edit
  const setProductToEdit = (id) => {
    let productToEdit = props.product.data.items.find((product) => {
      if (product.id === id) {
        return true;
      }
    });
    setEditProduct(productToEdit);
    props.openModalFrom();
  };

  // submit form
  const submitProductForm = (data) => {
    if (editProduct.id) {
      props.updateProduct({ ...data, id: editProduct.id });
    } else {
      props.createProduct(data);
    }
  };

  const deleteItems = () => {
    props.deleteProducts(itemsToDelete);
  };
  // load items
  useEffect(() => {
    props.getProducts();
  }, []);

  return (
    <div className="data-table-wrapper">
      <PageTitleBar
        title={<IntlMessages id="sidebar.product" />}
        match={props.match}
      />

      <RctCollapsibleCard fullBlock>
        {props.product.loading && <LinearProgress />}
        <MUIDataTable
          title={
            props.product.loading === false && (
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
                    onClick={openProductModal}
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
          data={props.product.data.items}
          columns={finalColumns}
          options={options}
        />
      </RctCollapsibleCard>
      <ProductModalForm
        isOpen={props.product.isProductModalFormOpen}
        closeModal={closeModal}
        product={editProduct}
        submitProductForm={submitProductForm}
        loading={props.product.loading}
      />
      <ConfirmDialogSlide
        message={<IntlMessages id="message.confirmDelete" />}
        tittle={<IntlMessages id="tittle.delete" />}
        isOpen={props.product.isDeleteDialogOpen}
        closeDialog={() => {
          props.closeDeleteDialog();
        }}
        onAcept={deleteItems}
        loading={props.product.loading}
      />
      <ImageViewerModal
        image={image}
        closeModal={() => {
          setImage(undefined);
        }}
      />
      <MassiveUploadModal
        isOpen={props.product.isMassiveModalFormOpen}
        saveData={props.createProducts}
        validationFunction={validateMassiveProducts}
        closeModal={props.closeMassiveModal}
        loading={props.product.loading}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return { product: state.product };
};
const mapDispatchToProps = (dispatch) => {
  return {
    createProduct: (productData, addToArray) =>
      dispatch(createProduct(productData, addToArray)),
    createProducts: (products) => dispatch(createProducts(products)),
    updateProduct: (productData) => dispatch(updateProduct(productData)),
    deleteProducts: (ids) => dispatch(deleteProducts(ids)),
    getProducts: () => dispatch(getProducts()),
    openModalFrom: () => dispatch(openModalFrom()),
    closeModalFrom: () => dispatch(closeModalFrom()),
    openDeleteDialog: () => dispatch(openDeleteDialog()),
    closeDeleteDialog: () => dispatch(closeDeleteDialog()),
    openMassiveModal: () => dispatch(openMassiveModal()),
    closeMassiveModal: () => dispatch(closeMassiveModal()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Product)
);
