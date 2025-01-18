import { observer } from "mobx-react"
import catStore, { Cat } from "../stores/catStore"
import { Button, Input } from "antd"
import { EditOutlined } from "@ant-design/icons"
import React, { useCallback, useMemo, useState } from "react"

const Card = observer(({ cat }: { cat: Cat }) => {
    const initName = useMemo(() => cat.name, []);
    const [name, setName] = useState(initName);
    const [isEdit, setIsEdit] = useState(false);

    const handleEdit = () => {
        setIsEdit(true);
    };

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


    const handleBlur = () => {
        if (name.trim() === '') {
            setName(initName);
        }
        setIsEdit(false);
    };

    return (
        <div className="card" id={cat.id} >
            <img className="img-card" src={cat.url} alt={"cat " + name} />
            <div>
                <span >name:</span>
                {isEdit ?
                    (<Input
                        data-testid="input"
                        value={name}
                        autoFocus
                        onChange={changeName}
                        onKeyDown={handleKeyDown}
                        onBlur={handleBlur}
                    />)
                    :
                    (<span>
                        <span className="span-name">{name}</span>
                        <span> {<EditOutlined data-testid="EditOutlined" onClick={() => { handleEdit() }} />}</span>
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