import { useContext, useRef, useState } from 'react';
import '../../../assets/Forum.css';
import { Button, Form, Select } from 'antd';
import { SubjectContext } from '../../../contexts/SubjectContext';
import { PostContext } from '../../../contexts/PostContext';
import { useSearchParams } from 'react-router-dom';

const FilterPost = () => {
    const [form] = Form.useForm();
    const [selectionValue, setSelectionValue] = useState(null);

    const { subjects } = useContext(SubjectContext);
    const { getAllPost, getPostBySubject } = useContext(PostContext);
    const subjectNameRef = useRef(null);

    const [searchParams, setSearchParams] = useSearchParams();

    const handleSelectionChange = (subjectValue) => {
        setSelectionValue(subjectValue);
        const subjectFound = subjects.find((subject) => subject.subjectId === subjectValue);
        subjectNameRef.current = subjectFound ? subjectFound.subjectName : null;
    };

    const handleSubmitFilterForm = () => {
        if (subjectNameRef.current) {
            getPostBySubject(selectionValue);
            setSearchParams({ subject: `${subjectNameRef.current}` });
        } else {
            getAllPost();
            searchParams.delete('subject');
            setSearchParams({});
        }
    };

    return (
        <Form
            layout='horizontal'
            form={form}
            onFinish={handleSubmitFilterForm}
            id='filter-post-form'
        >
            <Form.Item className='select-box'>
                <Select
                    label='Môn học'
                    defaultValue={0}
                    onChange={(subjectValue) => handleSelectionChange(subjectValue)}
                >
                    <Select.Option value={0}>-- Tất cả môn học --</Select.Option>
                    {subjects?.map((subject) => (
                        <Select.Option
                            key={subject.subjectId}
                            value={subject.subjectId}
                            ref={subjectNameRef}
                        >
                            {subject.subjectName}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item>
                <Button
                    type='primary'
                    htmlType='submit'
                >
                    Lọc
                </Button>
            </Form.Item>
        </Form>
    );
};

export default FilterPost;
