import { Sidenav, Nav, Stack, IconButton, Sidebar } from "rsuite";
import PeoplesTimeIcon from '@rsuite/icons/PeoplesTime';
import TaskIcon from "@rsuite/icons/Task";
import ArrowLeftLineIcon from "@rsuite/icons/ArrowLeftLine";
import ArrowRightLineIcon from "@rsuite/icons/ArrowRightLine";
import GridIcon from "@rsuite/icons/Grid";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { sideNavContext } from "./expandContext";

const NavToggle = ({ onChange }) => {
  const { isExpanded, toggleExpand } = useContext(sideNavContext);
  return (
    // <Stack className="nav-toggle" justifyContent="flex-start">
    <IconButton
      style={{ justifyContent: `${isExpanded ? "flex-end" : "center"}` }}
      onClick={onChange}
      size="lg"
      icon={isExpanded ? <ArrowLeftLineIcon /> : <ArrowRightLineIcon />}
    />
  );
};

export default function SideNav({ active }) {
  const router = useRouter();
  const { isExpanded, toggleExpand } = useContext(sideNavContext);
  const [isAdmin, setIsAdmin] = useState(false);

  // const [activeKey, setActiveKey] = useState("1");

  useEffect(() => {
    const userData = sessionStorage.getItem("userData");
    if (userData) {
      try {
        const parsedUserData = JSON.parse(userData);
        setIsAdmin(parsedUserData?.is_admin === 1);
      } catch (error) {
        console.error("Error parsing user data from sessionStorage:", error);
        setIsAdmin(false); // Default to false if parsing fails
      }
    } else {
      setIsAdmin(false); // Default to false if no user data
    }
  }, []);
  const [activeKey, setActiveKey] = useState(active || "3");

  const handleRoutes = (eventKey) => {
    setActiveKey(eventKey);

    switch (eventKey) {
      case "1":
        router.push(`/module/vehicle_booking/dashboard`);
        break;
      case "2":
        router.push(`/module/vehicle_booking/vehicle`);
        break;
      case "3":
        router.push(`/user`);
        break;

      default:
        router.push(`/home`);
        break;
    }
  };

  return (
    <Sidebar
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f7f8ff",
        height: "100vh",
        justifyItems: "center",
        transition: "0.25s ease-in-out",
      }}
      width={isExpanded ? 260 : 56}>
      <Sidenav width={isExpanded ? 260 : 56}>
        <NavToggle expand={isExpanded} onChange={toggleExpand} />
        <Sidenav
          expanded={isExpanded}
          defaultOpenKeys={["3"]}
          appearance="subtle"
          className="font-bold">
          <Sidenav.Body>
            <Nav className="mb-2" onSelect={handleRoutes} activeKey={activeKey}>
              <Nav.Item eventKey="1" icon={<GridIcon />}>
                Dashboard
              </Nav.Item>
              <Nav.Item eventKey="2" icon={<PeoplesTimeIcon />}>
                Vehicles
              </Nav.Item>
              <Nav.Item eventKey="3" icon={<TaskIcon />}>
                Master User
              </Nav.Item>
            </Nav>
          </Sidenav.Body>
        </Sidenav>
      </Sidenav>
    </Sidebar>
  );
}
