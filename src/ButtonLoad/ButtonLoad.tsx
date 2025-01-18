import { observer } from "mobx-react"
import catStore from "../stores/catStore"
import { Button } from "antd"
const ButtonLoad = observer(() => {
    return (
        catStore.isLoading ?
            <Button type="primary" loading >Loading</Button> :
            <Button onClick={() => catStore.loadNextCats()}>Load more</Button>
    )
})

export default ButtonLoad;