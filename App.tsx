
import React, { useState } from 'react';
import { View } from './types';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import UrlScanner from './components/UrlScanner';
import FileScanner from './components/FileScanner';
import PasswordChecker from './components/PasswordChecker';
import AiAssistant from './components/AiAssistant';
import Quiz from './components/Quiz';
import Faqs from './components/Faqs';
import Login from './components/Login';
import Feedback from './components/Feedback';
import Profile from './components/Profile';

const App: React.FC = () => {
  const [view, setView] = useState<View>(View.DASHBOARD);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userProvider, setUserProvider] = useState<string>('nexus');

  const handleLogin = (email: string, provider: string) => {
    setUserEmail(email);
    setUserProvider(provider);
    setIsLoggedIn(true);
    setView(View.DASHBOARD);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail('');
    setUserProvider('nexus');
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (view) {
      case View.DASHBOARD: return <Dashboard />;
      case View.URL_SCANNER: return <UrlScanner />;
      case View.FILE_SCANNER: return <FileScanner />;
      case View.PASSWORD_CHECKER: return <PasswordChecker />;
      case View.AI_ASSISTANT: return <AiAssistant />;
      case View.QUIZ: return <Quiz />;
      case View.FAQS: return <Faqs />;
      case View.FEEDBACK: return <Feedback />;
      case View.PROFILE: return <Profile email={userEmail} provider={userProvider} />;
      default: return <Dashboard />;
    }
  };

  return (
    <Layout 
      currentView={view} 
      setView={setView} 
      onLogout={handleLogout}
      userEmail={userEmail}
      userProvider={userProvider}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;