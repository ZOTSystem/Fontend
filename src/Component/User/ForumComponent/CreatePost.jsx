import { PlusOutlined } from '@ant-design/icons';
import { Avatar, Button, Form, Input, Select, Upload, Modal, Space } from 'antd';
import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useState } from 'react';
import '../../../assets/Forum.css';
import '../../../assets/Style.css';
import TextArea from 'antd/es/input/TextArea';
import { useContext } from 'react';
import { SubjectContext } from '../../../contexts/SubjectContext';
const url = '../Image/Forum/forum-avatar1.png';
const anh = '../Image/Forum/icon-anh-video.png';
const monhoc = '../Image/Forum/icon-sach.png';
const tag = '../Image/Forum/icon-tag.png';

export default function CreatePost({ onCreate }) {
    const [open, setOpen] = useState(false);
    const { subjects } = useContext(SubjectContext);

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    const SubmitButton = ({ form }) => {
        const [submittable, setSubmittable] = useState(false);
        const values = Form.useWatch([], form);
        useEffect(() => {
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

    // useEffect(() => {
    //     setOpen();
    // }, []);

    // const handleCreatePost = () => {
    //     console.log(open);
    //     setOpen(false);
    // };

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
                        placeholder='Bạn đang nghĩ gì thế?'
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
                    onOk={onCreate}
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
                                {subjects?.map((subject) => (
                                    <Select.Option
                                        key={subject.subjectId}
                                        value={subject.subjectId}
                                    >
                                        {subject.subjectName}
                                    </Select.Option>
                                ))}
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
                                placeholder='Bạn đang nghĩ gì thế?'
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
