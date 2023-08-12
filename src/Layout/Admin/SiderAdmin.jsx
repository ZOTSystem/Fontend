import { useState, useContext } from "react";
import { UserOutlined, FundOutlined, FileUnknownOutlined, UsergroupAddOutlined, HddOutlined, WechatOutlined, FolderOpenOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import Login from "../../Component/Auth/Login";

const { Sider } = Layout;

export default function SiderAdmin() {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);

    const {user} = useContext(UserContext);

    function getItem(label, key, icon, path, children) {
        return {
            key,
            icon,
            path,
            children,
            label,
        };
    }

    const adminMenu = [
        getItem('Thống kê', '/admin/statistics', <FundOutlined />, '/admin/statistics', null),
        getItem('Quản lý người dùng', '/admin/manageUser', <UserOutlined />, '/admin/manageUser', null),
        getItem('Quản lý Mod', '/admin/manageMod', <UsergroupAddOutlined />, '/admin/manageMod', null),
        getItem('Quản lý câu hỏi', '/admin/manageQuestion', <FileUnknownOutlined />, '/admin/manageQuestion', null),
        getItem('Quản lý bộ đề', '/admin/manageTopic', <FolderOpenOutlined />, '/admin/manageTopic', null),
        getItem('Quản lý diễn đàn', '/admin/manageForum', <WechatOutlined />, '/admin/manageForum', null),
        getItem('Quản lý Tin tức', '/admin/manageNews', <HddOutlined />, '/admin/manageNews', null),
    ];

    const modMenu = [
        getItem('Quản lý câu hỏi', '/admin/manageQuestion', <FileUnknownOutlined />, '/admin/manageQuestion', null),
        getItem('Quản lý bộ đề', '/admin/manageTopic', <FolderOpenOutlined />, '/admin/manageTopic', null),
        getItem('Quản lý Tin tức', '/mod/manageNews', <HddOutlined />, '/mod/manageNews', null),
    ]


    const items = user.roleId == "2" ? adminMenu : user.roleId == "3" ? modMenu : adminMenu;

    const onClick = (value) => {
        window.location.href = 'http://localhost:3000' + value.key;
    };

    return (
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            trigger={null}
            style={{ background: '#1d70ed' }}
        >
            <div style={{ padding: "20px 15px" }}>
                <a href="" className="d-flex align-items-center">
                    <img
                        className="borederRadius50"
                        src="../Image/Logo.png"
                        style={{ background: "#fff" }}
                        width="50"
                        height="50"
                        alt=""
                    />
                    <span className="ml-3 text-white titleRoomFont" style={{ fontSize: 20, margin: 'auto', fontWeight: 'bold' }}>ZOT System</span>
                </a>
            </div>
            <Menu
                onClick={(key) => onClick(key)}
                theme="dark"
                defaultSelectedKeys={['1']}
                mode="inline"
                items={items}
                style={{ background: '#1d70ed', color: 'white' }}
            />
        </Sider>
    )
}