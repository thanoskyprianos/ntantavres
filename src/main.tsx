import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './assets/ubuntu.css';
import { Routing } from './Routing';
import './styles/global.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Routing />
  </StrictMode>
);
