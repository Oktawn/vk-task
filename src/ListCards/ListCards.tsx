import { observer } from "mobx-react";
import catStore from "../stores/catStore";
import React, { lazy } from "react";
const MemoLazyCard = (lazy(() => import("../Card/Card")));

const ListCards: React.FC = observer(() => {
  return (
    <div className="list-card">
      {
        catStore.cats.map(cat =>
          <div key={cat.id}>{<MemoLazyCard cat={cat} />}</div>
        )
      }
    </div>)
})

export default ListCards;
