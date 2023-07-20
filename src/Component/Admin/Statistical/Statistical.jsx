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
import LineChart from "./LineChart";

const Statistical = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [subjects, setSubjects] = useState([]);
  const [chartData, setChartData] = useState([]);

  //này là vì a k biết data tụi e lấy ren nên tự tạo json tự tạo server ảo tự fetch dề
  const fetchDataSubject = async () => {
    try {
      const response = await fetch(" http://localhost:8080/Subjects");
      const data = await response.json();
      setSubjects(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchDataTestDetail = async () => {
    try {
      const response = await fetch("https://gw.alipayobjects.com/os/antfincdn/3PtP0m%26VuK/trend-data.json");
      const data = await response.json();
      setChartData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  
  useEffect(() => {
    fetchDataSubject();
    fetchDataTestDetail();
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
              minHeight: 600,
              background: colorBgContainer,
            }}
          >
            <LineChart/>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Statistical;
