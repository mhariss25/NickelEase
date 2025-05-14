import React, { useState } from "react";
import {
  Panel,
  Table,
  Pagination,
  InputGroup,
  Input,
  Stack,
  Button,
  Modal,
  Form,
  SelectPicker,
  Loader,
  InputNumber,
  DatePicker,
} from "rsuite";
import CheckOutlineIcon from '@rsuite/icons/CheckOutline';
import CloseOutlineIcon from "@rsuite/icons/CloseOutline";
import SearchIcon from "@rsuite/icons/Search";
import ApiVehicleBooking from "@/pages/api/vehicle_booking/api_vehicle_booking";

export default function DashboardTableComponent({ dataB, getAll }) {

  const { HeaderCell, Cell, Column } = Table;
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortColumn, setSortColumn] = useState("booking_id");
  const [sortType, setSortType] = useState("asc");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const emptyEditVehicleForm = {
    status: null,
  };

  const [showEditModal, setShowEditModal] = useState(false);
  const [editVehicleForm, setEditVehicleForm] = useState(emptyEditVehicleForm);
  const [errorsAddForm, setErrorsAddForm] = useState({});

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

  const HandleEditBooking = async () => {
    const errors = {};

    if (Object.keys(errors).length > 0) {
      setErrorsAddForm(errors);
      return;
    }

    try {
      const res = await ApiVehicleBooking().updateApproveBooking({
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

  return (
    <div>
      <Panel
        bordered
        bodyFill
        style={{ margin: 10 }}
        header={
          <Stack justifyContent="space-between">
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
                <div>
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
                    <CheckOutlineIcon />
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
              <Form.ControlLabel>Vehicle ID</Form.ControlLabel>
              <InputNumber
                name="vehicle_id"
                value={editVehicleForm.vehicle_id}
                onChange={(value) => {
                  seteditVehicleForm((prevFormValue) => ({
                    ...prevFormValue,
                    vehicle_id: parseInt(value, 10),
                  }));
                  setErrorsAddForm((prevErrors) => ({
                    ...prevErrors,
                    vehicle_id: undefined,
                  }));
                }}
                disabled
                min={0}
                step={1}
                style={{ width: "100%" }}
              />
              {errorsAddForm.vehicle_id && <p style={{ color: "red" }}>{errorsAddForm.vehicle_id}</p>}
            </Form.Group>
          </Form>
          <Form fluid>
            <Form.Group>
              <Form.ControlLabel>User ID</Form.ControlLabel>
              <InputNumber
                name="user_id"
                value={editVehicleForm.user_id}
                onChange={(value) => {
                  setEditVehicleForm((prevFormValue) => ({
                    ...prevFormValue,
                    user_id: parseInt(value, 10),
                  }));
                  setErrorsAddForm((prevErrors) => ({
                    ...prevErrors,
                    user_id: undefined,
                  }));
                }}
                disabled
                min={0}
                step={1}
                style={{ width: "100%" }}
              />
              {errorsAddForm.user_id && <p style={{ color: "red" }}>{errorsAddForm.user_id}</p>}
            </Form.Group>
          </Form>
          <Form fluid>
            <Form.Group>
              <Form.ControlLabel>Approver ID</Form.ControlLabel>
              <InputNumber
                name="approver_id"
                value={editVehicleForm.approver_id}
                onChange={(value) => {
                  setEditVehicleForm((prevFormValue) => ({
                    ...prevFormValue,
                    approver_id: parseInt(value, 10),
                  }));
                  setErrorsAddForm((prevErrors) => ({
                    ...prevErrors,
                    approver_id: undefined,
                  }));
                }}
                disabled
                min={0}
                step={1}
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
                value={editVehicleForm.purpose}
                onChange={(value) => {
                  setEditVehicleForm((prevFormValue) => ({
                    ...prevFormValue,
                    purpose: value,
                  }));
                  setErrorsAddForm((prevErrors) => ({
                    ...prevErrors,
                    purpose: undefined,
                  }));
                }}
                disabled
              />
              {errorsAddForm.purpose && <p style={{ color: "red" }}>{errorsAddForm.purpose}</p>}
            </Form.Group>
          </Form>
          <Form fluid>
            <Form.Group>
              <Form.ControlLabel>Status</Form.ControlLabel>
              <SelectPicker
                name="status"
                value={editVehicleForm.status}
                onChange={(value) => {
                  setEditVehicleForm((prevFormValue) => ({
                    ...prevFormValue,
                    status: value,
                  }));
                  setErrorsAddForm((prevErrors) => ({
                    ...prevErrors,
                    status: undefined,
                  }));
                }}
                data={[
                  { label: "Rejected", value: "rejected" },
                  { label: "Accepted", value: "accepted" }
                ]}
                style={{ width: "100%" }}
              />
              {errorsAddForm.status && <p style={{ color: "red" }}>{errorsAddForm.status}</p>}
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
                  setErrorsAddForm((prevErrors) => ({
                    ...prevErrors,
                    start_date: undefined,
                  }));
                }}
                disabled
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
                value={editVehicleForm.end_date ? new Date(editVehicleForm.end_date) : null}
                onChange={(value) => {
                  const formattedDate = value ? value.toISOString() : null;
                  setEditVehicleForm((prevFormValue) => ({
                    ...prevFormValue,
                    end_date: formattedDate,
                  }));
                  setErrorsAddForm((prevErrors) => ({
                    ...prevErrors,
                    end_date: undefined,
                  }));
                }}
                disabled
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
