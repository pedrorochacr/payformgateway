import React, { useState } from 'react';

const PixPaymentForm = () => {
  const [pixKey, setPixKey] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para processar o pagamento com Pix
    alert('Pagamento com Pix processado');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Chave Pix</label>
        <input 
          type="text" 
          value={pixKey} 
          onChange={(e) => setPixKey(e.target.value)} 
          required 
        />
      </div>
      <button type="submit">Pagar</button>
    </form>
  );
};

export default PixPaymentForm;
