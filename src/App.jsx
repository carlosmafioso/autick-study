import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { system } from './theme';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import AnaliseDePerformance from './pages/AnaliseDePerformance';
import CalendarioEPlaneamento from './pages/CalendarioEPlaneamento';
import BibliotecaDeConteudo from './pages/BibliotecaDeConteudo';
import AssistenteDeIA from './pages/AssistenteDeIA';
import PainelDeControle from './pages/PainelDeControle';
import HackerAttack from './pages/HackerAttack';

export default function App() {
  return (
    <ChakraProvider value={system}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<AnaliseDePerformance />} />
            <Route path="calendario" element={<CalendarioEPlaneamento />} />
            <Route path="biblioteca" element={<BibliotecaDeConteudo />} />
            <Route path="assistente" element={<AssistenteDeIA />} />
            <Route path="painel" element={<PainelDeControle />} />
          </Route>
          <Route path="/hacker" element={<HackerAttack />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}
