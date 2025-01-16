import { observer } from "mobx-react"
import catStore from "../stores/catStore"
import { Button } from "antd"
export const ButtonLoad = observer(() => {
    return (
        catStore.isLoading ?
            <Button type="primary" loading >Loading</Button> :
            <Button onClick={() => catStore.loadNextCats()}>Load more</Button>
    )
})