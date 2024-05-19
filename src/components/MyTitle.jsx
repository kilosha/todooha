import React from 'react';
import { Typography, ConfigProvider } from 'antd';

const MyTitle = ({ title }) => {
    return (
        <ConfigProvider
            theme={{
                components: {
                    Typography: {
                        colorTextHeading: '#fff',
                        fontSizeHeading2: '1.5em',
                        fontWeightStrong: '700',
                        titleMarginBottom: '0.83em',
                        titleMarginTop: '0.83em',
                        lineHeightHeading2: '33px',
                    },
                },
            }}>
            <Typography.Title level={2} className="headerTitle">
                {title}
            </Typography.Title>
        </ConfigProvider>
    );
};

export default MyTitle;
