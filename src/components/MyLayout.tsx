import React, {useEffect, useState} from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import {Breadcrumb, Button, Dropdown, Layout, Menu, theme} from 'antd';
import logo from '../assets/logo.jpeg'
import {useNavigate, useLocation} from 'react-router-dom';

const {Header, Sider, Content} = Layout;

const siderMenueData = [
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
        key: '/admin/articles',
        icon: <UploadOutlined/>,
        label: '文章管理',
        children: [
            {
                label: '文章分类',
                key: '/admin/articles/categories',
            },
            {
                label: '文章列表',
                key: '/admin/articles/list',
            }
        ]
    },
    {
        key: '/admin/users',
        icon: <UploadOutlined/>,
        label: '会员信息',
    },
];

const findOpenKeys = (key) => {
    const result: string[] = [];
    const findInfo = (arr: any) => {
        arr.forEach((item: any) => {
            if (key.includes(item.key)) {
                result.push(item.key)
                if (item.children) {
                    findOpenKeys(item.children)   // 使用递归的方式查找当前页面刷新之后的默认选中项
                }
            }
        })
    }
    findInfo(siderMenueData)
    console.log(result)
    return result
}

const findDeepPath = (key: string) => {
    const result: any = []; // 处理完所有的menu数据成为一个一维数组
    const findInfo = (arr: any) => {
        arr.forEach((item: any) => {
            const { children, ...info } = item;
            result.push(info);
            if (children) {
                findInfo(children); // 递归处理子节点
            }
        });
    };
    findInfo(siderMenueData);
    // 根据当前传递的key值过滤数据，获取到当前用来显示的menu item数据
    const tmpData = result.filter((item: any) => key.includes(item.key));
    if (tmpData.length > 0) {
        console.log(tmpData)
        return [{ label: '首页', key: '/admin/dashboard' }, ...tmpData];
    }
    return [];
};

const MyLayout = ({children}: any) => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();
    const navigate = useNavigate();

    const {pathname} = useLocation()
    const tmpOpenKeys = findOpenKeys(pathname)

    const [breadcrumbs, setBreadcrumbs] = useState<any>([]);

    // 监听pathname的改变，重新这是面包屑数据
    useEffect(() => {
        setBreadcrumbs(findDeepPath(pathname));
    }, [pathname]);

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
                    // defaultOpenKeys={['/admin/users', '/admin/articles/list']}
                    // defaultSelectedKeys={['/admin/users', '/admin/articles/list']}
                    defaultOpenKeys={tmpOpenKeys}
                    defaultSelectedKeys={tmpOpenKeys}
                    onClick={({key}) => {
                        // alert(key)
                        console.log(key)
                        navigate(key)
                    }}
                    items={siderMenueData}
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
                    <span className='app-title'>好大夫管理系统</span>
                    <Dropdown
                        menu={{
                            items: [
                                {
                                    label: '个人中心',
                                    key: 'userCenter'
                                },
                                {
                                    label: (
                                        <span onClick={() => {
                                            console.log("退出")
                                            navigate('/')
                                        }}>
                                            退出
                                        </span>
                                    ),
                                    key: 'logOut'
                                }
                            ]
                        }}
                    >
                        <img
                            src={logo}
                            style={{
                                width: '30px',
                                borderRadius: '50%',
                                float: 'right',
                                marginTop: '16px',
                                marginRight: '20px',
                            }}
                        />
                    </Dropdown>
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
                    <Breadcrumb>
                        {breadcrumbs.map((item: any) => (
                            <Breadcrumb.Item key={item.key}>{item.label}</Breadcrumb.Item>
                        ))}

                        {/* <Breadcrumb.Item>Ant Design</Breadcrumb.Item> */}
                    </Breadcrumb>
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};

export default MyLayout;