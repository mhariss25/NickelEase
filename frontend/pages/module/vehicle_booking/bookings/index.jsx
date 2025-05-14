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
import TableComponent from "@/component/vehicle_booking/bookings/TableComponent";
import CustomNavbar from "@/component/navbar";
import SideNav from "@/component/sidenav";

export default function VehicleBooking() {

    const [vehicleBookingsData, setVehicleBookingsData] = useState([]);
    const [vehiclesData, setVehiclesData] = useState([]);
    const [userData, setUserData] = useState([]);

    const [activeKey, setActiveKey] = useState("3");

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

    const HandleGetAllVehicles = async () => {
        try {
            const res = await ApiVehicleBooking().getAllVehicles();
            if (res.status === 200) {
                setVehiclesData(res.data);
            } else {
                console.log("Error on GetAllVehicles: ", res.message);
            }
        } catch (error) {
            console.log("Error on catch GetAllVehicles: ", error.message);
        }
    };

    const HandleGetAllUser = async () => {
        try {
            const res = await ApiVehicleBooking().getAllUser();
            if (res.status === 200) {
                setUserData(res.data);
            } else {
                console.log("Error on GetAllUsers: ", res.message);
            }
        } catch (error) {
            console.log("Error on catch GetAllUsers: ", error.message);
        }
    };

    useEffect(() => {
        HandleGetAllVehicleBooking()
        HandleGetAllVehicles()
        HandleGetAllUser()
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
                            <Breadcrumb.Item active>Bookings</Breadcrumb.Item>
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
                                <h4>Bookings Data</h4>
                            </Stack>
                        }
                    >
                        <TableComponent dataB={vehicleBookingsData} dataV={vehiclesData} dataU={userData} getAll={HandleGetAllVehicleBooking} />
                    </Panel>
                </Content>
            </Container>
        </Container>
    );
};
