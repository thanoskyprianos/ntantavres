import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { BreadcrumbsWrapper as Breadcrumbs } from './components/BreadcrumbsWrapper';
import { Header } from './components/Header';
import { theme } from './config/theme.config';
import { HomePage } from './pages/HomePage';
import { ParentPage } from './pages/parent/ParentPage.tsx';
import { BabysitterPage } from './pages/babysitter/BabysitterPage.tsx';
import { QuestionsPage } from './pages/questions/QuestionsPage.tsx';
import { TitleSetter } from './components/TitleSetter.tsx';
import { ParentProfilePage } from './pages/parent/ParentProfilePage.tsx';
import { BabysitterProfilePage } from './pages/babysitter/BabysitterProfilePage.tsx';
import { AuthPage } from './pages/auth/AuthPage.tsx';
import { useTranslation } from 'react-i18next';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { localeTextMap } from './config/i18n.ts';
import { Ratings } from './pages/ratings/Ratings.tsx';
import { JobPosting } from './pages/parent/JobPosting.tsx';
import { InfoParents } from './pages/parent/InfoParents.tsx';
import { ActiveCollabs } from './pages/parent/ActiveCollabs.tsx';
import { TempRequests } from './pages/parent/TempRequests.tsx';
import { CardDetailPage } from './CardDetailPage.tsx';
import { ScheduledMeetings } from './pages/parent/ScheduledMeetings.tsx';
import { EditActiveCollab } from './pages/parent/EditActiveCollab.tsx';

export const Routing = () => {
  const { i18n } = useTranslation();

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={localeTextMap.get(i18n.resolvedLanguage || 'en-US')}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <TitleSetter />
          <Header />
          <Breadcrumbs sx={{ margin: '15px' }} />
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="parent">
              <Route index element={<ParentPage />} />
              <Route path="profile" element={<ParentProfilePage/>} />
              <Route path="createORedit" element={<JobPosting />} />
              <Route path="editInfo" element={<InfoParents />} />
              <Route path="activeCollabs" element={<ActiveCollabs />} />
              <Route path="tempRequest" element={<TempRequests />} />
              <Route path="scheduledMeetings" element={<ScheduledMeetings />} />
              <Route path="editCollab" element={<EditActiveCollab />} />
            </Route>
            <Route path="babysitter">
              <Route index element={<BabysitterPage />} />
              <Route path="profile" element={<BabysitterProfilePage/>} />
            </Route>
            <Route path="questions">
              <Route index element={<QuestionsPage />} />
            </Route>
            <Route path="auth">
              <Route index element={<AuthPage />} />
            </Route>
            <Route path="ratings">
              <Route index element={<Ratings />} />
            </Route>
            <Route path="intrested">
              <Route index element={<CardDetailPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </LocalizationProvider>
  );
};
