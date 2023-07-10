import { Form, Input, Row, Col, Button, Modal } from 'antd';
import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

//# Css form login
const headerStyle = {
    textAlign: 'center',
    paddingInline: 50,
    lineHeight: '64px',
    backgroundColor: 'white',
    width: '70%',
    margin: 'auto',
};
const ContentStyle = {
    display: 'flex',
    width: '75%',
    margin: 'auto',
    backgroundColor: 'white',
}
const FormStyle = {
    border: '1px solid grey',
    borderRadius: '10px',
    overflow: 'hidden'
}

const DangNhapButton = {
    background: '#496ac0',
    color: 'white',
    padding: '0 80px',
    height: '40px',
}


export default function Login() {
    const [showDangKy, setShowDangKy] = useState(false);
    const [showQuenMatKhau, setQuenMatKhau] = useState(false);

    const responseGoogle = (response) => {
        console.log(response);
    }

    return (
        <>
            <div>
                <div style={headerStyle}>
                    <a href='/'>
                        <img src="./Image/Logo.png" alt="" style={{ width: '18%' }} />
                    </a>
                </div>

                {/* Form đăng nhập */}
                <div style={ContentStyle}>
                    <div style={{ width: '80%' }}>
                        <img src="./Image/SubLogo.png" alt="" style={{ width: '100%' }} />
                    </div>
                    <div style={{ marginTop: '130px', width: '50%' }}>
                        <Form style={FormStyle}>
                            <div style={{ width: '70%', margin: 'auto', marginTop: '40px' }}>
                                <Input className='form-control' placeholder='Email hoặc số điện thoại' />
                            </div>
                            <div style={{ width: '70%', margin: 'auto', marginTop: '20px' }}>
                                <Input className='form-control' placeholder='Mật khẩu' />
                            </div>
                            <div style={{ width: '100%', marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                                <Button style={DangNhapButton}>Đăng Nhập</Button>
                            </div>
                            <p style={{ textAlign: "center", color: '#2484ba', margin: '5px' }}><a onClick={() => setQuenMatKhau(true)}>Quên mật khẩu</a></p>
                            {/* <div style={{ width: '100%', margin: '10px 0', display: 'flex', justifyContent: 'center' }}>
                                <Button style={DangKyBotton} onClick={() => setShow(true)}>Đăng ký</Button>
                            </div> */}
                            <div>
                                {/* <p style={{ marginBottom: '10px', textAlign: "center" }}>or sign in with other accounts ?</p> */}
                                <div style={{ display: "flex", justifyContent: "center", margin: "7px 0" }}>
                                    <GoogleOAuthProvider clientId='341213027371-d8jtlok8s85eqhsdb3mde1lllqbd70dk.apps.googleusercontent.com'>
                                        <GoogleLogin
                                            locale='en'
                                        />
                                    </GoogleOAuthProvider>
                                </div>
                                <p style={{ textAlign: "center" }}>Bạn chưa có tài khoản? <a onClick={() => setShowDangKy(true)} style={{ color: '#2484ba' }}>Đăng ký tại đây.</a></p>
                            </div>
                        </Form>
                    </div>
                </div>
                <p style={{ color: '#4f8eed', fontSize: '50px', fontWeight: 'bold', textAlign: 'center', margin: '0' }}>Học, học nữa, học mãi</p>
            </div>

            {/*Form Đăng ký*/}
            <Modal
                title={<h2 style={{ color: '#2484ba', fontSize: '20px', fontWeight: 'bold' }}>Đăng Ký</h2>}
                visible={showDangKy}
                okText="Đăng ký"
                onCancel={() => setShowDangKy(false)}
            >
                <Form className='container'>
                    <div className='row mb-3'>
                        <div className='col-lg-6'>
                            <Input type='' placeholder='Họ' className='form-control' />
                        </div>
                        <div className='col-lg-6'>
                            <Input type='text' placeholder='Tên' className='form-control' />
                        </div>
                    </div>
                    <div className='form-group mb-3'>
                        <Input type='text' placeholder='Số điện thoại' className='form-control' />
                    </div>
                    <div className='form-group mb-3'>
                        <Input type='email' placeholder='Email' className='form-control' />
                    </div>
                    <div className='form-group mb-3'>
                        <Input className="form-control" type="password" placeholder="Mật khẩu" />
                    </div>
                    <div className='form-group mb-3'>
                        <Input className="form-control" type="password" placeholder="Xác thực mật khẩu" />
                    </div>
                </Form>
            </Modal>

            {/* Form quên mật khẩu */}
            <Modal
                title={<h2 style={{ color: '#2484ba', fontSize: '20px', fontWeight: 'bold' }}>Quên mật khẩu</h2>}
                visible={showQuenMatKhau}
                okText="Đăng ký"
                onCancel={() => setQuenMatKhau(false)}
            >
                <div className='mainAuth'>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                    >
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email!',
                                },
                            ]}
                        >
                            <Input placeholder="Enter email" type='email' />
                        </Form.Item>
                        <Form.Item>
                            <p style={{ textAlign: "center" }}>Bạn sẽ nhận được mật khẩu mới do chúng tôi cung cấp. Mật khẩu này sẽ có hiệu lực trong 10 phút. Vui lòng vào email của bạn để nhận mật khẩu và thay đổi nó</p>
                        </Form.Item>
                        <Form.Item style={{ marginTop: '-20px' }}>
                            <Button type="primary" htmlType='submit' block className="login-form-button" style={{ margin: '10px 0' }}>
                                Gửi mail
                            </Button>
                            <p style={{ textAlign: "center" }}>Bạn chưa có tài khoản? <a onClick={() => (setShowDangKy(true), setQuenMatKhau(false))} style={{ color: '#2484ba' }}>Đăng ký tại đây.</a></p>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </>
    )
}