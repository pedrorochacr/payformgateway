import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ initialMinutes }) => {
  // Função para calcular o tempo restante
  const calculateTimeRemaining = (endTime) => {
    const now = new Date();
    const timeDiff = endTime - now;
    const seconds = Math.floor((timeDiff / 1000) % 60);
    const minutes = Math.floor((timeDiff / 1000 / 60) % 60);

    return {
      total: timeDiff,
      minutes,
      seconds
    };
  };

  // Estado inicial
  const [endTime, setEndTime] = useState(() => new Date(new Date().getTime() + initialMinutes * 60 * 1000));
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining(endTime));

  useEffect(() => {
    const timer = setInterval(() => {
      const timeLeft = calculateTimeRemaining(endTime);
      setTimeRemaining(timeLeft);
      if (timeLeft.total <= 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer); // Limpeza do intervalo
  }, [endTime]);

  return (
    <div>
      {timeRemaining.total > 0 ? (
        <div style={{marginTop: 5}}>
          {String(timeRemaining.minutes).padStart(2, '0')}:{String(timeRemaining.seconds).padStart(2, '0')}
        </div>
      ) : (
        <div>O tempo expirou!</div>
      )}
    </div>
  );
};

export default CountdownTimer;
