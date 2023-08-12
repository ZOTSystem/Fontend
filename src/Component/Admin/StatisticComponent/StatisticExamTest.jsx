import { Card, Col, Row } from 'antd';
import 'bootstrap/dist/css/bootstrap.css';
import { useState, useEffect } from 'react';
import { Area } from '@ant-design/plots';

export default function StatisticExamTest() {

    const [data, setData] = useState([]);

    useEffect(() => {
        asyncFetch();
    }, []);

    const asyncFetch = () => {
        fetch('https://gw.alipayobjects.com/os/bmw-prod/360c3eae-0c73-46f0-a982-4746a6095010.json')
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => {
                console.log('fetch data failed', error);
            });
    };
    const config = {
        data,
        xField: 'timePeriod',
        yField: 'value',
        xAxis: {
            range: [0, 1],
        },
    };

    return (
        <div className='mt-5'>
            <h1
                style={{
                    fontSize: "30px",
                    marginBottom: "20px",
                }}
            >
                Thống kê bài thi
            </h1>
            <Row gutter={16}>
                <Col span={6}>
                    <Card title="Tổng số bài thi" bordered={false} style={{ background: '#9999FF', fontSize: "30px", fontWeight: 'bold', borderRadius: '50px' }}>
                        130
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title="Tổng số bài thi tạo trong ngày" bordered={false} style={{ background: '#99CCFF', fontSize: "30px", fontWeight: 'bold', borderRadius: '50px' }}>
                        12
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title="Tổng số bài thi tạo trong tháng" bordered={false} style={{ background: '#ffb371', fontSize: "30px", fontWeight: 'bold', borderRadius: '50px' }}>
                        35
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title="Tổng số bài thi tạo trong năm" bordered={false} style={{ background: '#99FFCC', fontSize: "30px", fontWeight: 'bold', borderRadius: '50px' }} >
                        60
                    </Card>
                </Col>
            </Row>
            <div className='chart w-75 m-auto mt-5'>
                <p className='text-center' style={{ fontWeight: 'bold', fontSize: '15px' }}>Thống kê số lượng bài thi theo tháng</p>
                <Area {...config} />
            </div>
            <div className='chart w-75 m-auto mt-5'>
                <p className='text-center' style={{ fontWeight: 'bold', fontSize: '15px' }}>Thống kê số lượng bài thi trong năm</p>
                <Area {...config} />
            </div>
        </div>
    )
}