import { observer } from "mobx-react";
import catStore from "../stores/catStore";
import { lazy, memo } from "react";
const MemoLazyCard = memo(lazy(() => import("../Card/Card")));

const ListCards = observer(() => {
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
