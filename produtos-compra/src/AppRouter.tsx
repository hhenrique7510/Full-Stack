import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './app/layout'
import App from './App'
import ListaProdutos from './ListaProdutos'
import StatusProdutos from './StatusProdutos'
function AppRouter() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/ListaProdutos" element={<ListaProdutos />} />
          <Route path="/StatusProdutos" element={<StatusProdutos />} /> 
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
export default AppRouter
