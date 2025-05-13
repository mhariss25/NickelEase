import React, { useEffect, useState } from 'react'
import {
    Container,
    Header,
    Content,
    Footer,
    Form,
    ButtonToolbar,
    Button,
    Navbar,
    Panel,
    FlexboxGrid
  } from 'rsuite';
import { useRouter } from "next/router";
import AuthAPI from '@/pages/api/authApi';
import { aicrypt } from '@/lib/aiCrypt';
import useIron from '@/pages/api/iron';

export default function Login() {
  let { ironLogin } = useIron();
  const emptyForm = {
    nik:'',
    password:''
  }
  const router = useRouter()
  const [loginForm,setLoginForm] =  useState(emptyForm)


  const submitLogin = async () =>{
      if (loginForm.nik == "" || loginForm.password == "") {
          console.log("please fill nik and password before submit")
          return
      }

      try {

        let now = Math.floor(Date.now() / 1000);
        console.log("data ", now)
        let data = { nik: loginForm.nik, password: loginForm.password, expired: now };      

        data = JSON.stringify(data);

        data = await aicrypt(data);
      
        data = {
          package: data,
        };
        // console.log("time", now);
        console.log(data);
      
        const dataLogin = await AuthAPI().login(data);
        console.log("success", dataLogin)
        ironLogin(dataLogin).then((username) => {
          console.log('success login:', username);
          router.push("/home")
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
        // console.log("saveIron", saveIron)
  
        //setdataLogin(dataLogin.data || []);
      } catch (error) {
        //setdataLogin([]);
        console.log("error", error)
      }

  }
  

  // useEffect(()=>{console.log("ini ", loginForm)},[loginForm])
  
  return (
    <div className="show-fake-browser login-page">
    <Container>
      <Content style={{marginTop: '25px'}}>
        <FlexboxGrid justify="center">
          <FlexboxGrid.Item colspan={12}>
            <Panel header="Login"  bordered>
              <Form fluid>
                <Form.Group>
                  <Form.ControlLabel>NIK</Form.ControlLabel>
                  <Form.Control onChange={(value)=>{setLoginForm({ ...loginForm, nik: value })}} name="name" />
                </Form.Group>
                <Form.Group>
                  <Form.ControlLabel>Password</Form.ControlLabel>
                  <Form.Control onChange={(value)=>{setLoginForm({ ...loginForm, password: value })}} name="password" type="password" autoComplete="off" />
                </Form.Group>
                <Form.Group>
                  <ButtonToolbar>
                    <Button appearance="primary" onClick={() =>{submitLogin()}}>Sign in</Button>
                    <Button appearance="link">Forgot password?</Button>
                  </ButtonToolbar>
                </Form.Group>
              </Form>
            </Panel>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Content>
    </Container>
  </div>
  )
}
