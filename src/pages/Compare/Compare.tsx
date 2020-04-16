import React from 'react';
import PageTitle from '../../components/PageTitle/PageTitle';
import { Row, Col } from 'antd';

const Compare = () => {

    return(
        <div>
            <Row gutter={[16, 32]}>
                <Col span={24}>
                    <PageTitle title="Compare countries" />
                </Col>
            </Row>

        </div>
    );
}

export default Compare;