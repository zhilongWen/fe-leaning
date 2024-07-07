import {Button, Card, Form, Input, message, Modal, Space, Table} from "antd";
import {PlusOutlined, SearchOutlined} from '@ant-design/icons'
import {useState} from "react";
import MyUpload from "../../components/MyUpload.tsx";

function MedicineCategories() {

    const [isShow, setIsShow] = useState(false) // 控制modal显示和隐藏
    const [myForm] = Form.useForm(); // 可以获取表单元素实例

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
                    <Form layout='inline'>
                        <Form.Item label='名字'>
                            <Input placeholder='请输入关键词'/>
                        </Form.Item>
                        <Form.Item>
                            <Button type='primary' icon={<SearchOutlined/>}/>
                        </Form.Item>
                    </Form>
                    <Table
                        columns={[
                            {
                                title: '序号',
                                width: 80,
                                align: 'center'
                            },
                            {
                                title: '名字',
                                width: 80,
                                align: 'center'
                            },
                            {
                                title: '主图',
                                width: 120,
                                align: 'center'
                            },
                            {
                                title: '简介',
                                align: 'center'
                            },
                            {
                                title: '操作',
                                width: 100,
                                align: 'center'
                            },
                        ]}
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
                onOk={() => {
                    // message.success('保存成功')
                    myForm.submit() // 主动提交表单的提交事件
                }}
            >
                <Form
                    onFinish={(v) => {
                        message.success('保存成功')
                        console.log(v)
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