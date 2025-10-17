import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Layout from './app/layout.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Layout>
      <div className="p-6">
        <h1 className="text-2xl font-bold">Bem-vindo ao seu app!</h1>
        <p className="text-muted-foreground">A sidebar agora deve estar visível.</p>
      </div>
    </Layout>
  </StrictMode>,
)
