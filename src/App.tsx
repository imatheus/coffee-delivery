import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { PageLayout } from './components/PageLayout'
import { CartProvider } from './contexts/CartContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { Checkout } from './pages/Checkout'
import { Home } from './pages/Home'
import { Success } from './pages/Success'
import { GlobalStyle } from './styles/global'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PageLayout />}>
        <Route index element={<Home />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="success" element={<Success />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export function App() {
  return (
    <ThemeProvider>
      <GlobalStyle />
      <CartProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </CartProvider>
    </ThemeProvider>
  )
}

export default App
