import React from 'react';
import Header from 'components/header/Header';
import SumWidgetContainer from 'components/sumWidget/SumWidgetContainer';
import ErrorBoundary from 'components/common/ErrorBoundary';
import styles from 'App.module.css';

const App = () => (
  <div className={styles.app} data-test="app" >
    <Header />
    <main className={styles.main_container}>
	    <ErrorBoundary>
		    <SumWidgetContainer />
	    </ErrorBoundary>
    </main>
  </div>
);

export default App;
