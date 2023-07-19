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

const Filter = (props) => {
  return (
    <div
      style={{
        padding: 14,
        background: props.colorBgContainer,
        margin: "16px 0",
        display: "flex",
      }}
    >
      <div
        style={{
          marginRight: 6,
        }}
      >
        <Select
          style={{
            minWidth: "100px",
          }}
          showSearch
          placeholder="Select a subject"
          optionFilterProp="children"
          // onChange={onChange}
          // onSearch={onSearch}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={props.subjects.map((subject) => ({
            value: subject.SubjectID,
            label: subject.SubjectName,
          }))}
        />
      </div>

      <div style={{ marginLeft: 80 }}>
        <Button type="primary">Filter</Button>
        <Button
          style={{
            marginLeft: "5px",
          }}
        >
          Export
        </Button>
      </div>
    </div>
  );
};

export default Filter;
