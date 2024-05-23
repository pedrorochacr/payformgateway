import React, { useState } from 'react';

const CardPaymentForm = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para processar o pagamento com cartão
    alert('Pagamento com cartão processado');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Número do Cartão</label>
        <input 
          type="text" 
          value={cardNumber} 
          onChange={(e) => setCardNumber(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Data de Validade</label>
        <input 
          type="text" 
          value={expiryDate} 
          onChange={(e) => setExpiryDate(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>CVV</label>
        <input 
          type="text" 
          value={cvv} 
          onChange={(e) => setCvv(e.target.value)} 
          required 
        />
      </div>
      <button type="submit">Pagar</button>
    </form>
  );
};

export default CardPaymentForm;
