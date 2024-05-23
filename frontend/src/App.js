import React from 'react';
import PaymentForm from './components/PaymentForm';
import './App.css'
function App() {
  return (
    <div className="App">
      <main className="mainView">
        <div>
            <PaymentForm />
        </div>
        <div>
            <PaymentForm />
        </div>
        
      </main>
    </div>
  );
}

export default App;
