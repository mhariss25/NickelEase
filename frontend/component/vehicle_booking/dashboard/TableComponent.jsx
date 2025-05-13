import React, { useState } from "react";
import { 
  Panel, 
  Table, 
  Pagination, 
  InputGroup, 
  Input, 
  Stack, 
  IconButton
} from "rsuite";
import CloseOutlineIcon from "@rsuite/icons/CloseOutline";
import FileDownloadIcon from '@rsuite/icons/FileDownload';
import SearchIcon from "@rsuite/icons/Search";
import * as XLSX from "xlsx";  // Import XLSX for Excel export

export default function DashboardTableComponent({ dataE }) {

  const { HeaderCell, Cell, Column } = Table;
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortColumn, setSortColumn] = useState("booking_id");
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

  const filteredData = dataE.filter((rowData) => {
    const searchFields = ["booking_id", "username", "vehicle_type"];
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

  const totalRowCount = searchKeyword ? filteredData.length : dataE.length;

  // Function to export the data to Excel
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(getFilteredData()); // Convert filtered data to sheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Data"); // Add sheet to workbook
    XLSX.writeFile(wb, "dashboard_data.xlsx"); // Export the file
  };

  return (
    <div>
      <Panel
        bordered
        bodyFill
        shaded
        style={{ margin: 10, width: "950px" }}
        header={
          <Stack justifyContent="space-between">
            <div className="flex gap-2">
              <IconButton
                icon={<FileDownloadIcon />}
                appearance="ghost"
                onClick={() => {
                  exportToExcel()
                }}
              >
                Export to Excel
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
            <HeaderCell align="center">Booking ID</HeaderCell>
            <Cell dataKey="booking_id" />
          </Column>
          <Column width={120} align="center" sortable fullText resizable>
            <HeaderCell align="center">Username</HeaderCell>
            <Cell dataKey="username" />
          </Column>
          <Column width={120} sortable fullText resizable>
            <HeaderCell align="center">Brand</HeaderCell>
            <Cell dataKey="brand" />
          </Column>
          <Column width={120} sortable fullText resizable>
            <HeaderCell align="center">Model</HeaderCell>
            <Cell dataKey="model" />
          </Column>
          <Column width={210} sortable fullText resizable>
            <HeaderCell align="center">Purpose</HeaderCell>
            <Cell dataKey="purpose" />
          </Column>
          <Column width={120} sortable fullText resizable>
            <HeaderCell align="center">Status</HeaderCell>
            <Cell dataKey="status" />
          </Column>
          <Column width={120} sortable fullText resizable>
            <HeaderCell align="center">Approver Name</HeaderCell>
            <Cell dataKey="approver_name" />
          </Column>
          <Column width={120} sortable fullText resizable>
            <HeaderCell align="center">Registration Number</HeaderCell>
            <Cell dataKey="registration_number" />
          </Column>
          <Column width={150} sortable resizable align="center" fullText>
            <HeaderCell>Start Date</HeaderCell>
            <Cell>{(rowData) => new Date(rowData.start_date).toLocaleDateString("en-GB")}</Cell>
          </Column>
          <Column width={150} sortable resizable align="center" fullText>
            <HeaderCell>End Date</HeaderCell>
            <Cell>{(rowData) => new Date(rowData.end_date).toLocaleDateString("en-GB")}</Cell>
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
