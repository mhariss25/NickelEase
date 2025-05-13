import React, { useState } from "react";
import {
  Panel,
  Table,
  Pagination,
  InputGroup,
  Input,
  Stack,
  IconButton,
  Button,
  Modal,
  Form,
  SelectPicker,
  Loader,
  InputNumber,
  DatePicker,
} from "rsuite";
import { Trash as TrashIcon, Reload as ReloadIcon } from "@rsuite/icons";
import CloseOutlineIcon from "@rsuite/icons/CloseOutline";
import SearchIcon from "@rsuite/icons/Search";
import PlusRoundIcon from "@rsuite/icons/PlusRound";
import EditIcon from "@rsuite/icons/Edit";
import ApiVehicleBooking from "@/pages/api/vehicle_booking/api_vehicle_booking";

export default function DashboardTableComponent({ dataV, getAll }) {

  const { HeaderCell, Cell, Column } = Table;
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortColumn, setSortColumn] = useState("vehicle_id");
  const [sortType, setSortType] = useState("asc");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const emptyAddVehicleForm = {
    vehicle_type: null,
    brand: null,
    model: null,
    registration_number: null,
    fuel_consumption: null,
    service_schedule: null,
  };

  const emptyEditVehicleForm = {
    vehicle_type: null,
    brand: null,
    model: null,
    registration_number: null,
    fuel_consumption: null,
    service_schedule: null,
    vehicle_id: null,
  };

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [addVehicleForm, setAddVehicleForm] = useState(emptyAddVehicleForm);
  const [editVehicleForm, setEditVehicleForm] = useState(emptyEditVehicleForm);
  const [errorsAddForm, setErrorsAddForm] = useState({});
  const [errorsEditForm, setErrorsEditForm] = useState({});

  const handleSearch = (value) => {
    setSearchKeyword(value);
    setPage(1);
  };

  const handleChangeLimit = (dataKey) => {
    setPage(1);
    setLimit(dataKey);
  };

  const handleSortColumn = (sortColumn, sortType) => {
    setTimeout(() => {
      setSortColumn(sortColumn);
      setSortType(sortType);
    }, 500);
  };

  const filteredData = dataV.filter((rowData) => {
    const searchFields = ["vehicles_id", "vehicles_type", "brand"];
    const matchesSearch = searchFields.some((field) =>
      rowData[field]?.toString().toLowerCase().includes(searchKeyword.toLowerCase())
    );
    return matchesSearch;
  });

  const getPaginatedData = (filteredData, limit, page) => {
    const start = limit * (page - 1);
    const end = start + limit;
    return filteredData.slice(start, end);
  };

  const getFilteredData = () => {
    if (sortColumn && sortType) {
      return filteredData.sort((a, b) => {
        let x = a[sortColumn];
        let y = b[sortColumn];
        if (typeof x === "string") {
          x = x.charCodeAt();
        }
        if (typeof y === "string") {
          y = y.charCodeAt();
        }
        if (sortType === "asc") {
          return x - y;
        } else {
          return y - x;
        }
      });
    }
    return filteredData;
  };

  const totalRowCount = searchKeyword ? filteredData.length : dataV.length;

  const HandleAddVehicle = async () => {
    const errors = {};
    if (!addVehicleForm.vehicle_type) {
      errors.vehicle_type = "Vehicle Type is Mandatory!";
    }

    if (!addVehicleForm.brand) {
      errors.brand = "Brand is Mandatory!";
    }

    if (!addVehicleForm.fuel_consumption) {
      errors.fuel_consumption = "Fuel Consumption is Mandatory!";
    }

    if (!addVehicleForm.model) {
      errors.model = "Model is Mandatory!";
    }

    if (!addVehicleForm.registration_number) {
      errors.registration_number = "Registration Number is Mandatory!";
    }

    if (!addVehicleForm.service_schedule) {
      errors.service_schedule = "Service Schedule is Mandatory!";
    }

    if (Object.keys(errors).length > 0) {
      setErrorsAddForm(errors);
      return;
    }

    setLoading(true);
    try {
      const res = await ApiVehicleBooking().createVehicle({
        ...addVehicleForm,
        fuel_consumption: parseFloat(addVehicleForm.fuel_consumption),
      });

      if (res.status === 201) {
        setAddVehicleForm(emptyAddVehicleForm);
        setShowAddModal(false);
        getAll();
      } else {
        console.log("Error on AddVehicle: ", res.message);
      }
    } catch (error) {
      console.log("Error on AddVehicle: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  const HandleEditVehicle = async () => {
    const errors = {};

    if (Object.keys(errors).length > 0) {
      setErrorsAddForm(errors);
      return;
    }

    try {
      const res = await ApiVehicleBooking().updateVehicle({
        ...editVehicleForm,
        fuel_consumption: parseFloat(editVehicleForm.fuel_consumption),
      });

      if (res.status === 200) {
        setShowEditModal(false);
        setEditVehicleForm(emptyEditVehicleForm);
        getAll();
      } else {
        console.log("Error on EditVehicle: ", res.message);
      }
    } catch (error) {
      console.log("Error on EditVehicle: ", error.message);
    }
  };

  const HandleEditStatusVehicle = async (vehicle_id, is_active) => {
    try {
      const res = await ApiVehicleBooking().updateStatusVehicle({
        vehicle_id,
        is_active,
      });

      if (res.status === 200) {
        getAll();
      } else {
        console.log("Error on update status: ", res.message);
      }
    } catch (error) {
      console.log("Error on update status: ", error.message);
    }
  };

  return (
    <div>
      <Panel
        bordered
        bodyFill
        header={
          <Stack justifyContent="space-between">
            <div className="flex gap-2">
              <IconButton
                icon={<PlusRoundIcon />}
                appearance="primary"
                onClick={() => {
                  setShowAddModal(true);
                }}
              >
                Add
              </IconButton>
            </div>
            <InputGroup inside>
              <InputGroup.Addon>
                <SearchIcon />
              </InputGroup.Addon>
              <Input placeholder="search" value={searchKeyword} onChange={handleSearch} />
              <InputGroup.Addon
                onClick={() => {
                  setSearchKeyword("");
                  setPage(1);
                }}
                style={{
                  display: searchKeyword ? "block" : "none",
                  color: "red",
                  cursor: "pointer",
                }}
              >
                <CloseOutlineIcon />
              </InputGroup.Addon>
            </InputGroup>
          </Stack>
        }
      >
        <Table
          bordered
          cellBordered
          height={400}
          data={getPaginatedData(getFilteredData(), limit, page)}
          sortColumn={sortColumn}
          sortType={sortType}
          onSortColumn={handleSortColumn}
          autoHeight
        >
          <Column width={120} align="center" sortable fullText resizable>
            <HeaderCell>Vehicle ID</HeaderCell>
            <Cell dataKey="vehicle_id" />
          </Column>
          <Column width={150} sortable fullText resizable>
            <HeaderCell align="center">Vehicle Type</HeaderCell>
            <Cell dataKey="vehicle_type" />
          </Column>
          <Column width={150} sortable fullText resizable>
            <HeaderCell align="center">Brand</HeaderCell>
            <Cell dataKey="brand" />
          </Column>
          <Column width={150} sortable fullText resizable>
            <HeaderCell align="center">Model</HeaderCell>
            <Cell dataKey="model" />
          </Column>
          <Column width={150} sortable fullText resizable>
            <HeaderCell align="center">Regristation Number</HeaderCell>
            <Cell dataKey="registration_number" />
          </Column>
          <Column width={150} sortable fullText resizable>
            <HeaderCell align="center">Fuel Consumption</HeaderCell>
            <Cell dataKey="fuel_consumption" />
          </Column>
          <Column width={150} sortable resizable align="center" fullText>
            <HeaderCell>Service Schedule</HeaderCell>
            <Cell>{(rowData) => new Date(rowData.service_schedule).toLocaleDateString("en-GB")}</Cell>
          </Column>
          <Column width={150} sortable resizable align="center" fullText>
            <HeaderCell>Created Date</HeaderCell>
            <Cell>{(rowData) => new Date(rowData.created_at).toLocaleDateString("en-GB")}</Cell>
          </Column>
          <Column width={120} fixed="right" align="center">
            <HeaderCell>Action</HeaderCell>
            <Cell style={{ padding: "8px" }}>
              {(rowData) => (
                <div style={{ display: "flex", gap: 4 }}>
                  <Button
                    appearance="ghost"
                    disabled={rowData.is_active === 0}
                    onClick={() => {
                      setShowEditModal(true);
                      setEditVehicleForm({
                        ...editVehicleForm,
                        vehicle_type: rowData.vehicle_type,
                        brand: rowData.brand,
                        model: rowData.model,
                        registration_number: rowData.registration_number,
                        fuel_consumption: rowData.fuel_consumption,
                        service_schedule: rowData.service_schedule,
                        created_at: rowData.created_at,
                        vehicle_id: rowData.vehicle_id,
                      });
                    }}
                  >
                    <EditIcon />
                  </Button>
                  <Button appearance="ghost" onClick={() => HandleEditStatusVehicle(rowData.vehicle_id, rowData.is_active)}>
                    {rowData.is_active === 1 ? <TrashIcon style={{ fontSize: "16px" }} /> : <ReloadIcon style={{ fontSize: "16px" }} />}
                  </Button>
                </div>
              )}
            </Cell>
          </Column>
        </Table>
        <div style={{ padding: 20 }}>
          <Pagination
            prev
            next
            first
            last
            ellipsis
            boundaryLinks
            maxButtons={5}
            size="xs"
            layout={["total", "-", "limit", "|", "pager", "skip"]}
            limitOptions={[10, 30, 50]}
            total={totalRowCount}
            limit={limit}
            activePage={page}
            onChangePage={setPage}
            onChangeLimit={handleChangeLimit}
          />
        </div>
      </Panel>
      <Modal
        backdrop="static"
        open={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setAddVehicleForm(emptyAddVehicleForm);
          setErrorsAddForm({});
        }}
        overflow={false}
      >
        <Modal.Header>
          <Modal.Title>Add Vehicle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form fluid>
            <Form.Group>
              <Form.ControlLabel>Vehicle Type</Form.ControlLabel>
              <SelectPicker
                name="vehicle_type"
                value={addVehicleForm.vehicle_type}
                onChange={(value) => {
                  setAddVehicleForm((prevFormValue) => ({
                    ...prevFormValue,
                    vehicle_type: value,
                  }));
                  setErrorsAddForm((prevErrors) => ({
                    ...prevErrors,
                    vehicle_type: undefined,
                  }));
                }}
                data={[
                  { label: "Passenger", value: "passenger" },
                  { label: "Cargo", value: "cargo" },
                ]}
                placeholder="Select Vehicle Type"
                style={{ width: "100%" }}
              />
              {errorsAddForm.vehicle_type && <p style={{ color: "red" }}>{errorsAddForm.vehicle_type}</p>}
            </Form.Group>
          </Form>
          <Form fluid>
            <Form.Group>
              <Form.ControlLabel>Brand</Form.ControlLabel>
              <Form.Control
                name="brand"
                value={addVehicleForm.brand}
                onChange={(value) => {
                  setAddVehicleForm((prevFormValue) => ({
                    ...prevFormValue,
                    brand: value,
                  }));
                  setErrorsAddForm((prevErrors) => ({
                    ...prevErrors,
                    brand: undefined,
                  }));
                }}
              />
              {errorsAddForm.brand && <p style={{ color: "red" }}>{errorsAddForm.brand}</p>}
            </Form.Group>
          </Form>
          <Form fluid>
            <Form.Group>
              <Form.ControlLabel>Model</Form.ControlLabel>
              <Form.Control
                name="Model"
                value={addVehicleForm.model}
                onChange={(value) => {
                  setAddVehicleForm((prevFormValue) => ({
                    ...prevFormValue,
                    model: value,
                  }));
                  setErrorsAddForm((prevErrors) => ({
                    ...prevErrors,
                    model: undefined,
                  }));
                }}
              />
              {errorsAddForm.model && <p style={{ color: "red" }}>{errorsAddForm.model}</p>}
            </Form.Group>
          </Form>
          <Form fluid>
            <Form.Group>
              <Form.ControlLabel>Registration Number</Form.ControlLabel>
              <Form.Control
                name="registration_number"
                value={addVehicleForm.registration_number}
                onChange={(value) => {
                  setAddVehicleForm((prevFormValue) => ({
                    ...prevFormValue,
                    registration_number: value,
                  }));
                  setErrorsAddForm((prevErrors) => ({
                    ...prevErrors,
                    registration_number: undefined,
                  }));
                }}
              />
              {errorsAddForm.registration_number && <p style={{ color: "red" }}>{errorsAddForm.registration_number}</p>}
            </Form.Group>
          </Form>
          <Form fluid>
            <Form.Group>
              <Form.ControlLabel>Fuel Consumption</Form.ControlLabel>
              <InputNumber
                name="fuel_consumption"
                value={addVehicleForm.fuel_consumption}
                onChange={(value) => {
                  setAddVehicleForm((prevFormValue) => ({
                    ...prevFormValue,
                    fuel_consumption: value,
                  }));
                  setErrorsAddForm((prevErrors) => ({
                    ...prevErrors,
                    fuel_consumption: undefined,
                  }));
                }}
                min={0}
                step={0.1}
                style={{ width: "100%" }}
              />
              {errorsAddForm.fuel_consumption && (
                <p style={{ color: "red" }}>{errorsAddForm.fuel_consumption}</p>
              )}
            </Form.Group>
          </Form>
          <Form fluid>
            <Form.Group>
              <Form.ControlLabel>Service Schedule</Form.ControlLabel>
              <DatePicker
                name="service_schedule"
                value={addVehicleForm.service_schedule ? new Date(addVehicleForm.service_schedule) : null}
                onChange={(value) => {
                  const formattedDate = value ? value.toISOString().split('T')[0] : null;
                  setAddVehicleForm((prevFormValue) => ({
                    ...prevFormValue,
                    service_schedule: formattedDate,
                  }));
                  setErrorsAddForm((prevErrors) => ({
                    ...prevErrors,
                    service_schedule: undefined,
                  }));
                }}
                style={{ width: "100%" }}
              />
              {errorsAddForm.service_schedule && (
                <p style={{ color: "red" }}>{errorsAddForm.service_schedule}</p>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              setShowAddModal(false);
              setAddVehicleForm(emptyAddVehicleForm);
              setErrorsAddForm({});
            }}
            appearance="subtle"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              HandleAddVehicle();
            }}
            appearance="primary"
            type="submit"
            loading={loading}
            disabled={loading}
          >
            Add
          </Button>
          {loading && <Loader backdrop size="md" vertical content="Adding Data..." active={loading} />}
        </Modal.Footer>
      </Modal>
      <Modal
        backdrop="static"
        open={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setEditVehicleForm(emptyEditVehicleForm);
          setErrorsEditForm({});
        }}
        overflow={false}
      >
        <Modal.Header>
          <Modal.Title>Edit Vehicle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form fluid>
            <Form.Group>
              <Form.ControlLabel>Vehicle Type</Form.ControlLabel>
              <SelectPicker
                name="vehicle_type"
                value={editVehicleForm.vehicle_type}
                onChange={(value) => {
                  setEditVehicleForm((prevFormValue) => ({
                    ...prevFormValue,
                    vehicle_type: value,
                  }));
                  setErrorsEditForm((prevErrors) => ({
                    ...prevErrors,
                    vehicle_type: undefined,
                  }));
                }}
                data={[
                  { label: "Passenger", value: "passenger" },
                  { label: "Cargo", value: "cargo" },
                ]}
                placeholder="Select Vehicle Type"
                style={{ width: "100%" }}
              />
              {errorsEditForm.vehicle_type && <p style={{ color: "red" }}>{errorsEditForm.vehicle_type}</p>}
            </Form.Group>
          </Form>
          <Form fluid>
            <Form.Group>
              <Form.ControlLabel>Brand</Form.ControlLabel>
              <Form.Control
                name="brand"
                value={editVehicleForm.brand}
                onChange={(value) => {
                  setEditVehicleForm((prevFormValue) => ({
                    ...prevFormValue,
                    brand: value,
                  }));
                  setErrorsEditForm((prevErrors) => ({
                    ...prevErrors,
                    brand: undefined,
                  }));
                }}
              />
              {errorsEditForm.brand && <p style={{ color: "red" }}>{errorsEditForm.brand}</p>}
            </Form.Group>
          </Form>
          <Form fluid>
            <Form.Group>
              <Form.ControlLabel>Model</Form.ControlLabel>
              <Form.Control
                name="Model"
                value={editVehicleForm.model}
                onChange={(value) => {
                  setEditVehicleForm((prevFormValue) => ({
                    ...prevFormValue,
                    model: value,
                  }));
                  setErrorsEditForm((prevErrors) => ({
                    ...prevErrors,
                    model: undefined,
                  }));
                }}
              />
              {errorsEditForm.model && <p style={{ color: "red" }}>{errorsEditForm.model}</p>}
            </Form.Group>
          </Form>
          <Form fluid>
            <Form.Group>
              <Form.ControlLabel>Registration Number</Form.ControlLabel>
              <Form.Control
                name="registration_number"
                value={editVehicleForm.registration_number}
                onChange={(value) => {
                  setEditVehicleForm((prevFormValue) => ({
                    ...prevFormValue,
                    registration_number: value,
                  }));
                  setErrorsEditForm((prevErrors) => ({
                    ...prevErrors,
                    registration_number: undefined,
                  }));
                }}
              />
              {errorsEditForm.registration_number && <p style={{ color: "red" }}>{errorsEditForm.registration_number}</p>}
            </Form.Group>
          </Form>
          <Form fluid>
            <Form.Group>
              <Form.ControlLabel>Fuel Consumption</Form.ControlLabel>
              <InputNumber
                name="fuel_consumption"
                value={editVehicleForm.fuel_consumption}
                onChange={(value) => {
                  setEditVehicleForm((prevFormValue) => ({
                    ...prevFormValue,
                    fuel_consumption: value,
                  }));
                  setErrorsEditForm((prevErrors) => ({
                    ...prevErrors,
                    fuel_consumption: undefined,
                  }));
                }}
                min={0}
                step={0.1}
                style={{ width: "100%" }}
              />
              {errorsEditForm.fuel_consumption && (
                <p style={{ color: "red" }}>{errorsEditForm.fuel_consumption}</p>
              )}
            </Form.Group>
          </Form>
          <Form fluid>
            <Form.Group>
              <Form.ControlLabel>Service Schedule</Form.ControlLabel>
              <DatePicker
                name="service_schedule"
                value={editVehicleForm.service_schedule ? new Date(editVehicleForm.service_schedule) : null}  // Ensure it's a valid Date object
                onChange={(value) => {
                  // If value is null, reset it to null, otherwise ensure the date is properly formatted
                  const formattedDate = value ? value.toISOString().split('T')[0] : null;
                  setEditVehicleForm((prevFormValue) => ({
                    ...prevFormValue,
                    service_schedule: formattedDate,
                  }));
                  setErrorsEditForm((prevErrors) => ({
                    ...prevErrors,
                    service_schedule: undefined,
                  }));
                }}
                style={{ width: "100%" }}
              />
              {errorsEditForm.service_schedule && (
                <p style={{ color: "red" }}>{errorsEditForm.service_schedule}</p>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              setShowEditModal(false);
              setEditVehicleForm(emptyEditVehicleForm);
              setErrorsEditForm({});
            }}
            appearance="subtle"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              HandleEditVehicle();
            }}
            appearance="primary"
            type="submit"
          >
            Save
          </Button>
          {loading && <Loader backdrop size="md" vertical content="Editing Data..." active={loading} />}
        </Modal.Footer>
      </Modal>
    </div>
  );
}
