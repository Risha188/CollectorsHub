import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { CollectionProvider } from './context/CollectionContext.tsx'
import { CommunityProvider } from './context/CommunityContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CollectionProvider>
      <CommunityProvider>
        <App />
      </CommunityProvider>
    </CollectionProvider>
  </StrictMode>,
)
