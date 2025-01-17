import { observer } from "mobx-react"
import catStore, { Cat } from "../stores/catStore"
import { Button, Input } from "antd"
import { fakerEN as faker } from "@faker-js/faker"
import { EditOutlined } from "@ant-design/icons"
import { useCallback, useMemo, useState } from "react"

const Card = observer(({ cat }: { cat: Cat }) => {
    const initName = useMemo(() => faker.animal.petName(), []);
    const [name, setName] = useState(initName);
    const [isEdit, setIsEdit] = useState(false);

    const handleEdit = useCallback(() => {
        setIsEdit(true);
    }, []);

    const changeName = useCallback((e: any) => {
        setName(e.target.value);
    }, []);

    const handleKeyDown = useCallback((e: any) => {
        if (e.key === 'Enter') {
            setIsEdit(false);
        }
        if (name.trim() === '') {
            setName(initName);
        }
    }, [name]);


    const handleBlur = useCallback(() => {
        if (name.trim() === '') {
            setName(initName);
        }
        setIsEdit(false);
    }, [name, initName]);

    return (
        <div className="card" id={cat.id} >
            <img className="img-card" src={cat.url} alt={"cat " + name} />
            <div>
                <span >name:</span>
                {isEdit ?
                    (<Input
                        value={name}
                        autoFocus
                        onChange={changeName}
                        onKeyDown={handleKeyDown}
                        onBlur={handleBlur}
                    />)
                    :
                    (<span>
                        <span className="span-name">{name}</span>
                        <span> {<EditOutlined onClick={() => { handleEdit() }} />}</span>
                    </span>)
                }
            </div>
            <div>
                <Button onClick={() => catStore.deleteCat(cat)}>Delete</Button>
            </div>
        </div >
    )
})
export default Card;