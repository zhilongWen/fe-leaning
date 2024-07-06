import React, {useState} from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import {Button, Layout, Menu, theme} from 'antd';
import logo from '../assets/logo.jpeg'

const {Header, Sider, Content} = Layout;

const MyLayout = ({children}: any) => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();

    // @ts-ignore
    return (
        <Layout
            style={{width: '100vw',height: '100vw'}}
            id='components-layout-demo-custom-trigger'
        >
            <Sider trigger={null} collapsible collapsed={collapsed} style={{background: 'white'}}>
                <div className="demo-logo-vertical">
                    <img src={logo} alt='好大夫'/>
                </div>
                <Menu
                    theme="light"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <UserOutlined/>,
                            label: '看板',
                        },
                        {
                            key: '2',
                            icon: <VideoCameraOutlined/>,
                            label: '药品管理',
                            children: [
                                {
                                    label: '药品分类' ,
                                    key: '/admin/medicine_catalogs',
                                },
                                {
                                    label: '药品分类1' ,
                                    key: '/admin/medicine_catalogs1',
                                }
                            ]
                        },
                        {
                            key: '3',
                            icon: <UploadOutlined/>,
                            label: '文章管理',
                            children: [
                                {
                                    label: ' 文章分类' ,
                                    key: '/admin/medicine_catalogs',
                                }
                            ]
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header style={{padding: 0, background: colorBgContainer}}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};

export default MyLayout;