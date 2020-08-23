import React, { useState, useEffect } from "react";

// reactstrap
import {
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
} from "reactstrap";

// form
import { useForm, Controller } from "react-hook-form";

// material ui
import Button from "@material-ui/core/Button";
import AddBox from "@material-ui/icons/AddBox";
import DeleteIcon from "@material-ui/icons/Delete";
import SelectAllIcon from "@material-ui/icons/SelectAll";
import { DateTimePicker } from "@material-ui/pickers";

// components
import CustomerPicker from "./CustomerPicker";
import PlanogramPicker from "./PlanogramPicker";
import AgentPicker from "./AgentPicker";
import LoaderButton from "../../../components/buttons/LoaderButton";
import IntlMessages from "../../../utils/IntlMessages";

const TaskForm = (props) => {
  const { control, handleSubmit, errors, setValue } = useForm();
  const [showCustomerPickerModal, setShowCustomerPickerModal] = useState(false);
  const [showPlanogramPickerModal, setShowPlanogramPickerModal] = useState(
    false
  );
  const [showAgentPickerModal, setShowAgentPickerModal] = useState(false);

  const [agent, setAgent] = useState({});

  // close modal
  const onAddUpdateTaskModalClose = () => {
    if (props.loading) {
      return;
    }
    setAgent({});
    props.closeModal();
  };

  // submit form
  const onTaskFormSubmit = (data) => {
    let task = {
      id: props.currentTask.id ? props.currentTask.id : undefined,
      customer_id: data.customer_id.toString(),
      planogram_id: data.planogram_id.toString(),
      start_before: new Date(data.start_before).toISOString(),
      complete_before: new Date(data.complete_before).toISOString(),
      agent_id: agent.id ? agent.id.toString() : undefined,
    };
    setAgent({});
    if (props.currentTask.id) {
      props.updateTask(task);
    } else {
      props.createTask(task);
    }
  };

  useEffect(() => {
    if (props.currentTask.agentData) {
      setAgent(props.currentTask.agentData);
    }
  }, [props.currentTask]);

  return (
    <>
      {/* customer modal */}
      {showCustomerPickerModal && (
        <CustomerPicker
          isOpen={showCustomerPickerModal}
          closeModal={() => {
            setShowCustomerPickerModal(false);
          }}
          onSelectCustomer={(customer) => {
            let customerInfo = `${customer.name}`;

            setValue("customer_id", customer.id, {
              shouldValidate: true,
              shouldDirty: true,
            });
            setValue("customerinfo", customerInfo, {
              shouldValidate: true,
              shouldDirty: true,
            });
          }}
        />
      )}
      {/* planogram modal */}
      {showPlanogramPickerModal && (
        <PlanogramPicker
          isOpen={showPlanogramPickerModal}
          closeModal={() => {
            setShowPlanogramPickerModal(false);
          }}
          onSelectPlanogram={(planogram) => {
            let planogramInfo = `${planogram.name}`;

            setValue("planogram_id", planogram.id, {
              shouldValidate: true,
              shouldDirty: true,
            });
            setValue("planograminfo", planogramInfo, {
              shouldValidate: true,
              shouldDirty: true,
            });
          }}
        />
      )}

      {/* agent modal */}
      {showAgentPickerModal && (
        <AgentPicker
          isOpen={showAgentPickerModal}
          closeModal={() => {
            setShowAgentPickerModal(false);
          }}
          onSelectAgent={(agent) => {
            setValue("agent_id", agent.id, {
              shouldValidate: true,
              shouldDirty: true,
            });
            setAgent(agent);
          }}
        />
      )}

      <Modal isOpen={props.isOpen} toggle={() => onAddUpdateTaskModalClose()}>
        <ModalHeader toggle={() => onAddUpdateTaskModalClose()}>
          {props.currentTask.id ? (
            <IntlMessages id="task.update" />
          ) : (
            <IntlMessages id="task.new" />
          )}
        </ModalHeader>
        <ModalBody>
          <Form
            onSubmit={handleSubmit(onTaskFormSubmit)}
            style={{ padding: "15px" }}
          >
            <div className="row">
              <div className="col-md-12 col-xs-12">
                <FormGroup row>
                  <Label for="userName">
                    <IntlMessages id="form.customer" />
                  </Label>
                  <InputGroup>
                    <Controller
                      as={Input}
                      type="text"
                      name="customerinfo"
                      control={control}
                      defaultValue={props.currentTask.customer || ""}
                      disabled={true}
                    />
                    <InputGroupAddon addonType="append">
                      <Button
                        className="text-white btn-secondary"
                        startIcon={<AddBox />}
                        onClick={() => {
                          setShowCustomerPickerModal(true);
                        }}
                      >
                        <IntlMessages id="button.select" />
                      </Button>
                    </InputGroupAddon>
                  </InputGroup>
                  <Controller
                    as={Input}
                    type="hidden"
                    name="customer_id"
                    control={control}
                    defaultValue={props.currentTask.customer_id || ""}
                    rules={{
                      required: (
                        <IntlMessages id="validationmessage.required" />
                      ),
                    }}
                  />
                  {errors.customer_id && (
                    <Alert color="danger" style={{ width: "100%" }}>
                      {errors.customer_id.message}
                    </Alert>
                  )}
                </FormGroup>
                <FormGroup row>
                  <Label for="planogram">
                    <IntlMessages id="form.planogram" />
                  </Label>
                  <InputGroup>
                    <Controller
                      as={Input}
                      type="text"
                      name="planograminfo"
                      control={control}
                      defaultValue={props.currentTask.planogram || ""}
                      disabled={true}
                    />
                    <InputGroupAddon addonType="append">
                      <Button
                        className="text-white btn-secondary"
                        startIcon={<AddBox />}
                        onClick={() => {
                          setShowPlanogramPickerModal(true);
                        }}
                      >
                        <IntlMessages id="button.select" />
                      </Button>
                    </InputGroupAddon>
                  </InputGroup>
                  <Controller
                    as={Input}
                    type="hidden"
                    name="planogram_id"
                    control={control}
                    defaultValue={props.currentTask.planogram_id || ""}
                    rules={{
                      required: (
                        <IntlMessages id="validationmessage.required" />
                      ),
                    }}
                  />
                  {errors.planogram_id && (
                    <Alert color="danger" style={{ width: "100%" }}>
                      {errors.planogram_id.message}
                    </Alert>
                  )}
                </FormGroup>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 col-xs-12">
                <Controller
                  as={DateTimePicker}
                  clearable
                  label={<IntlMessages id="form.startbefore" />}
                  name="start_before"
                  leftArrowIcon={<i className="zmdi zmdi-arrow-back" />}
                  rightArrowIcon={<i className="zmdi zmdi-arrow-forward" />}
                  control={control}
                  defaultValue={props.currentTask.start_before || new Date()}
                  rules={{
                    required: <IntlMessages id="validationmessage.required" />,
                  }}
                  fullWidth
                />
                {errors.start_before && (
                  <Alert color="danger" style={{ width: "100%" }}>
                    {errors.start_before.message}
                  </Alert>
                )}
              </div>
              <div className="col-md-6 col-xs-12">
                <Controller
                  as={DateTimePicker}
                  clearable
                  label={<IntlMessages id="form.completebefore" />}
                  name="complete_before"
                  leftArrowIcon={<i className="zmdi zmdi-arrow-back" />}
                  rightArrowIcon={<i className="zmdi zmdi-arrow-forward" />}
                  control={control}
                  defaultValue={props.currentTask.complete_before || new Date()}
                  rules={{
                    required: <IntlMessages id="validationmessage.required" />,
                  }}
                  fullWidth
                />
                {errors.complete_before && (
                  <Alert color="danger" style={{ width: "100%" }}>
                    {errors.complete_before.message}
                  </Alert>
                )}
              </div>
            </div>
            <div className="row mt-30">
              <div className="col-md-12 col-xs-12">
                <div className="card" style={{ padding: "20px" }}>
                  <div className="media">
                    <div className="media-left mr-25">
                      {agent.id && (
                        <img
                          src={agent.image}
                          style={{ borderRadius: "5px" }}
                          className="img-fluid"
                          alt="user profile"
                          width="90"
                          height="90"
                        />
                      )}
                    </div>
                    <div className="media-body pt-10">
                      <h4 className="mb-5">
                        {agent.id && (
                          <>
                            {agent.first_name} , {agent.last_name}
                          </>
                        )}
                        {!agent.id && <IntlMessages id="form.agent" />}
                      </h4>
                      {agent.id && (
                        <>
                          <span className="text-muted fs-14 d-block">
                            {agent.mobile_number}
                          </span>
                        </>
                      )}
                      <Button
                        variant="contained"
                        className="btn-primary text-white btn-icon mr-10 mb-10"
                        endIcon={<SelectAllIcon />}
                        onClick={() => {
                          setShowAgentPickerModal(true);
                        }}
                      >
                        <IntlMessages id="button.select" />
                      </Button>
                      {agent.id && (
                        <Button
                          variant="contained"
                          className="btn-warning text-white btn-icon mr-10 mb-10"
                          endIcon={<DeleteIcon />}
                          onClick={() => {
                            setAgent({});
                          }}
                        >
                          <IntlMessages id="button.remove" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        </ModalBody>
        <ModalFooter>
          <LoaderButton
            classNameButton="text-white btn-success"
            actionClick={handleSubmit(onTaskFormSubmit)}
            loading={props.loading}
          >
            {props.currentTask.id ? (
              <IntlMessages id="button.save" />
            ) : (
              <IntlMessages id="button.add" />
            )}
          </LoaderButton>

          <Button
            variant="contained"
            className={props.loading ? "" : "text-white btn-danger"}
            onClick={() => onAddUpdateTaskModalClose()}
            disabled={props.loading}
          >
            <IntlMessages id="button.cancel" />
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default TaskForm;
