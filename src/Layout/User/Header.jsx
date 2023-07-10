import "../../assets/HeaderNavStyle.css";
import 'bootstrap/dist/css/bootstrap.css';
import { Dropdown } from 'antd';
import { useState } from "react";
import Navbar from "./Navbar";

export default function Header() {

    const itemsOfAvatar = [
        {
            key: '1',
            label: (
                <>
                    <div>
                        <a href="/profile" style={{ textDecoration: 'none', color: 'black' }}>
                            <button type="button" tabindex="0" role="menuitem" class="sc-dOSReg lhXIuw dropdown-item" style={{color: "black"}}>
                                <svg width="21" height="21" viewBox="0 0 21 21" fill="#000000" class="nav-icon"><path d="M18.75 0.75H6.75C6.21957 0.75 5.71086 0.960714 5.33579 1.33579C4.96071 1.71086 4.75 2.21957 4.75 2.75V14.75C4.75 15.2804 4.96071 15.7891 5.33579 16.1642C5.71086 16.5393 6.21957 16.75 6.75 16.75H18.75C19.2804 16.75 19.7891 16.5393 20.1642 16.1642C20.5393 15.7891 20.75 15.2804 20.75 14.75V2.75C20.75 2.21957 20.5393 1.71086 20.1642 1.33579C19.7891 0.960714 19.2804 0.75 18.75 0.75ZM12.75 3.25C13.413 3.25 14.0489 3.51339 14.5178 3.98223C14.9866 4.45107 15.25 5.08696 15.25 5.75C15.25 6.41304 14.9866 7.04893 14.5178 7.51777C14.0489 7.98661 13.413 8.25 12.75 8.25C12.087 8.25 11.4511 7.98661 10.9822 7.51777C10.5134 7.04893 10.25 6.41304 10.25 5.75C10.25 5.08696 10.5134 4.45107 10.9822 3.98223C11.4511 3.51339 12.087 3.25 12.75 3.25ZM17.75 13.75H7.75V13.5C7.75 11.651 10.004 9.75 12.75 9.75C15.496 9.75 17.75 11.651 17.75 13.5V13.75Z" fill="#000000"></path><path d="M2.75 6.75H0.75V18.75C0.75 19.853 1.647 20.75 2.75 20.75H14.75V18.75H2.75V6.75Z" fill="#000000"></path></svg>
                                Hồ sơ cá nhân
                            </button>
                        </a>
                    </div>
                </>
            ),
        },
        {
            key: '3',
            label: (
                <>
                    <div>
                        <a href="/login" style={{ textDecoration: 'none', color: 'black' }}>
                            <button type="button" tabindex="0" role="menuitem" class="sc-dOSReg lhXIuw dropdown-item" style={{color: 'black'}}>
                                <img src="../Image/logout.391c8b0f.svg" alt="" width={16} height={20} style={{marginRight: '10px', marginLeft: '5px'}}/>
                                Đăng xuất
                            </button>
                        </a>
                    </div>
                </>
            ),
        },
    ];

    return (
        <div className='sc-ezrdKe bAYFRD header'>
            <div className="divHeader" style={{ background: '#85b6ff' }}>
                <div className="headerLeft" style={{ paddingLeft: '15%' }}>
                    <div className="imgLogo">
                        <img src="../Image/Logo.png" alt="" />
                    </div>
                    <div className="slogun">
                        <span>Website luyện thi đại học tốt nhất Việt Nam</span>
                    </div>
                </div>
                <div className="headerRight">
                    {/* <a className="btnDangNhap" href="/login">Đăng nhập</a> */}
                    <Dropdown
                        menu={{
                            items: itemsOfAvatar,
                        }}
                    >
                        <div style={{ borderRadius: '50%', border: '3px solid white', padding: '10px' }}>
                            <img src="../Image/Avatar_Null.png" alt="" width={40} height={50} />
                        </div>
                    </Dropdown>

                </div>
            </div>
            <div style={{ width: '80%', margin: 'auto' }}>
                <Navbar />
            </div>

        </div>
    )
}