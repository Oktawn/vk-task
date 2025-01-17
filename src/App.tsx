import { lazy, Suspense } from 'react'
import { ButtonLoad } from './ButtonLoad/ButtonLoad'
const LazyListCards = lazy(() => import("./ListCards/ListCards"))
function App() {

  return (
    <>
      <Suspense fallback={<div>loading</div>}>
        <LazyListCards />
        <ButtonLoad />
      </Suspense>
    </>
  )
}

export default App
