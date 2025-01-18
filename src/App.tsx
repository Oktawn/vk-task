// @ts-ignore
import React, { lazy, Suspense } from 'react'
import loading from "./assets/loading.gif";
const LazyListCards = lazy(() => import("./ListCards/ListCards"))
const LazyButtonLoad = lazy(() => import("./ButtonLoad/ButtonLoad"));
function App() {

  return (
    <>
      <Suspense fallback={<img src={loading}></img>}>
        <LazyListCards />
        <LazyButtonLoad />
      </Suspense>
    </>
  )
}

export default App
