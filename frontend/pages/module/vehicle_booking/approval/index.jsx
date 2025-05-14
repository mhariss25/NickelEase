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
import TableComponentApproval from "@/component/vehicle_booking/approval/TableComponent";
import TableComponentLog from "@/component/vehicle_booking/approval/log/TableComponent";
import CustomNavbar from "@/component/navbar";
import SideNav from "@/component/sidenav";

export default function VehicleBooking() {

    const [vehicleBookingsData, setVehicleBookingsData] = useState([]);
    const [bookingLogData, setBookingLogData] = useState([]);

    const [activeKey, setActiveKey] = useState("4");

    const HandleGetAllVehicleBooking = async () => {
        try {
            const res = await ApiVehicleBooking().getAllVehicleBooking();
            if (res.status === 200) {
                setVehicleBookingsData(res.data);
            } else {
                console.log("Error on GetAllVehicleBooking: ", res.message);
            }
        } catch (error) {
            console.log("Error on catch GetAllVehicleBooking: ", error.message);
        }
    };

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
        HandleGetAllVehicleBooking();
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
                            <Breadcrumb.Item active>Approval</Breadcrumb.Item>
                        </Breadcrumb>
                    </Stack>
                    <Panel
                        bordered
                        bodyFill
                        shaded
                        style={{ margin: 10 }}
                        header={
                            <Stack
                                justifyContent="flex-start"
                                direction="column"
                                alignItems="flex-start"
                                spacing={10}
                            >
                                <h4>Bookings Approval</h4>
                            </Stack>
                        }
                    >
                        <TableComponentApproval dataB={vehicleBookingsData} getAll={HandleGetAllVehicleBooking} />
                        <TableComponentLog dataL={bookingLogData} getAll={HandleGetAllBookingLog} />
                    </Panel>
                </Content>
            </Container>
        </Container>
    );
};
