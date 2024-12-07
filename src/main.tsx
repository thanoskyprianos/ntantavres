import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './assets/ubuntu.css';
import { Routing } from './Routing';
import './config/i18n';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Routing />
  </StrictMode>
);
