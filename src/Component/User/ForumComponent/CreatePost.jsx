import { PlusOutlined } from '@ant-design/icons';
import { Avatar, Button, Form, Input, Select, Upload, Modal, Space } from 'antd';
import 'bootstrap/dist/css/bootstrap.css';
import React, { useEffect, useState } from 'react';
import '../../../assets/Forum.css';
import '../../../assets/Style.css';
import TextArea from 'antd/es/input/TextArea';
const url = '../Image/Forum/forum-avatar1.png';
const anh = '../Image/Forum/icon-anh-video.png';
const monhoc = '../Image/Forum/icon-sach.png';
const tag = '../Image/Forum/icon-tag.png';

export default function CreatePost() {
    const [open, setOpen] = useState(false);

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    const SubmitButton = ({ form }) => {
        const [submittable, setSubmittable] = React.useState(false);
        const values = Form.useWatch([], form);
        React.useEffect(() => {
            form.validateFields({
                validateOnly: true,
            }).then(
                () => {
                    setSubmittable(true);
                },
                () => {
                    setSubmittable(false);
                }
            );
        }, [values]);
        return (
            <Button
                type='primary'
                htmlType='submit'
                disabled={!submittable}
            >
                Đăng
            </Button>
        );
    };
    // const [form] = Form.useForm();

    useEffect(() => {
        setOpen();
    }, []);

    const handleCreatePost = () => {
        console.log(open);
        setOpen(false);
    };

    return (
        <>
            <div
                className='createPost'
                type='primary'
                onClick={() => setOpen(true)}
            >
                <div className='form'>
                    <Input
                        size='large'
                        placeholder='What is your mind?'
                        prefix={<Avatar src={url} />}
                    />
                    <hr></hr>
                    <div className='bottom-form'>
                        <div className='item-bottom-form'>
                            <img src={anh}></img>
                            <label>Ảnh/Video</label>
                        </div>
                        <div className='item-bottom-form'>
                            <img src={tag}></img>
                            <label>Tag</label>
                        </div>
                        <div className='item-bottom-form'>
                            <img src={monhoc}></img>
                            <label>Môn học</label>
                        </div>
                    </div>
                </div>

                <Modal
                    title='Tạo bài viết'
                    visible={open}
                    okText='Đăng bài'
                    cancelText='Đóng'
                    onCancel={() => {
                        setOpen(false);
                    }}
                    onOk={handleCreatePost}
                >
                    <Form
                        // form={form}
                        layout='horizontal'
                    >
                        <Form.Item
                            label='Môn học'
                            className='input-form'
                            name='mon'
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Select label='Môn học'>
                                <Select.Option value='1'>Toán</Select.Option>
                                <Select.Option value='2'>Văn</Select.Option>
                                <Select.Option value='3'>Anh</Select.Option>
                                <Select.Option value='4'>Sinh</Select.Option>
                                <Select.Option value='5'>Sử</Select.Option>
                                <Select.Option value='6'>Địa</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label='Loại câu hỏi'
                            className='input-form'
                            name='cauhoi'
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Select>
                                <Select.Option value='1'>Lý thuyết</Select.Option>
                                <Select.Option value='2'>Bài tập</Select.Option>
                            </Select>
                        </Form.Item>
                        {/* <Avatar src={url} /> */}
                        <Form.Item
                            name='text'
                            rules={[
                                {
                                    required: true,
                                    message: '',
                                },
                            ]}
                        >
                            <TextArea
                                rows={6}
                                placeholder='What is your mind?'
                            />
                        </Form.Item>
                        <Form.Item
                            label='Ảnh/Video'
                            valuePropName='fileList'
                            getValueFromEvent={normFile}
                            style={{
                                marginTop: 10,
                            }}
                        >
                            <Upload
                                action='/upload.do'
                                listType='picture-card'
                            >
                                <div>
                                    <PlusOutlined />
                                </div>
                            </Upload>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </>
    );
}
