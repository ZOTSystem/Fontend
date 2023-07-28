import { UploadOutlined } from "@ant-design/icons";
import { Button, Modal, Upload } from "antd";
import { useState, useContext } from "react";
import readXlsxFile from "read-excel-file";
import { UserContext } from "../../../contexts/UserContext";
import { CommonNotification } from "../../../utils/CommonNotification";
import axios from "axios";

export default function CreateQuestionsExcel() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState(null);
  const { render, onSetRender } = useContext(UserContext);
  const props = {
    name: "file",
    maxCount: 1,
    accept: ".xls, .xlsx",
    fileList: file ? [file] : [],
    beforeUpload: (file) => {
      setFile(file);
      return false;
    },
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setFile();
  };

  // handle the upload file.

  const handleUpload = async () => {
    try {
      if (file) {
        const rows = await readXlsxFile(file);
        console.log(rows);
        setIsModalOpen(!isModalOpen);
        setFile();
        CommonNotification(
          "Notification",
          "Upload users by Excel file Successfully !",
          "success"
        );
        onSetRender();
      } else {
        // Handle file not selected error
        console.log("Please select a file to upload.");
      }
    } catch (error) {
      // Handle error
      console.log("Error occurred while uploading:", error);
      CommonNotification(
        "Notification",
        "Error occurred while uploading users!",
        "warning"
      );
    }
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Thêm Question bằng Excel
      </Button>
      <Modal
        title="Upload Excel"
        open={isModalOpen}
        onOk={handleUpload}
        okText="Create Users"
        onCancel={handleCancel}
      >
        <Upload {...props}>
          <Button icon={<UploadOutlined />}>Chọn File</Button>
        </Upload>
      </Modal>
    </>
  );
}


