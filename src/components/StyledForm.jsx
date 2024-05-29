import { ConfigProvider, Grid } from 'antd';
import React from 'react';

const StyledForm = ({ children }) => {
    const breakpoints = Grid.useBreakpoint();

    return (
        <ConfigProvider
            theme={{
                components: {
                    Form: {
                        labelColor: '#fff',
                        labelFontSize: breakpoints.xxl ? 14 : 13,
                        itemMarginBottom: breakpoints.xxl ? 24 : 13,
                    },
                    Checkbox: {
                        colorText: '#fff',
                        colorPrimary: 'rgba(87, 33, 189, 1)',
                        colorPrimaryBorder: 'rgba(87, 33, 189, 1)',
                        colorPrimaryHover: '#742ef7',
                    },
                    Segmented: {
                        itemSelectedBg: '#7534ee',
                        itemSelectedColor: '#fff',
                    },
                },
            }}>
            {children}
        </ConfigProvider>
    );
};

export default StyledForm;
