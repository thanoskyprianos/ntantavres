import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './assets/ubuntu.css';
import { Routing } from './routing/Routing.tsx';
import './config/i18n';
import './global.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Routing />
  </StrictMode>
);
