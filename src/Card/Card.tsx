import { observer } from "mobx-react"
import catStore, { Cat } from "../stores/catStore"
import { Button, Input } from "antd"
import { fakerEN as faker } from "@faker-js/faker"
import { EditOutlined } from "@ant-design/icons"
import { useState } from "react"

export const Card = observer(({ cat }: { cat: Cat }) => {

    const [name, setName] = useState(faker.animal.petName())
    const [isEdit, setIsEdit] = useState(false);

    const handleEdit = () => {
        setIsEdit(true);
    }
    const changeName = (e: any) => {
        setName(e.target.value)
    }
    const handleBlur = () => {
        setIsEdit(false);
    };


    return (
        <div className="card" >
            <img className="img-card" src={cat.url} alt="" />
            <div>
                <span >name: </span>
                {isEdit ?
                    (<Input
                        value={name}
                        autoFocus={true}
                        onChange={changeName}
                        onBlur={handleBlur} />)
                    :
                    (<span>{name} </span>)}
                <span> {<EditOutlined onClick={() => { handleEdit() }} />}</span>
            </div>
            <div>
                <Button onClick={() => catStore.deleteCat(cat)}>Delete</Button>
            </div>
        </div>
    )
})