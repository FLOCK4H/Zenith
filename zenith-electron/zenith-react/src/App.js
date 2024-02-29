import React, { useState, useEffect } from 'react';
import './App.css';
import TitleBar from './TitleBar';
import Dashboard from './Dashboard';
import Chat from './Chat';
import { UsernameProvider } from './UsernameContext';
import Footer from './Footer';
import './fonts.css';

function App() {
  const [activeComponent, setActiveComponent] = useState('Chat');
  const [isDashboardVisible, setIsDashboardVisible] = useState(true);
  const [isChatVisible, setIsChatVisible] = useState(false);


  useEffect(() => {
    if (activeComponent === 'Chat') {
      setIsChatVisible(true);
      setTimeout(() => setIsDashboardVisible(false), 3000);
    } else {
      setIsDashboardVisible(true);
      setIsChatVisible(false);
    }
  }, [activeComponent]);

  useEffect(() => {
    if (window.electronAPI) {
      window.electronAPI.updateDevNerd({
        current_tab: activeComponent,
        last_agent: activeComponent === 'Chat' ? 'mai' : 'ruckus',
        current_username: "FlyTech Co."
      });
    }
  }, [activeComponent]);

  return (
    <div className="App">
      <UsernameProvider>

        <TitleBar />
        {isDashboardVisible && <Dashboard setActiveTab={setActiveComponent} />}
        {isChatVisible && <Chat setActiveTab={setActiveComponent} />}
        <Footer />
      </UsernameProvider>
    </div>
  );
}

export default App;