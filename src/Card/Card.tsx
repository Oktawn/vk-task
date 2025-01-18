import { observer } from "mobx-react";
import catStore, { Cat } from "../stores/catStore";
import { Button, Input } from "antd";
import { EditOutlined } from "@ant-design/icons";
import React, { useState } from "react";

const Card: React.FC<{ cat: Cat }> = observer(({ cat }) => {
  const [name, setName] = useState(cat.name);
  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleChange = (e: any) => {
    setName(e.target.value)
  }

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      setIsEdit(false);
      if (name.trim() !== "")
        catStore.updateCat(cat.id, name);
      else
        setName(cat.name);
    }


  };

  const handleBlur = () => {
    if (name.trim() === '') {
      setName(cat.name);
    } else {
      catStore.updateCat(cat.id, cat.name);
      console.log(name);
    }
    setIsEdit(false);
  };

  return (
    <div className="card">
      <img className="img-card" src={cat.url} alt={"cat " + name} />
      <div>
        <span>name:</span>
        {isEdit ?
          (<Input
            data-testid="input"
            value={name}
            autoFocus
            onChange={(e) => handleChange(e)}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
          />)
          :
          (<span>
            <span className="span-name">{name}</span>
            <span><EditOutlined data-testid="EditOutlined" onClick={() => handleEdit()} /></span>
          </span>)
        }
      </div>
      <div>
        <Button onClick={() => catStore.deleteCat(cat)}>Delete</Button>
      </div>
    </div>
  );
});

export default Card;
