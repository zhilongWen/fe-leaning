import {Button, Card, Form, Input} from "antd";
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
            <Form layout='inline'>
                <Form.Item label='名字'>
                    <Input placeholder='请输入关键词'/>
                </Form.Item>
                <Form.Item>
                    <Button type='primary' icon={<SearchOutlined/>}/>
                </Form.Item>
            </Form>
        </Card>
    )
}

export default MedicineCategories