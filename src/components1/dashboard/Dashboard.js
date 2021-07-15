import React, { useState } from 'react';
import { IntlProvider } from 'react-intl';
import Layout from './Layout';
import messages from './messages';
import { Link } from 'react-router-dom';





function Dashboard() {
  const [locale, setLocale] = useState('en');
  return (
  
     
       <IntlProvider locale={locale} messages={messages[locale]}>
          <Layout setLocale={setLocale} />  
       </IntlProvider>
          


  );
}

export default Dashboard;








