import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'mobx-react'
import catStore from './stores/catStore.ts'

const stores = {
  catStore
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider {...stores}>
      <App />
    </Provider>
  </StrictMode>,
)
