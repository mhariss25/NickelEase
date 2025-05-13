import React, { useEffect, useState } from "react";
import {
    Container,
    Stack,
    Breadcrumb,
    Panel,
    Header,
    Content,
} from "rsuite";
import { useRouter } from "next/router";
import ApiVehicleBooking from '@/pages/api/vehicle_booking/api_vehicle_booking.js';
import ChartComponent from "@/component/dashboard/ChartComponent";
import CustomNavbar from "@/component/navbar";
import SideNav from "@/component/sidenav";

export default function DashboardServer() {

    const router = useRouter();
    const [activeKey, setActiveKey] = useState("1");

    const [vehiclesData, setVehiclesData] = useState([]);

    const HandleGetAllVehicles = async () => {
        try {
            const res = await ApiVehicleBooking().getAllVehicles();
            if (res.status === 200) {
                setVehiclesData(res.data);
                processChartData(res.data); // Proses data untuk chart
            } else {
                console.log("Error on GetAllVehicles: ", res.message);
            }
        } catch (error) {
            console.log("Error on catch GetAllVehicles: ", error.message);
        }
    };

    useEffect(() => {
        HandleGetAllVehicles();
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
                            <Breadcrumb.Item active>Dashboard</Breadcrumb.Item>
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
                                <h4>Vehicle Usage Chart</h4>
                            </Stack>
                        }
                    >
                        <ChartComponent dataV={vehiclesData} />
                    </Panel>
                </Content>
            </Container>
        </Container>
    );
}
