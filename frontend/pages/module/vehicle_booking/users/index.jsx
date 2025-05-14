import { useEffect, useState } from 'react';
import {
    Container,
    Header,
    Content,
    Breadcrumb,
    Panel,
    Stack,
} from "rsuite";
import CustomNavbar from "@/component/navbar";
import SideNav from "@/component/sidenav";

export default function Users() {

    const [activeKey, setActiveKey] = useState("5");

    useEffect(() => {
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
                            <Breadcrumb.Item active>Users </Breadcrumb.Item>
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
                                <h4>Users</h4>
                            </Stack>
                        }
                    >
                    </Panel>
                </Content>
            </Container>
        </Container>
    );
};
