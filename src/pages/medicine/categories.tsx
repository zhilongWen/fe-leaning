import {Button, Card, Form, Input, Space, Table} from "antd";
import {PlusOutlined, SearchOutlined} from '@ant-design/icons'

function MedicineCategories() {
    return (
        <Card
            title='药品分类'
            extra={
                <>
                    <Button type='primary' icon={<PlusOutlined/>}/>
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
    )
}

export default MedicineCategories