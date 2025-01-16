import { Suspense } from 'react'
import { ButtonLoad } from './ButtonLoad/ButtonLoad'
import { ListCards } from './ListCards/ListCards'
function App() {

  return (

    <>
      <Suspense fallback={<div>loading</div>}>
        <ListCards />
        <ButtonLoad />
      </Suspense>
    </>
  )
}

export default App
