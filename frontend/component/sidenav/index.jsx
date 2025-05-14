import { Sidenav, Nav, Stack, IconButton, Sidebar } from "rsuite";
import PeoplesTimeIcon from '@rsuite/icons/PeoplesTime';
import EventDetailIcon from '@rsuite/icons/EventDetail';
import ListIcon from '@rsuite/icons/List';
import PeoplesIcon from '@rsuite/icons/Peoples';
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

  const [userRole, setUserRole] = useState("");
  const [activeKey, setActiveKey] = useState(active || "3");

  useEffect(() => {
    const role = sessionStorage.getItem("role");
    setUserRole(role);

    const userData = sessionStorage.getItem("userData");
    if (userData) {
      try {
        const parsedUserData = JSON.parse(userData);
        setIsAdmin(parsedUserData?.is_admin === 1);
      } catch (error) {
        console.error("Error parsing user data from sessionStorage:", error);
        setIsAdmin(false);
      }
    } else {
      setIsAdmin(false);
    }
  }, []);

  const handleRoutes = (eventKey) => {
    setActiveKey(eventKey);

    switch (eventKey) {
      case "1":
        router.push(`/module/vehicle_booking/dashboard`);
        break;
      case "2":
        router.push(`/module/vehicle_booking/vehicles`);
        break;
      case "3":
        router.push(`/module/vehicle_booking/bookings`);
        break;
      case "4":
        router.push(`/module/vehicle_booking/approval`);
        break;
      case "5":
        router.push(`/module/vehicle_booking/users`);
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
              {/* Admin and Approver Role */}
              {(userRole === "admin" || userRole === "approver") && (
                <>
                  {/* Only Admin and Approver can see the first three items */}
                  {userRole === "admin" && (
                    <>
                      <Nav.Item eventKey="1" icon={<GridIcon />}>Dashboard</Nav.Item>
                      <Nav.Item eventKey="2" icon={<ListIcon />}>Vehicles</Nav.Item>
                      <Nav.Item eventKey="3" icon={<EventDetailIcon />}>Bookings</Nav.Item>
                    </>
                  )}
                  {/* Both Admin and Approver can see the Approval and Logs items */}
                  {userRole === "approver" && (
                    <>
                      <Nav.Item eventKey="1" icon={<GridIcon />}>Dashboard</Nav.Item>
                      <Nav.Item eventKey="2" icon={<ListIcon />}>Vehicles</Nav.Item>
                      <Nav.Item eventKey="3" icon={<EventDetailIcon />}>Bookings</Nav.Item>
                      <Nav.Item eventKey="4" icon={<PeoplesTimeIcon />}>Approval</Nav.Item>
                      {/* <Nav.Item eventKey="5" icon={<PeoplesIcon />}>Users</Nav.Item> */}
                    </>
                  )}
                </>
              )}
              {/* Non-admin/non-approver Role (e.g., regular user) */}
              {userRole !== "admin" && userRole !== "approver" && (
                <>
                  <Nav.Item eventKey="3" icon={<EventDetailIcon />}>Bookings</Nav.Item>
                </>
              )}
            </Nav>
          </Sidenav.Body>
        </Sidenav>
      </Sidenav>
    </Sidebar>
  );
}

