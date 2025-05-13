import React, { useEffect, useState } from "react";
import { Container, Header, Content, Footer, Navbar, Nav } from "rsuite";
import { useRouter } from "next/router";

export default function Navigation({ props, employee_data }) {
  // const emptyEmployee = {
  //   user:{
  //     employee_data:{
  //       nik:"",
  //       full_name:"",
  //       email:"",
  //       language:"",
  //       doJ:"",
  //       department:"",
  //       sub_department:"",
  //       location:"",
  //       city:"",
  //       country:"",
  //       nationality:"",
  //       phone:"",
  //       dob:"",
  //       superior_nik:"",
  //       superior_name:"",
  //       position:"",
  //       job_level:"",
  //       golongan:"",
  //       nama_rekening:"",
  //       no_rekening:"",
  //       gender:"",
  //       superior_email:"",
  //       superiors:"",
  //       is_superior:"",
  //     },
  //   }
  // }
  // const [employee_data,setEmployee_data] = useState(emptyEmployee)

  // useEffect(()=>{
  //   if (props != null && props.user != null && props.user != undefined ) {
  //     console.log("props here", props.user)
  //     if(new Date(props.user.expire) >= new Date() && props.user.verify === true){
  //       setEmployee_data(props.user.employee_data)
  //     }
  //   }
  // },[])
  const router = useRouter();

  const handleLogout = async (props) => {
    if (props != null && props.user != null && props.user != undefined) {
      if (
        new Date(props.user.expire) >= new Date() &&
        props.user.verify === true
      ) {
        let { ironLogout } = UseIron();
        ironLogout(props.user);
        router.push("/");
        return;
      }
    } else {
      console.log("no user session");
    }
  };
  return (
    <Navbar appearance="default">
      <Nav>
        <Nav.Item>E-Competency</Nav.Item>
      </Nav>
      <Nav pullRight>
        <Nav.Menu title={employee_data?.userName || "Guest"}>
          <Nav.Item>Profile</Nav.Item>
          <Nav.Item
            onClick={() => {
              handleLogout(props);
              router.push("/");
            }}>
            Log Out
          </Nav.Item>
        </Nav.Menu>
      </Nav>
    </Navbar>
  );
}
