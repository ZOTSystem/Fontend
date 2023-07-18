import { useState, useEffect } from "react";
import SiderAdmin from "../../../Layout/Admin/SiderAdmin";
import HeaderAdmin from "../../../Layout/Admin/HeaderAdmin";
import {
  DatePicker,
  Dropdown,
  Breadcrumb,
  Layout,
  Table,
  Input,
  Modal,
  Form,
  notification,
  Button,
  theme,
  Card,
  Timeline,
  Tooltip,
  Select,
  Space,
} from "antd";
import { Content } from "antd/es/layout/layout";
import Filter from "./Filter";

const Statistical = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [subjects, setSubjects] = useState([]);

  //này là vì a k biết data tụi e lấy ren nên tự tạo json tự tạo server ảo tự fetch dề
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(" http://localhost:8080/Subjects");
        const data = await response.json();
        setSubjects(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  
  console.log(subjects);
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SiderAdmin />
      <Layout className="site-layout">
        <HeaderAdmin />
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
            <Breadcrumb.Item>Quản lý</Breadcrumb.Item>
            <Breadcrumb.Item>Thống kê</Breadcrumb.Item>
          </Breadcrumb>
          <Filter subjects={subjects} colorBgContainer={colorBgContainer} />
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          ></div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Statistical;
