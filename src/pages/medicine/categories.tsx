import {Button, Card, Form, Input, message, Modal, Space, Table} from "antd";
import {DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined} from '@ant-design/icons'
import {useEffect, useState} from "react";
import MyUpload from "../../components/MyUpload.tsx";
import {insertAPI, loadDataAPI, updateByIdAPI} from "../../service/medicine-categories.ts";
import {dalImg} from "../../utils/tools.ts";

function MedicineCategories() {

    const [isShow, setIsShow] = useState(false) // 控制modal显示和隐藏
    const [myForm] = Form.useForm(); // 可以获取表单元素实例

    const [query, setQuery] = useState({}); // 查询条件
    const [data, setData] = useState([]);

    const [currentId, setCurrentId] = useState(''); // 当前id，如果为空表示新增

    useEffect(() => {
        loadDataAPI(query).then((res) => {
            console.log(res)
            setData(res.data)
        })
    }, [query]); // 监听query改变


    useEffect(() => {
        if (!isShow) {
            // 关闭弹窗之后重置数据
            setCurrentId('');
            // setImageUrl('');
        }
    }, [isShow]);

    return (
        <>
            <Card
                title='药品分类'
                extra={
                    <>
                        <Button
                            type='primary'
                            icon={<PlusOutlined/>}
                            onClick={() => {
                                setIsShow(true)
                            }}
                        />
                    </>
                }
            >
                <Space direction='vertical' style={{width: '100%'}}>
                    <Form
                        layout='inline'
                        onFinish={(v) => {
                            message.success('查询成功')
                        }}
                    >
                        <Form.Item label='名字' name='name'>
                            <Input placeholder='请输入关键词'/>
                        </Form.Item>
                        <Form.Item>
                            <Button type='primary' htmlType='submit' icon={<SearchOutlined/>}/>
                        </Form.Item>
                    </Form>
                    <Table
                        dataSource={data}
                        rowKey='id' // 每行有个不重复的值
                        columns={[
                            {
                                title: '序号',
                                width: 80,
                                align: 'center',
                                render(v, r, i) {
                                    return <>{i + 1}</>;
                                },
                            },
                            {
                                title: '名字',
                                width: 80,
                                dataIndex: 'name',
                                align: 'center'
                            },
                            {
                                title: '主图',
                                width: 120,
                                align: 'center',
                                render(v, r: any) {
                                    return (
                                        <img className='t-img' src={dalImg(r.image)} alt={r.name}/>
                                    );
                                },
                            },
                            {
                                title: '简介',
                                align: 'center',
                                dataIndex: 'desc'
                            },
                            {
                                title: '操作',
                                width: 100,
                                align: 'center',
                                render(v, r: any) {
                                    return (
                                        <Space>
                                            <Button
                                                type='primary'
                                                icon={<EditOutlined/>}
                                                size='small'
                                                onClick={() => {
                                                    setIsShow(true)
                                                    setCurrentId(r.id)      // 通过是否有 id 来区分新增和修改
                                                    myForm.setFieldsValue(r)
                                                }}
                                            />
                                            <Button type='primary' icon={<DeleteOutlined/>} size='small' danger/>
                                        </Space>
                                    )
                                }
                            },
                        ]}
                        pagination={{
                            defaultCurrent: 1,
                            defaultPageSize: 10 ,
                            showSizeChanger: true,
                            pageSizeOptions: [2,5,10,20,30]
                        }}
                    >

                    </Table>
                </Space>
            </Card>


            <Modal
                title='编辑'
                open={isShow}
                // 点击遮罩层不关闭
                maskClosable={false}
                onCancel={() => setIsShow(false)}
                // 关闭modal的时候清楚数据
                destroyOnClose
                onOk={() => {
                    // message.success('保存成功')
                    myForm.submit() // 主动提交表单的提交事件
                }}
            >
                <Form
                    // 表单配合modal一起使用的时候，需要设置这个属性，要不然关了窗口之后不会清空数据
                    preserve={false}
                    onFinish={async (v) => {
                        // console.log(v)
                        // console.log("currentId " + currentId)

                        if (currentId){   // 通过是否有 id 来区分新增和修改
                            await updateByIdAPI(currentId,v)
                        }else{
                            await insertAPI(v)
                        }

                        message.success('保存成功')
                        setIsShow(false) // 关闭模态框
                        setQuery({}) // 刷新数据
                    }}
                    labelCol={{span: 3}}
                    form={myForm}
                >
                    <Form.Item
                        label='名字'
                        name='name'
                        rules={[
                            {
                                required: true,
                                message: '请输入名字'
                            }
                        ]}
                    >
                        <Input placeholder='请输入名字'/>
                    </Form.Item>
                    <Form.Item label='主图'>
                        <MyUpload/>
                    </Form.Item>
                    <Form.Item label='简介' name='desc'>
                        <Input.TextArea placeholder='请输入简介'/>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default MedicineCategories