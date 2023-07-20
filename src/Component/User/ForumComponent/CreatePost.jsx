import { PlusOutlined } from '@ant-design/icons';
import { Avatar, Button, Form, Input, Select, Upload, Modal, Space } from 'antd';
import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useState } from 'react';
import '../../../assets/Forum.css';
import '../../../assets/Style.css';
import TextArea from 'antd/es/input/TextArea';
import { useContext } from 'react';
import { SubjectContext } from '../../../contexts/SubjectContext';
import { PostContext } from '../../../contexts/PostContext';
import { storage } from '../../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
const url = '../Image/Forum/forum-avatar1.png';
const anh = '../Image/Forum/icon-anh-video.png';
const monhoc = '../Image/Forum/icon-sach.png';
const tag = '../Image/Forum/icon-tag.png';

export default function CreatePost() {
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const [formValue, setFormValue] = useState({ subjectId: null, postText: '', postFile: '' });
    const [fileUpload, setFileUpload] = useState(null);
    const [fileUrl, setFileUrl] = useState('');
    const { subjects } = useContext(SubjectContext);
    const { handleAddPost } = useContext(PostContext);
    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    const showModal = () => {
        setOpen(true);
    };

    const cancelModal = () => {
        setOpen(false);
        form.resetFields();
    };
    const uploadImage = () => {
        if (fileUpload == null) return;
        const fileRef = ref(storage, `images/${fileUpload.name + v4()}`);
        uploadBytes(fileRef, fileUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setFileUrl(url);
            });
        });
    };

    const handleSubmitAddPostForm = async () => {
        uploadImage();
        handleAddPost({ ...formValue, postFile: fileUrl });
        setFileUrl('');
        cancelModal();
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
            >
                <div className='form'>
                    <Input
                        onClick={showModal}
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
                    open={open}
                    okText='Đăng bài'
                    cancelText='Đóng'
                    onCancel={cancelModal}
                    onOk={handleSubmitAddPostForm}
                >
                    <Form
                        form={form}
                        layout='horizontal'
                        initialValues={formValue}
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
                            <Select
                                label='Môn học'
                                onChange={(subjectValue) => setFormValue({ ...formValue, subjectId: subjectValue })}
                                defaultValue={0}
                            >
                                <Select.Option value={0}>-- Vui lòng chọn môn học --</Select.Option>
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
                                onChange={(e) => setFormValue({ ...formValue, postText: e.target.value })}
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
                                listType='picture-card'
                                onChange={(file) => setFileUpload(file)}
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
