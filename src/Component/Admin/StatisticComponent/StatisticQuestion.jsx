import { Card, Col, Row } from 'antd';
import 'bootstrap/dist/css/bootstrap.css';
import { useState, useEffect } from 'react';
import { Pie } from '@ant-design/plots';

export default function StatisticQuestion() {

    const data = [
        {
            sex: '男',
            sold: 0.45,
        },
        {
            sex: '女',
            sold: 0.55,
        },
    ];
    const config = {
        appendPadding: 10,
        data,
        angleField: 'sold',
        colorField: 'sex',
        radius: 0.8,
        legend: false,
        label: {
            type: 'inner',
            offset: '-50%',
            style: {
                fill: '#fff',
                fontSize: 18,
                textAlign: 'center',
            },
        },
        pieStyle: ({ sex }) => {
            if (sex === '男') {
                return {
                    fill: 'p(a)https://gw.alipayobjects.com/zos/antfincdn/FioHMFgIld/pie-wenli1.png',
                };
            }

            return {
                fill: 'p(a)https://gw.alipayobjects.com/zos/antfincdn/Ye2DqRx%2627/pie-wenli2.png',
            };
        },
        tooltip: false,
        interactions: [
            {
                type: 'element-single-selected',
            },
        ],
    };

    return (
        <div className='mt-5'>
            <h1
                style={{
                    fontSize: "30px",
                    marginBottom: "20px",
                }}
            >
                Thống kê câu hỏi
            </h1>
            <div className='chart dl-flex justify-content-around mt-5 row' style={{ width: '90%' }}>
                <div className='col-5'>
                    <p className='text-center' style={{ fontWeight: 'bold', fontSize: '15px' }}>Số lượng câu hỏi theo dạng bài</p>
                    <Pie {...config} />
                </div>
                <div className='col-5'>
                    <p className='text-center' style={{ fontWeight: 'bold', fontSize: '15px' }}>Số lượng câu hỏi theo độ khó</p>
                    <Pie {...config} />
                </div>
            </div>
        </div>
    )
}