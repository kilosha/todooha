import React from 'react';
import { TinyColor } from '@ctrl/tinycolor';
import { Button, ConfigProvider } from 'antd';

const btnColors = ['rgba(17,9,157,1)', 'rgba(87,33,189,1)', 'rgba(134,26,145,1)'];

const getHoverColors = (colors) =>
    colors.map((color) => new TinyColor(color).lighten(5).toString());
const getActiveColors = (colors) =>
    colors.map((color) => new TinyColor(color).darken(5).toString());
const getDisabledColors = (colors) =>
    colors.map((color) => new TinyColor(color).brighten(10).toString());

const MyButton = ({ handleBtnClick, disabled }) => (
    <ConfigProvider
        theme={{
            components: {
                Button: {
                    colorPrimary: `linear-gradient(135deg, ${btnColors.join(', ')})`,
                    colorPrimaryHover: `linear-gradient(135deg, ${getHoverColors(btnColors).join(
                        ', ',
                    )})`,
                    colorPrimaryActive: `linear-gradient(135deg, ${getActiveColors(btnColors).join(
                        ', ',
                    )})`,
                    lineWidth: 0,
                    colorBgContainerDisabled: `linear-gradient(135deg, ${getDisabledColors(
                        btnColors,
                    ).join(', ')})`,
                    colorTextDisabled: '#ffffff61',
                },
            },
        }}>
        <Button type="primary" size="large" onClick={handleBtnClick} disabled={disabled}>
            Add Task
        </Button>
    </ConfigProvider>
);

export default MyButton;
