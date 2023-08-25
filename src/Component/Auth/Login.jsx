import { Form, Input, Button, Modal, notification, Select } from 'antd';
import 'bootstrap/dist/css/bootstrap.css';
import { useState, useContext, useEffect } from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

import { LoginService } from '../../services/userService';
import { handleValidationRegister } from '../../assets/js/handleValidation';
import { RegisterService } from '../../services/userService';
import { ForgorPasswordService } from '../../services/userService';
import { handleValidationForgotPassword } from '../../assets/js/handleValidation';
import { LoginByGoogleService } from '../../services/userService';
import { GetAllPhoneService } from '../../services/userService';
import { GetAllEmail } from '../../services/SuperAdminService';

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
};
const FormStyle = {
    border: '1px solid grey',
    borderRadius: '10px',
    overflow: 'hidden',
};
const DangNhapButton = {
    background: '#496ac0',
    color: 'white',
    padding: '0 80px',
    height: '40px',
};

export default function Login() {
    //#region - Declare - khai báo biến
    const [showDangKy, setShowDangKy] = useState(false);
    const [showQuenMatKhau, setQuenMatKhau] = useState(false);

    const [cookies, setCookie] = useCookies([]);
    const { token, user, render, onSetRender, onSetUser } = useContext(UserContext);
    const navigate = useNavigate();

    const [loginInput, setLoginInput] = useState({
        inputEmail: '',
        inputPassword: '',
    });

    const [registerInput, setRegisterInput] = useState({
        inputHo: '',
        inputTen: '',
        inputEmail: '',
        inputPhone: '',
        inputSchoolName: '',
    });

    const [errors, setErrors] = useState({
        inputHo: '',
        inputTen: '',
        inputEmail: '',
        inputPhone: '',
        inputSchoolName: '',
        emailforgot: '',
    });

    const [emailforgot, setEmaiForgot] = useState('');
    //#endregion

    //#region - Fucntion - lấy danh sách phone, email để validation
    const [emailList, setEmailList] = useState('');
    const [phoneList, setPhoneList] = useState('');

    const handleGetData = async () => {
        try{
            const resulst = await GetAllEmail();
            const result2 = await GetAllPhoneService();
            if(resulst){
                setPhoneList(result2);
            } 
            if(resulst.status === 200){
                setEmailList(resulst.data);
            }
        } catch (e){
            console.log(e);
        }
    }

    useEffect(() => {
        handleGetData();
    }, [])

    //#region - Function - nhận giá trị input
    const handleInputLogin = (event) => {
        const field = event.target.name;
        const value = event.target.value;

        setLoginInput((loginInput) => ({ ...loginInput, [field]: value }));
    };

    const handleInputRegister = (event) => {
        const field = event.target.name;
        const value = event.target.value;

        setRegisterInput((registerInput) => ({ ...registerInput, [field]: value }));
    };
    //#endregion

    //#region - Function - hiển thị thông báo
    const [api, contextHolder] = notification.useNotification();
    const openNotificationLoginFailly = (placement) => {
        api.error({
            message: `Thông báo`,
            description: 'Đăng nhập thất bại',
            placement,
        });
    };
    const openNotificationRegisterSuccess = (placement) => {
        api.success({
            message: `Thông báo`,
            description: 'Đăng ký thành công, vui lòng kiểm tra email của bạn',
            placement,
        });
    };
    const openNotificationForgotPasswordSuccess = (placement) => {
        api.success({
            message: `Thông báo`,
            description: 'Kiểm tra email của bạn để nhận mật khẩu mới',
            placement,
        });
    };
    //#endregion

    //#region - Function - register
    const handleRegister = async () => {
        let errors = {};
        const data = {
            fullName: registerInput.inputHo + ' ' + registerInput.inputTen,
            phoneNumber: registerInput.inputPhone,
            email: registerInput.inputEmail,
            schoolName: registerInput.inputSchoolName,
        };
        handleValidationRegister(registerInput, errors, emailList, phoneList);
        if (Object.keys(errors).length === 0) {
            const result = await RegisterService(data);
            if (result.status === 200) {
                openNotificationRegisterSuccess('topRight');
                setErrors([]);
                setShowDangKy(false);
                setRegisterInput('');
                onSetRender();
            }
        } else {
            setErrors(errors);
        }
    };
    //#endregion

    //#region - Function - Login, Save Cookie
    // const handleSetCookie = (value) => {
    //     setCookie('token', value);
    // };

    const handleLogin = async () => {
        const data = {
            email: loginInput.inputEmail,
            password: loginInput.inputPassword,
        };
        const result = await LoginService(data);

        if (result.status != undefined && result.status === 200) {
            onSetUser(result);
            // handleSetCookie(result.token);
            localStorage.setItem('authToken', result.token);
            localStorage.setItem('user', result.data);
            if (result.roleId === 4) {
                navigate('/');
            } else if (result.roleId === 2) {
                navigate('/admin/manageUser');
            } else if (result.roleId === 3) {
                navigate('/mod/manageTopic');
            } else {
                navigate('/superAdmin/manageAdmin');
            }
        } else {
            openNotificationLoginFailly('topRight');
        }
    };
    
    //#endregion

    //#region - Function - Forgot Password
    const handleForgorPassword = async () => {
        let errors = {};
        handleValidationForgotPassword(emailforgot, errors, emailList);
        if (Object.keys(errors).length === 0) {
            const result = await ForgorPasswordService(emailforgot);
            if (result) {
                openNotificationForgotPasswordSuccess('topRight');
                setErrors([]);
                setQuenMatKhau(false);
                setEmaiForgot('');
                onSetRender();
            }
        } else {
            setErrors(errors);
        }
    };
    //#endregion

    //#region - Function - Login by google gmail
    const onLoginWithGoogle = async (value) => {
        try {
            const decodedToken = jwt_decode(value);
            const data = {
                email: decodedToken.email,
                fullName: decodedToken.name,
                avatar: decodedToken.picture,
                status: 'Đang hoạt động',
            };
            const result = await LoginByGoogleService(data);
            if (result.status === 400) {
                onSetUser(result);
                // handleSetCookie(result.token);
                localStorage.setItem('authToken', result.token);
                navigate('/');
            } else if (result.status === 200) {
                onSetUser(result);
                // handleSetCookie(result.token);
                localStorage.setItem('authToken', result.token);
                if (result.roleId === 4) {
                    navigate('/');
                } else if (result.roleId === 1) {
                    navigate('/admin/manageUser');
                }
            } else {
                openNotificationLoginFailly('topRight');
            }
            onSetRender();
        } catch (error) {
            console.error('Token decoding error:', error);
        }
    };
    //#endregion

    return (
        <>
            <div>
                <div style={headerStyle}>
                    <a href='/'>
                        <img
                            src='./Image/Logo.png'
                            alt=''
                            style={{ width: '18%' }}
                        />
                    </a>
                </div>
                {contextHolder}
                {/* Form đăng nhập */}
                <div style={ContentStyle}>
                    <div style={{ width: '80%' }}>
                        <img
                            src='./Image/SubLogo.png'
                            alt=''
                            style={{ width: '100%' }}
                        />
                    </div>
                    <div style={{ marginTop: '130px', width: '50%' }}>
                        <Form
                            style={FormStyle}
                            onFinish={handleLogin}
                        >
                            <div style={{ width: '70%', margin: 'auto', marginTop: '40px' }}>
                                <Input
                                    className='form-control'
                                    placeholder='Email hoặc số điện thoại'
                                    name='inputEmail'
                                    onChange={handleInputLogin}
                                />
                            </div>
                            <div style={{ width: '70%', margin: 'auto', marginTop: '20px' }}>
                                <Input
                                    type='password'
                                    className='form-control'
                                    placeholder='Mật khẩu'
                                    name='inputPassword'
                                    onChange={handleInputLogin}
                                />
                            </div>
                            <div
                                style={{ width: '100%', marginTop: '20px', display: 'flex', justifyContent: 'center' }}
                            >
                                <Button
                                    style={DangNhapButton}
                                    htmlType='submit'
                                >
                                    Đăng Nhập
                                </Button>
                            </div>
                            <p style={{ textAlign: 'center', color: '#2484ba', margin: '5px' }}>
                                <a onClick={() => setQuenMatKhau(true)}>Quên mật khẩu</a>
                            </p>
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'center', margin: '7px 0' }}>
                                    <GoogleOAuthProvider clientId='1052205370596-76sbqeq3ccbljcj1ac238pv1bp3ddsb7.apps.googleusercontent.com'>
                                        <GoogleLogin
                                            locale='en'
                                            onSuccess={(token) => {
                                                onLoginWithGoogle(token.credential);
                                            }}
                                            onError={() => {
                                                openNotificationLoginFailly('topRight');
                                            }}
                                        />
                                    </GoogleOAuthProvider>
                                </div>
                                <p style={{ textAlign: 'center' }}>
                                    Bạn chưa có tài khoản?{' '}
                                    <a
                                        onClick={() => setShowDangKy(true)}
                                        style={{ color: '#2484ba' }}
                                    >
                                        Đăng ký tại đây.
                                    </a>
                                </p>
                            </div>
                        </Form>
                    </div>
                </div>
                <p style={{ color: '#4f8eed', fontSize: '50px', fontWeight: 'bold', textAlign: 'center', margin: '0' }}>
                    Học, học nữa, học mãi
                </p>
            </div>

            {/*Form Đăng ký*/}
            <Modal
                title={<h2 style={{ color: '#2484ba', fontSize: '20px', fontWeight: 'bold' }}>Đăng Ký</h2>}
                visible={showDangKy}
                okText='Đăng ký'
                onOk={handleRegister}
                onCancel={() => {
                    setShowDangKy(false);
                    setRegisterInput('');
                    setErrors('');
                }}
            >
                <Form className='container w-100'>
                    <div className='row mb-3'>
                        <div className='col-lg-6'>
                            <Input
                                type=''
                                placeholder='Họ'
                                className='form-control'
                                name='inputHo'
                                value={registerInput.inputHo}
                                onChange={handleInputRegister}
                            />
                            {errors.inputHo && (
                                <div
                                    className='invalid-feedback'
                                    style={{ display: 'block', color: 'red' }}
                                >
                                    {errors.inputHo}
                                </div>
                            )}
                        </div>
                        <div className='col-lg-6'>
                            <Input
                                type='text'
                                placeholder='Tên'
                                className='form-control'
                                name='inputTen'
                                value={registerInput.inputTen}
                                onChange={handleInputRegister}
                            />
                            {errors.inputTen && (
                                <div
                                    className='invalid-feedback'
                                    style={{ display: 'block', color: 'red' }}
                                >
                                    {errors.inputTen}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='form-group mb-3'>
                        <Input
                            type='email'
                            placeholder='Email'
                            className='form-control'
                            name='inputEmail'
                            value={registerInput.inputEmail}
                            onChange={handleInputRegister}
                        />
                        {errors.inputEmail && (
                            <div
                                className='invalid-feedback'
                                style={{ display: 'block', color: 'red' }}
                            >
                                {errors.inputEmail}
                            </div>
                        )}
                    </div>
                    <div className='form-group mb-3'>
                        <Input
                            type='text'
                            placeholder='Số điện thoại'
                            className='form-control'
                            name='inputPhone'
                            value={registerInput.inputPhone}
                            onChange={handleInputRegister}
                        />
                        {errors.inputPhone && (
                            <div
                                className='invalid-feedback'
                                style={{ display: 'block', color: 'red' }}
                            >
                                {errors.inputPhone}
                            </div>
                        )}
                    </div>
                    <div className='form-group'>
                        <Input
                            className='form-control'
                            type='text'
                            placeholder='Tên trường'
                            name='inputSchoolName'
                            value={registerInput.inputSchoolName}
                            onChange={handleInputRegister}
                        />
                    </div>
                </Form>
            </Modal>

            {/* Form quên mật khẩu */}
            <Modal
                title={<h2 style={{ color: '#2484ba', fontSize: '20px', fontWeight: 'bold' }}>Quên mật khẩu</h2>}
                visible={showQuenMatKhau}
                okText='Gửi'
                onOk={handleForgorPassword}
                onCancel={() => {setQuenMatKhau(false); setErrors(""); setEmaiForgot(""); onSetRender();}}
            >
                <div className='mainAuth'>
                    <Form
                        name='normal_login'
                        className='login-form'
                        initialValues={{
                            remember: true,
                        }}
                    >
                        <Form.Item
                            name="email"
                        >
                            <Input placeholder="Nhập email" type='email' value={emailforgot} onChange={(e) => setEmaiForgot(e.target.value)} />
                            {errors.emailforgot && (
                                <div
                                    className='invalid-feedback'
                                    style={{ display: 'block', color: 'red' }}
                                >
                                    {errors.emailforgot}
                                </div>
                            )}
                        </Form.Item>
                        <Form.Item>
                            <p style={{ textAlign: 'center' }}>
                                Bạn sẽ nhận được mật khẩu mới do chúng tôi cung cấp. Vui lòng vào email của bạn để nhận
                                mật khẩu.
                            </p>
                        </Form.Item>
                        <Form.Item style={{ marginTop: '-20px' }}>
                            {/* <Button type="primary" htmlType='submit' block className="login-form-button" style={{ margin: '10px 0' }}>
                                Gửi mail
                            </Button> */}
                            <p style={{ textAlign: 'center' }}>
                                Bạn chưa có tài khoản?{' '}
                                <a
                                    onClick={() => (setShowDangKy(true), setQuenMatKhau(false))}
                                    style={{ color: '#2484ba' }}
                                >
                                    Đăng ký tại đây.
                                </a>
                            </p>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </>
    );
}
