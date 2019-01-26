import React, { Component } from 'react';
import 'App.modules.css';
import Header from 'components/header/Header';
import SumWidgetContainer from 'components/sumWidget/SumWidgetContainer'

const App = () => (
  <div className="App" data-test="app" >
    <Header />
    <main>
      <section>
        <SumWidgetContainer />
      </section>
    </main>
  </div>
);

export default App;
