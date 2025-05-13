import { Container, Header, Sidebar, Sidenav, Content, Navbar, Nav, useEffect } from 'rsuite';
import CogIcon from '@rsuite/icons/legacy/Cog';
import AngleLeftIcon from '@rsuite/icons/legacy/AngleLeft';
import AngleRightIcon from '@rsuite/icons/legacy/AngleRight';
import GearCircleIcon from '@rsuite/icons/legacy/GearCircle';
import DashboardIcon from '@rsuite/icons/Dashboard';
import GroupIcon from '@rsuite/icons/legacy/Group';
import PeoplesIcon from '@rsuite/icons/Peoples';
import FunnelTimeIcon from '@rsuite/icons/FunnelTime';
import AbTestIcon from '@rsuite/icons/AbTest';
import PeopleFliterIcon from '@rsuite/icons/PeopleFliter';
import EditIcon from '@rsuite/icons/Edit';
import React, { useState } from 'react'

import { useRouter } from "next/router";

export default function Layout({ props }) {
  const [expand, setExpand] = useState(false);

  const headerStyles = {
    padding: 18,
    fontSize: 16,
    textAlign: "center",
    height: 56,
    background: '#fff',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  };

  const router = useRouter();

  const containsHrbp = (arr) => {
    return arr.includes("HRBP");
  };

  const containsHrtd = (arr) => {
    return arr.includes("HRTD");
  };

  const NavToggle = ({ expand, onChange }) => {
    return (
      <Navbar appearance="subtle" className="nav-toggle">
        {/* <Nav>
          <Nav.Menu
            noCaret
            placement="topStart"
            trigger="click"
            title={<CogIcon style={{ width: 20, height: 20 }} size="sm" />}
          >
            <Nav.Item>Help</Nav.Item>
            <Nav.Item>Settings</Nav.Item>
            <Nav.Item>Sign out</Nav.Item>
          </Nav.Menu>
        </Nav> */}

        <Nav pullRight>
          <Nav.Item onClick={onChange} style={{ width: 56, textAlign: 'center' }}>
            {expand ? <AngleLeftIcon /> : <AngleRightIcon />}
          </Nav.Item>
        </Nav>
      </Navbar>
    );
  };


  return (
    <div className="show-fake-browser sidebar-page">
      <Sidebar
        style={{ display: 'flex', flexDirection: 'column' }}
        width={expand ? 260 : 56}
        collapsible
      >
        <Sidenav.Header>
          <div style={headerStyles}>
          </div>
        </Sidenav.Header>
        <NavToggle expand={expand} onChange={() => setExpand(!expand)} />
        <Sidenav expanded={expand} defaultOpenKeys={['3']} appearance="subtle">
          <Sidenav.Body>
            <Nav>
              <Nav.Item eventKey="1" active icon={<DashboardIcon />} onClick={()=> router.push("/home")}>
                HOME
              </Nav.Item>  
              {containsHrbp(props ? props : []) && (      
              <Nav.Menu
                eventKey="2"
                trigger="hover"
                title="Employees"
                icon={<PeoplesIcon />}
                placement="rightStart"
              >
                <Nav.Item eventKey="2-4" onClick={() => router.push("/employees/master-role")}>Master Role</Nav.Item>
                <Nav.Item eventKey="2-5" onClick={() => router.push("/employees/assign-role")}>Assign Role</Nav.Item>
                <Nav.Menu
                  eventKey="2-1"
                  trigger="hover"
                  title="Employees Proint"
                  placement="rightStart"
                >
                  <Nav.Item eventKey="2-1-1" onClick={() => router.push("/employees/employee-list")}>Employees List</Nav.Item>
                </Nav.Menu>
                <Nav.Menu
                  eventKey="2-2"
                  trigger="hover"
                  title="Employees OS"
                  placement="rightStart"
                >
                  <Nav.Item eventKey="2-2-1" onClick={() => router.push("/employees/employees-os/os-list")}>Employees OS List</Nav.Item>
                  <Nav.Item eventKey="2-1" onClick={() => router.push("/employees/employees-os/os-department")}>Master OS Department</Nav.Item>
                  <Nav.Item eventKey="2-2" onClick={() => router.push("/employees/employees-os/os-location")}>Master OS Location</Nav.Item>
                  <Nav.Item eventKey="2-3" onClick={() => router.push("/employees/employees-os/os-position")}>Master OS Position</Nav.Item>
                </Nav.Menu>
              </Nav.Menu>
              )}

              {/* 2nd menu */}
              {containsHrtd(props ? props : []) && (  
              <Nav.Menu
                eventKey="3"
                trigger="hover"
                title="Master Data Ecom"
                icon={<FunnelTimeIcon />}
                placement="rightStart"
              >
                  <Nav.Item eventKey="3-1" onClick={() => router.push('/master-data-ecom/service-period')}>Service Period</Nav.Item>
                  <Nav.Item eventKey="3-2" onClick={() => router.push('/master-data-ecom/action-plan')}>Action Plan</Nav.Item>
                  <Nav.Item eventKey="3-3" onClick={() => router.push('/master-data-ecom/career-plan')}>Career Plan</Nav.Item> 
                  <Nav.Item eventKey="3-4" onClick={() => router.push('/master-data-ecom/machinery')}>Machinery</Nav.Item>
                  <Nav.Item eventKey="3-5" onClick={() => router.push('/master-data-ecom/measurement')}>Measurement</Nav.Item>
                  <Nav.Item eventKey='3-6' onClick={() => router.push('/master-data-ecom/master-desc-type')}>Master Desc Type</Nav.Item>
              </Nav.Menu>
              )}
              {/* 3rd Menu */}
              {containsHrtd(props ? props : []) && (
              <Nav.Menu
                eventKey="5"
                trigger="hover"
                title="HR Competency"
                icon={<PeopleFliterIcon />}
                placement="rightStart"
              >
                  <Nav.Item eventKey="5-1" onClick={() => router.push('/hr-competency/list-participant')}>List Participant</Nav.Item>
                  <Nav.Item eventKey="5-2" onClick={() => router.push('/hr-competency/change-employee-superior')}>Change Employee Superior</Nav.Item>
              </Nav.Menu>
              )}

              <Nav.Item eventKey='6' icon={<EditIcon />} onClick={() => router.push('/subordinate-competency')}>
                Subordinate Competency
              </Nav.Item>
            </Nav>
          </Sidenav.Body>
        </Sidenav>        
      </Sidebar>
    </div>
  )
}
