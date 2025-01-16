import { observer } from "mobx-react";
import catStore from "../stores/catStore";
import { Card } from "../Card/Card";

export const ListCards = observer(() => {
    return (
        <div className="list-card">
            {
                catStore.cats.map(cat =>
                    <div key={cat.id}>{<Card cat={cat} />}</div>
                )
            }
        </div>)
})

