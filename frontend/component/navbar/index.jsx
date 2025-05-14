import AdminIcon from '@rsuite/icons/Admin';
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Button, Nav, Navbar } from "rsuite";
import { ThemeContext } from "./themeContext";
import SunO from "@rsuite/icons/legacy/SunO";
import MoonO from "@rsuite/icons/legacy/MoonO";

export default function CustomNavbar({ onSelect, activeKey, ...props }) {
  const router = useRouter();
  const [sessionAuth, setSessionAuth] = useState({});
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleUserData = () => {
    const userData = sessionStorage.getItem("userData");
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      return parsedUserData;
    }
    return null;
  };

  const handleLogout = () => {
    try {


      sessionStorage.removeItem("token");
      sessionStorage.removeItem("username");
      sessionStorage.removeItem("role");







      router.push("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };


  useEffect(() => {
    const userData = handleUserData();
    setSessionAuth(userData || {});


  }, []);

  return (
    <Navbar
      {...props}
      style={{
        position: "fixed",
        height: 60,
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 999,
        alignContent: "center",
      }}>
      <Nav onSelect={onSelect} activeKey={activeKey}>
        <Nav.Item style={{ pointerEvents: "none" }}>
          <Image
            src="/NickelEase.png"
            alt="NickelEase_logo"
            width={200}
            height={40}
            layout="fixed"
            style={{ objectFit: "contain" }}
          />
        </Nav.Item>
      </Nav>
      <Nav pullRight onSelect={onSelect} activeKey={activeKey}>
        <Button
          onClick={toggleTheme}
          appearance="ghost"
          style={{ marginRight: 10 }}>
          {theme ? <MoonO /> : <SunO />}
        </Button>
       <Nav.Menu title={<AdminIcon />}>
      <Nav.Item
        eventKey="1"
        onClick={() => {
          handleLogout();
        }}>
        Sign Out
      </Nav.Item>
    </Nav.Menu>
      </Nav>
    </Navbar>
  );
}