import React, { useState } from "react";

// reactstrap
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

// material ui
import Button from "@material-ui/core/Button";

// IntlMessages
import IntlMessages from "../../utils/IntlMessages";

// dropzone
import DropzoneComponent from "react-dropzone-component";

// XLSX
import XLSX from "xlsx";

// helpers
import { objectValuesToString } from "../../helpers/helpers";

// components
import LoaderButton from "../buttons/LoaderButton";

const MassiveUploadModal = ({
  isOpen,
  closeModal,
  saveData,
  loading,
  validationFunction,
}) => {
  const [data, setData] = useState(undefined);
  const [errorColum, setErrorColum] = useState(undefined);

  //  close modal
  const onAddUpdateAgentModalClose = () => {
    setData(undefined);
    setErrorColum(undefined);
    closeModal();
  };

  //   drop zone event
  const dropZoneEventHandlers = {
    addedfile: (file) => {
      const reader = new FileReader();
      const rABS = !!reader.readAsBinaryString;

      reader.onload = (e) => {
        /* Parse data */
        const bstr = e.target.result;
        const wb = XLSX.read(bstr, {
          type: rABS ? "binary" : "array",
          bookVBA: true,
        });
        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
        const data = XLSX.utils.sheet_to_json(ws);
        objectValuesToString(data);

        const validationResult = validationFunction(data);

        if (validationResult !== 0) {
          setErrorColum(validationResult);
          return;
        }

        setData(data);
      };

      if (rABS) {
        reader.readAsBinaryString(file);
      } else {
        reader.readAsArrayBuffer(file);
      }
    },
  };

  //   drop zone conf
  const djsConfig = {
    autoProcessQueue: false,
  };

  const componentConfig = {
    postUrl: "no-url",
  };

  return (
    <Modal isOpen={isOpen} toggle={() => onAddUpdateAgentModalClose()}>
      <ModalHeader toggle={() => onAddUpdateAgentModalClose()}>
        <IntlMessages id="tittle.imagepicker" />
      </ModalHeader>
      <ModalBody>
        {data && !errorColum && <p> {data.length} rows found. </p>}
        {errorColum && (
          <>
            <span style={{ display: "block" }}>
              <IntlMessages id="massiveUpload.errorfile" />.
            </span>
            <span style={{ marginRight: "2px" }}>
              <IntlMessages id="massiveUpload.column" />:
            </span>

            <span>{errorColum}</span>
          </>
        )}
        {!data && !errorColum && (
          <DropzoneComponent
            config={componentConfig}
            eventHandlers={dropZoneEventHandlers}
            djsConfig={djsConfig}
          />
        )}
      </ModalBody>
      <ModalFooter>
        <LoaderButton
          classNameButton="text-white btn-success"
          actionClick={() => {
            saveData(data);
            setData(undefined);
          }}
          loading={loading}
          disabled={!data}
        >
          <IntlMessages id="button.save" />
        </LoaderButton>

        <Button
          variant="contained"
          className={loading ? "" : "text-white btn-danger"}
          onClick={() => {
            setData(undefined);
            setErrorColum(undefined);
          }}
          disabled={loading}
        >
          <IntlMessages id="button.clear" />
        </Button>

        <Button
          variant="contained"
          className={loading ? "" : "text-white btn-danger"}
          onClick={() => onAddUpdateAgentModalClose()}
          disabled={loading}
        >
          <IntlMessages id="button.cancel" />
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default MassiveUploadModal;
