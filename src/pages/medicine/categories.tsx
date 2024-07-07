import {Button, Card} from "antd";
import {PlusOutlined} from '@ant-design/icons'

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
            MedicineCategories
        </Card>
    )
}

export default MedicineCategories