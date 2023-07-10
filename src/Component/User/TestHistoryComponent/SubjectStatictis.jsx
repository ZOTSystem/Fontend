import { Table, Input, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons'
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';

export default function SubjectStatictis() {
    return (
        <>
            <div className="col-lg-4" >
                <div className="searchSubject w-75" style={{ margin: '10px auto' }}>
                    <Select
                        showSearch
                        style={{
                            width: '100%',
                        }}

                        placeholder="Choose the subject"
                        optionFilterProp="children"
                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        options={[
                            {
                                value: '1',
                                label: 'Toán',
                            },
                            {
                                value: '2',
                                label: 'Anh',
                            },
                            {
                                value: '3',
                                label: 'Vật lý',
                            },
                            {
                                value: '4',
                                label: 'Sinh',
                            },
                            {
                                value: '5',
                                label: 'Hóa học',
                            },
                            {
                                value: '6',
                                label: 'Công nghệ',
                            },
                        ]}
                    />
                </div>
                <div className="statictis mt-3">
                    <div className="w-50 m-auto circleStatics" style={{ height: '250px', background: '#538dd5', borderRadius: '50%', lineHeight: '250px' }}>
                        <p style={{ display: "inline-block", lineHeight: 1.5, textAlign: "center", width: '100%', fontSize: '30px', color: 'white', fontWeight: 500 }}>
                            0%
                        </p>
                    </div>
                </div>
                <div className="mt-3">
                    <p>
                        * Mức độ thành thạo được tính toán và phân tích dựa trên dữ liệu làm bài của bạn trên toàn bộ hệ thống.
                    </p>
                    <p>
                        * Dữ liệu học tập sẽ bắt đầu được xử lý mỗi khi bạn hoàn thành 1 bài luyện hoặc bài kiểm tra
                    </p>
                </div>
            </div>
        </>
    )
}