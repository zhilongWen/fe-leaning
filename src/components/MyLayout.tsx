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
import { useNavigate, useLocation } from 'react-router-dom';

const {Header, Sider, Content} = Layout;

const MyLayout = ({children}: any) => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();
    const navigate = useNavigate();

    // @ts-ignore
    return (
        <Layout
            style={{width: '100vw', height: '100vw'}}
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
                    onClick={({key}) => {
                        // alert(key)
                        console.log(key)
                        navigate(key)
                    }}
                    items={[
                        {
                            key: '/admin/dashboard',
                            icon: <UserOutlined/>,
                            label: '看板',
                        },
                        {
                            key: '/admin/medicine',
                            icon: <VideoCameraOutlined/>,
                            label: '药品管理',
                            children: [
                                {
                                    label: '药品分类',
                                    key: '/admin/medicine/categories',
                                },
                                {
                                    label: '药品列表',
                                    key: '/admin/medicine/list',
                                }
                            ]
                        },
                        {
                            key: '/admin/medicines',
                            icon: <UploadOutlined/>,
                            label: '文章管理',
                            children: [
                                {
                                    label: '文章分类',
                                    key: '/admin/medicines/categories',
                                },
                                {
                                    label: '文章列表',
                                    key: '/admin/medicines/list',
                                }
                            ]
                        },
                        {
                            key: '/admin/users',
                            icon: <UploadOutlined/>,
                            label: '会员信息',
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