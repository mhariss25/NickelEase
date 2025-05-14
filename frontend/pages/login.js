import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container, Content, Form, ButtonToolbar, Button, Panel, FlexboxGrid } from 'rsuite';
import ApiAuth from '@/pages/api/auth/api_auth';

export default function LoginPage() {
  const router = useRouter();
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');
    if (!loginForm.username || !loginForm.password) {
      setError('Mohon isi username dan password.');
      return;
    }
    setLoading(true);
    try {
      const data = { username: loginForm.username, password: loginForm.password };
      const res = await ApiAuth().Login(data);
      if (res && res.data && res.data.token) {
        
        sessionStorage.setItem('token', res.data.token);
        sessionStorage.setItem('username', res.data.username);
        sessionStorage.setItem('role', res.data.role);
        router.push('/module/vehicle_booking/dashboard');
      } else {
        setError(res.message || 'Login gagal.');
      }
    } catch (err) {
      setError('Terjadi kesalahan saat login.');
    }
    setLoading(false);
  };
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      router.push('/module/vehicle_booking/dashboard');
    }
  }, []);

  return (
    <div className="show-fake-browser login-page">
      <Container>
        <Content style={{ marginTop: '25px' }}>
          <FlexboxGrid justify="center">
            <FlexboxGrid.Item colspan={12}>
              <Panel header="Login" bordered>
                <Form fluid>
                  <Form.Group>
                    <Form.ControlLabel>username</Form.ControlLabel>
                    <Form.Control value={loginForm.username} onChange={value => setLoginForm({ ...loginForm, username: value })} name="username" type="username" />
                  </Form.Group>
                  <Form.Group>
                    <Form.ControlLabel>Password</Form.ControlLabel>
                    <Form.Control value={loginForm.password} onChange={value => setLoginForm({ ...loginForm, password: value })} name="password" type="password" autoComplete="off" />
                  </Form.Group>
                  {error && <div style={{ color: 'red', marginBottom: 10 }}>{error}</div>}
                  <Form.Group>
                    <ButtonToolbar>
                      <Button appearance="primary" loading={loading} onClick={handleLogin}>Sign in</Button>
                      
                    </ButtonToolbar>
                  </Form.Group>
                </Form>
              </Panel>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Content>
      </Container>
    </div>
  );
}