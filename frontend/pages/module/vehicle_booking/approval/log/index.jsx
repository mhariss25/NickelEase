import { useEffect, useState } from 'react';
import {
    Container,
    Header,
    Content,
    Breadcrumb,
    Panel,
    Stack,
} from "rsuite";
import ApiVehicleBooking from '@/pages/api/vehicle_booking/api_vehicle_booking.js';
import TableComponent from "@/component/vehicle_booking/approval/log/TableComponent";
import CustomNavbar from "@/component/navbar";
import SideNav from "@/component/sidenav";

export default function VehicleBooking() {

    const [bookingLogData, setBookingLogData] = useState([]);

    const [activeKey, setActiveKey] = useState("5");

    const HandleGetAllBookingLog = async () => {
        try {
            const res = await ApiVehicleBooking().getAllBookingLog();
            if (res.status === 200) {
                setBookingLogData(res.data);
            } else {
                console.log("Error on GetAllVehicleBooking: ", res.message);
            }
        } catch (error) {
            console.log("Error on catch GetAllVehicleBooking: ", error.message);
        }
    };

    useEffect(() => {
        HandleGetAllBookingLog();
    }, []);

    return (
        <Container height={800} className="sidebar-page">
            <Header>
                <CustomNavbar
                    appearance="default"
                    activeKey={activeKey}
                    onSelect={setActiveKey}
                    className="w-100 shadow-md text-base pr-1"
                />
            </Header>
            <Container style={{ marginTop: '60px' }}>
                <SideNav active={activeKey} />
                <Content>
                    <Stack justifyContent="center" style={{ marginTop: '20px' }}>
                        <Breadcrumb>
                            <Breadcrumb.Item>Vehicle Booking</Breadcrumb.Item>
                            <Breadcrumb.Item active>Approve Log</Breadcrumb.Item>
                        </Breadcrumb>
                    </Stack>
                    <Panel
                        bordered
                        bodyFill
                        shaded
                        header={
                            <Stack
                                justifyContent="flex-start"
                                direction="column"
                                alignItems="flex-start"
                                spacing={10}
                            >
                                <h4>Approve Log</h4>
                            </Stack>
                        }
                    >
                        <Panel
                            bordered
                            style={{ margin: 10, width: "950px" }}
                            shaded
                        >
                            <TableComponent dataB={bookingLogData} getAll={HandleGetAllBookingLog} />
                        </Panel>
                    </Panel>
                </Content>
            </Container>
        </Container>
    );
};
