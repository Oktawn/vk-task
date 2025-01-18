import { observer } from "mobx-react";
import catStore from "../stores/catStore";
import React, { lazy, memo, Suspense } from "react";
const MemoLazyCard = memo(lazy(() => import("../Card/Card")));

const ListCards = observer(() => {
  return (
    <div className="list-card">
      <Suspense>
        {
          catStore.cats.map(cat =>
            <div key={cat.id}>{<MemoLazyCard cat={cat} />}</div>
          )
        }
      </Suspense>
    </div>)
})

export default ListCards;
