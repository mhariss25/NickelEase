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
  Loader,
  InputNumber,
  DatePicker,
  SelectPicker
} from "rsuite";
import { Trash as TrashIcon, Reload as ReloadIcon } from "@rsuite/icons";
import CloseOutlineIcon from "@rsuite/icons/CloseOutline";
import SearchIcon from "@rsuite/icons/Search";
import PlusRoundIcon from "@rsuite/icons/PlusRound";
import EditIcon from "@rsuite/icons/Edit";
import ApiVehicleBooking from "@/pages/api/vehicle_booking/api_vehicle_booking";

export default function DashboardTableComponent({ dataB, dataV, dataU, getAll }) {

  const { HeaderCell, Cell, Column } = Table;
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortColumn, setSortColumn] = useState("booking_id");
  const [sortType, setSortType] = useState("asc");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const emptyAddVehicleForm = {
    vehicle_id: null,
    user_id: null,
    start_date: null,
    end_date: null,
    purpose: null,
    status: null,
    approver_id: null,
  };

  const emptyEditVehicleForm = {
    vehicle_id: null,
    user_id: null,
    start_date: null,
    end_date: null,
    purpose: null,
    status: null,
    approver_id: null,
    booking_id: null,
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

  const filteredData = dataB.filter((rowData) => {
    const searchFields = ["booking_id", "vehicles_id", "user_id"];
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

  const totalRowCount = searchKeyword ? filteredData.length : dataB.length;

  const HandleAddBooking = async () => {
    const errors = {};
    if (!addVehicleForm.vehicle_id) {
      errors.vehicle_id = "Vehicle ID is Mandatory!";
    }

    if (!addVehicleForm.user_id) {
      errors.user_id = "User ID is Mandatory!";
    }

    if (!addVehicleForm.approver_id) {
      errors.approver_id = "Approver ID is Mandatory!";
    }

    if (!addVehicleForm.purpose) {
      errors.purpose = "Purpose is Mandatory!";
    }

    if (!addVehicleForm.start_date) {
      errors.start_date = "Start Date is Mandatory!";
    }

    if (!addVehicleForm.end_date) {
      errors.end_date = "End Date is Mandatory!";
    }

    if (addVehicleForm.start_date && addVehicleForm.end_date) {
      const startDate = new Date(addVehicleForm.start_date);
      const endDate = new Date(addVehicleForm.end_date);

      if (startDate > endDate) {
        errors.start_date = "Start Date cannot be later than End Date!";
      }
    }

    if (Object.keys(errors).length > 0) {
      setErrorsAddForm(errors);
      return;
    }

    setLoading(true);
    try {
      const res = await ApiVehicleBooking().createBooking({
        ...addVehicleForm,
        status: "pending",
      });

      if (res.status === 201) {
        setAddVehicleForm(emptyAddVehicleForm);
        setShowAddModal(false);
        getAll();
      } else {
        console.log("Error on AddVehicleBooking: ", res.message);
      }
    } catch (error) {
      console.log("Error on AddVehicleBooking: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  const HandleEditBooking = async () => {
    const errors = {};

    if (editVehicleForm.start_date && editVehicleForm.end_date) {
      const startDate = new Date(editVehicleForm.start_date);
      const endDate = new Date(editVehicleForm.end_date);

      if (startDate > endDate) {
        errors.start_date = "Start Date cannot be later than End Date!";
      }
    }

    if (Object.keys(errors).length > 0) {
      seterrorsEditForm(errors);
      return;
    }

    try {
      const res = await ApiVehicleBooking().updateBooking({
        ...editVehicleForm,
      });

      if (res.status === 200) {
        setShowEditModal(false);
        setEditVehicleForm(emptyEditVehicleForm);
        getAll();
      } else {
        console.log("Error on EditBooking: ", res.message);
      }
    } catch (error) {
      console.log("Error on EditBooking: ", error.message);
    }
  };

  const HandleEditStatusBooking = async (booking_id, is_active) => {
    try {
      const res = await ApiVehicleBooking().updateStatusBooking({
        booking_id,
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
        style={{ margin: 10 }}
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
            <HeaderCell>Booking ID</HeaderCell>
            <Cell dataKey="booking_id" />
          </Column>
          <Column width={120} align="center" sortable fullText resizable>
            <HeaderCell align="center">Registration Number</HeaderCell>
            <Cell dataKey="registration_number" />
          </Column>
          <Column width={120} align="center" sortable fullText resizable>
            <HeaderCell align="center">Username</HeaderCell>
            <Cell dataKey="username" />
          </Column>
          <Column width={120} align="center" sortable fullText resizable>
            <HeaderCell align="center">Approver Name</HeaderCell>
            <Cell dataKey="approver_name" />
          </Column>
          <Column width={210} sortable fullText resizable>
            <HeaderCell align="center">Purpose</HeaderCell>
            <Cell dataKey="purpose" />
          </Column>
          <Column width={120} sortable fullText resizable>
            <HeaderCell align="center">Status</HeaderCell>
            <Cell dataKey="status" />
          </Column>
          <Column width={150} sortable resizable align="center" fullText>
            <HeaderCell>Start Date</HeaderCell>
            <Cell>{(rowData) => new Date(rowData.start_date).toLocaleDateString("en-GB")}</Cell>
          </Column>
          <Column width={150} sortable resizable align="center" fullText>
            <HeaderCell>End Date</HeaderCell>
            <Cell>{(rowData) => new Date(rowData.end_date).toLocaleDateString("en-GB")}</Cell>
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
                        vehicle_id: rowData.vehicle_id,
                        user_id: rowData.user_id,
                        approver_id: rowData.approver_id,
                        purpose: rowData.purpose,
                        status: rowData.status,
                        start_date: rowData.start_date,
                        end_date: rowData.end_date,
                        booking_id: rowData.booking_id,
                      });
                    }}
                  >
                    <EditIcon />
                  </Button>
                  <Button appearance="ghost" onClick={() => HandleEditStatusBooking(rowData.booking_id, rowData.is_active)}>
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
          <Modal.Title>Add Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form fluid>
            <Form.Group>
              <Form.ControlLabel>Registration Number</Form.ControlLabel>
              <SelectPicker
                name="vehicle_id"
                data={dataV.map((vehicle) => ({
                  label: vehicle.registration_number,
                  value: vehicle.vehicle_id,
                }))}
                value={addVehicleForm.vehicle_id}
                onChange={(value) => {
                  setAddVehicleForm((prevFormValue) => ({
                    ...prevFormValue,
                    vehicle_id: value,
                  }));
                  setErrorsAddForm((prevErrors) => ({
                    ...prevErrors,
                    vehicle_id: undefined,
                  }));
                }}
                style={{ width: "100%" }}
              />
              {errorsAddForm.vehicle_id && <p style={{ color: "red" }}>{errorsAddForm.vehicle_id}</p>}
            </Form.Group>
          </Form>
          <Form fluid>
            <Form.Group>
              <Form.ControlLabel>Username</Form.ControlLabel>
              <SelectPicker
                name="user_id"
                data={dataU.map((user) => ({
                  label: user.username,
                  value: user.user_id,
                }))}
                value={addVehicleForm.user_id}
                onChange={(value) => {
                  setAddVehicleForm((prevFormValue) => ({
                    ...prevFormValue,
                    user_id: value,
                  }));
                  setErrorsAddForm((prevErrors) => ({
                    ...prevErrors,
                    user_id: undefined,
                  }));
                }}
                style={{ width: "100%" }}
              />
              {errorsAddForm.user_id && <p style={{ color: "red" }}>{errorsAddForm.user_id}</p>}
            </Form.Group>
          </Form>
          <Form fluid>
            <Form.Group>
              <Form.ControlLabel>Approver Name</Form.ControlLabel>
              <SelectPicker
                name="approver_id"
                data={dataU
                  .filter((user) => user.role === "approver")
                  .map((user) => ({
                    label: user.username,
                    value: user.user_id,
                  }))
                }
                value={addVehicleForm.approver_id}
                onChange={(value) => {
                  setAddVehicleForm((prevFormValue) => ({
                    ...prevFormValue,
                    approver_id: value,
                  }));
                  setErrorsAddForm((prevErrors) => ({
                    ...prevErrors,
                    approver_id: undefined,
                  }));
                }}
                style={{ width: "100%" }}
              />
              {errorsAddForm.approver_id && <p style={{ color: "red" }}>{errorsAddForm.approver_id}</p>}
            </Form.Group>
          </Form>
          <Form fluid>
            <Form.Group>
              <Form.ControlLabel>Purpose</Form.ControlLabel>
              <Form.Control
                name="purpose"
                value={addVehicleForm.purpose}
                onChange={(value) => {
                  setAddVehicleForm((prevFormValue) => ({
                    ...prevFormValue,
                    purpose: value,
                  }));
                  setErrorsAddForm((prevErrors) => ({
                    ...prevErrors,
                    purpose: undefined,
                  }));
                }}
              />
              {errorsAddForm.purpose && <p style={{ color: "red" }}>{errorsAddForm.purpose}</p>}
            </Form.Group>
          </Form>
          <Form fluid>
            <Form.Group>
              <Form.ControlLabel>Status</Form.ControlLabel>
              <Form.Control
                name="status"
                value={addVehicleForm.status || "pending"}
                onChange={(value) => {
                  setAddVehicleForm((prevFormValue) => ({
                    ...prevFormValue,
                    status: value,
                  }));
                  setErrorsAddForm((prevErrors) => ({
                    ...prevErrors,
                    status: undefined,
                  }));
                }}
                disabled
              />
              {errorsAddForm.status && <p style={{ color: "red" }}>{errorsAddForm.status}</p>}
            </Form.Group>
          </Form>
          <Form fluid>
            <Form.Group>
              <Form.ControlLabel>Start Date</Form.ControlLabel>
              <DatePicker
                name="start_date"
                value={addVehicleForm.start_date ? new Date(addVehicleForm.start_date) : null}
                onChange={(value) => {
                  const formattedDate = value ? value.toISOString() : null;
                  setAddVehicleForm((prevFormValue) => ({
                    ...prevFormValue,
                    start_date: formattedDate,
                  }));
                  setErrorsAddForm((prevErrors) => ({
                    ...prevErrors,
                    start_date: undefined,
                  }));
                }}
                style={{ width: "100%" }}
              />
              {errorsAddForm.start_date && (
                <p style={{ color: "red" }}>{errorsAddForm.start_date}</p>
              )}
            </Form.Group>
          </Form>
          <Form fluid>
            <Form.Group>
              <Form.ControlLabel>End Date</Form.ControlLabel>
              <DatePicker
                name="end_date"
                value={addVehicleForm.end_date ? new Date(addVehicleForm.end_date) : null}
                onChange={(value) => {
                  const formattedDate = value ? value.toISOString() : null;
                  setAddVehicleForm((prevFormValue) => ({
                    ...prevFormValue,
                    end_date: formattedDate,
                  }));
                  setErrorsAddForm((prevErrors) => ({
                    ...prevErrors,
                    end_date: undefined,
                  }));
                }}
                style={{ width: "100%" }}
              />
              {errorsAddForm.end_date && (
                <p style={{ color: "red" }}>{errorsAddForm.end_date}</p>
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
              HandleAddBooking();
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
              <Form.ControlLabel>Registration Number</Form.ControlLabel>
              <SelectPicker
                name="vehicle_id"
                data={dataV.map((vehicle) => ({
                  label: vehicle.registration_number,
                  value: vehicle.vehicle_id,
                }))}
                value={editVehicleForm.vehicle_id}
                onChange={(value) => {
                  setEditVehicleForm((prevFormValue) => ({
                    ...prevFormValue,
                    vehicle_id: value,
                  }));
                  setEditVehicleForm((prevErrors) => ({
                    ...prevErrors,
                    vehicle_id: undefined,
                  }));
                }}
                style={{ width: "100%" }}
              />
              {errorsEditForm.vehicle_id && <p style={{ color: "red" }}>{errorsEditForm.vehicle_id}</p>}
            </Form.Group>
          </Form>
          <Form fluid>
            <Form.Group>
              <Form.ControlLabel>Username</Form.ControlLabel>
              <SelectPicker
                name="user_id"
                data={dataU.map((user) => ({
                  label: user.username,
                  value: user.user_id,
                }))}
                value={editVehicleForm.user_id}
                onChange={(value) => {
                  setEditVehicleForm((prevFormValue) => ({
                    ...prevFormValue,
                    user_id: value,
                  }));
                  setErrorsEditForm((prevErrors) => ({
                    ...prevErrors,
                    user_id: undefined,
                  }));
                }}
                style={{ width: "100%" }}
              />
              {errorsEditForm.user_id && <p style={{ color: "red" }}>{errorsEditForm.user_id}</p>}
            </Form.Group>
          </Form>
          <Form fluid>
            <Form.Group>
              <Form.ControlLabel>Approver Name</Form.ControlLabel>
              <SelectPicker
                name="approver_id"
                data={dataU
                  .filter((user) => user.role === "approver")
                  .map((user) => ({
                    label: user.username,
                    value: user.user_id,
                  }))
                }
                value={editVehicleForm.approver_id}
                onChange={(value) => {
                  setEditVehicleForm((prevFormValue) => ({
                    ...prevFormValue,
                    approver_id: value,
                  }));
                  setErrorsEditForm((prevErrors) => ({
                    ...prevErrors,
                    approver_id: undefined,
                  }));
                }}
                style={{ width: "100%" }}
              />
              {errorsEditForm.approver_id && <p style={{ color: "red" }}>{errorsEditForm.approver_id}</p>}
            </Form.Group>
          </Form>
          <Form fluid>
            <Form.Group>
              <Form.ControlLabel>Purpose</Form.ControlLabel>
              <Form.Control
                name="purpose"
                value={editVehicleForm.purpose}
                onChange={(value) => {
                  setEditVehicleForm((prevFormValue) => ({
                    ...prevFormValue,
                    purpose: value,
                  }));
                  setErrorsEditForm((prevErrors) => ({
                    ...prevErrors,
                    purpose: undefined,
                  }));
                }}
              />
              {errorsEditForm.purpose && <p style={{ color: "red" }}>{errorsEditForm.purpose}</p>}
            </Form.Group>
          </Form>
          <Form fluid>
            <Form.Group>
              <Form.ControlLabel>Status</Form.ControlLabel>
              <Form.Control
                name="status"
                value={editVehicleForm.status || "pending"}
                onChange={(value) => {
                  setEditVehicleForm((prevFormValue) => ({
                    ...prevFormValue,
                    status: value,
                  }));
                  setErrorsEditForm((prevErrors) => ({
                    ...prevErrors,
                    status: undefined,
                  }));
                }}
                disabled
              />
              {errorsEditForm.status && <p style={{ color: "red" }}>{errorsEditForm.status}</p>}
            </Form.Group>
          </Form>
          <Form fluid>
            <Form.Group>
              <Form.ControlLabel>Start Date</Form.ControlLabel>
              <DatePicker
                name="start_date"
                value={editVehicleForm.start_date ? new Date(editVehicleForm.start_date) : null}
                onChange={(value) => {
                  const formattedDate = value ? value.toISOString() : null;
                  setEditVehicleForm((prevFormValue) => ({
                    ...prevFormValue,
                    start_date: formattedDate,
                  }));
                  setErrorsEditForm((prevErrors) => ({
                    ...prevErrors,
                    start_date: undefined,
                  }));
                }}
                style={{ width: "100%" }}
              />
              {errorsEditForm.start_date && (
                <p style={{ color: "red" }}>{errorsEditForm.start_date}</p>
              )}
            </Form.Group>
          </Form>
          <Form fluid>
            <Form.Group>
              <Form.ControlLabel>End Date</Form.ControlLabel>
              <DatePicker
                name="end_date"
                value={editVehicleForm.end_date ? new Date(editVehicleForm.end_date) : null}
                onChange={(value) => {
                  const formattedDate = value ? value.toISOString() : null;
                  setEditVehicleForm((prevFormValue) => ({
                    ...prevFormValue,
                    end_date: formattedDate,
                  }));
                  setErrorsEditForm((prevErrors) => ({
                    ...prevErrors,
                    end_date: undefined,
                  }));
                }}
                style={{ width: "100%" }}
              />
              {errorsEditForm.end_date && (
                <p style={{ color: "red" }}>{errorsEditForm.end_date}</p>
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
              HandleEditBooking();
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
