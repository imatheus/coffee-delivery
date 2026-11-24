import { Outlet } from 'react-router-dom'
import { Header } from '../Header'
import {
  Footer,
  FooterContainer,
  LayoutWrapper,
  MainContent,
  SkipLink,
} from './styles'

export function PageLayout() {
  return (
    <LayoutWrapper>
      <SkipLink href="#main-content">Pular para o conteúdo principal</SkipLink>
      <Header />
      <MainContent id="main-content" tabIndex={-1}>
        <Outlet />
      </MainContent>
      <Footer>
        <FooterContainer>
          <span>Coffee Delivery — Cafés especiais entregues fresquinhos.</span>
          <span>Projeto Final SPA · React + TypeScript</span>
        </FooterContainer>
      </Footer>
    </LayoutWrapper>
  )
}
