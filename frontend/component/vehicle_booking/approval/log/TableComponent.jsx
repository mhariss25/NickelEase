import React, { useEffect, useState, useMemo } from "react";
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
  const [sortColumn, setSortColumn] = useState("log_id");
  const [sortType, setSortType] = useState("asc");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

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

  return (
    <div>
      <Panel
        bordered
        bodyFill
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
            <HeaderCell>Log ID</HeaderCell>
            <Cell dataKey="log_id" />
          </Column>
          <Column width={120} align="center" sortable fullText resizable>
            <HeaderCell align="center">Booking ID</HeaderCell>
            <Cell dataKey="booking_id" />
          </Column>
          <Column width={120} sortable fullText resizable>
            <HeaderCell align="center">Status</HeaderCell>
            <Cell dataKey="status" />
          </Column>
          <Column width={120} align="center" sortable fullText resizable>
            <HeaderCell>Action By</HeaderCell>
            <Cell dataKey="action_by" />
          </Column>
          <Column width={150} sortable resizable align="center" fullText>
            <HeaderCell>Action Date</HeaderCell>
            <Cell>{(rowData) => new Date(rowData.action_date).toLocaleDateString("en-GB")}</Cell>
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
    </div>
  );
}
