import React, { useState } from 'react';
import CardPaymentForm from './CardPaymentForm';
import PixPaymentForm from './PixPaymentForm';
import './PaymentForm.css';

const PaymentForm = () => {
  const [paymentMethod, setPaymentMethod] = useState('card');

  return (
    <div className="payment-form">
      <h2>Escolha o método de pagamento</h2>
      <div className="payment-methods">
        <label>
          <input 
            type="radio" 
            value="card" 
            checked={paymentMethod === 'card'} 
            onChange={() => setPaymentMethod('card')} 
          />
          Cartão de Crédito
        </label>
        <label>
          <input 
            type="radio" 
            value="pix" 
            checked={paymentMethod === 'pix'} 
            onChange={() => setPaymentMethod('pix')} 
          />
          Pix
        </label>
      </div>
      {paymentMethod === 'card' && <CardPaymentForm />}
      {paymentMethod === 'pix' && <PixPaymentForm />}
    </div>
  );
};

export default PaymentForm;
