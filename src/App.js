import React, { useState, useEffect, useCallback } from 'react';
import PetInfo from './PetInfo';
import PetChart from './PetChart';
import Notification from './Notification';
import './App.css';

function App() {
  const [mood, setMood] = useState('Нейтральное');
  const [energy, setEnergy] = useState(5);
  const [health, setHealth] = useState(10);
  const [walks, setWalks] = useState(0);
  const [log, setLog] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  
  const images = [
    `${process.env.PUBLIC_URL}/img/photo.jpg`,
    `${process.env.PUBLIC_URL}/img/photo2.jpg`,
    `${process.env.PUBLIC_URL}/img/phot3.jpg`,
    `${process.env.PUBLIC_URL}/img/photo4.jpg`,
  ];

  // Функция добавления уведомлений
  const addNotification = (message) => {
    setNotifications((prevNotifications) => [...prevNotifications, message]);
  };

  // Таймер для удаления уведомления через 3 секунды
  useEffect(() => {
    if (notifications.length > 0) {
      const timer = setTimeout(() => {
        removeNotification();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notifications]);

  // Удаление уведомления
  const removeNotification = () => {
    setNotifications((prevNotifications) => prevNotifications.slice(1));
  };

  // Таймер для слайд-шоу
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); 
    return () => clearInterval(interval);
  }, [images.length]);

  
  const addActionToLog = useCallback((action) => {
    setLog((prevLog) => [...prevLog, action]);
    addNotification(action);
  }, []);

 
  const changeMood = (newMood) => {
    setMood(newMood);
    addActionToLog(`Керри стала ${newMood}`);
  };

  
  const feedPet = () => {
    setEnergy((prevEnergy) => Math.min(prevEnergy + 2, 10));
    setMood('Счастлива');
    addActionToLog('Керри покушала и стала счастливее!');
  };

  
  const walkPet = () => {
    setWalks((prevWalks) => prevWalks + 1);
    setEnergy((prevEnergy) => Math.max(prevEnergy - 1, 0));
    setMood('Счастлива');
    addActionToLog('Керри пошла на прогулку');
  };

  
  const healPet = () => {
    setHealth(10);
    setEnergy(10);
    setMood('Счастлива');
    addActionToLog('Керри была вылечена!');
  };

 
  useEffect(() => {
    if (energy <= 2) {
      addActionToLog('Предупреждение: Энергия Керри на критическом уровне!');
    }
    if (health <= 2) {
      addActionToLog('Предупреждение: Здоровье Керри на критическом уровне!');
    }
  }, [energy, health, addActionToLog]);

  return (
    <div className="App">
      <h1>Мой любимый друг</h1>

      {}
      <div className="slideshow">
        <img
          src={images[currentImageIndex]}
          alt="Керри"
          className="PetImage fade" 
        />
      </div>

      {}
      <PetInfo name="Керри" breed="Ротвейлер" age={10} mood={mood} energy={energy} health={health} walks={walks} />

      {}
      <div className="status-bars">
        <div className="status-bar">
          <div className={`status-bar-inner energy ${energy <= 2 ? 'low' : ''}`} style={{ width: `${(energy / 10) * 100}%` }}></div>
        </div>
        <div className="status-bar">
          <div className={`status-bar-inner health ${health <= 2 ? 'low' : ''}`} style={{ width: `${(health / 10) * 100}%` }}></div>
        </div>
      </div>

      {}
      <div className="actions">
        <button onClick={() => changeMood('Счастлива')}>
          <i className="fas fa-smile"></i> Поиграть
        </button>
        <button onClick={feedPet}>
          <i className="fas fa-utensils"></i> Покормить
        </button>
        <button onClick={walkPet}>
          <i className="fas fa-walking"></i> Прогуляться
        </button>
        <button onClick={() => changeMood('Грустна')}>
          <i className="fas fa-bed"></i> Отдохнуть
        </button>
        <button onClick={healPet}>
          <i className="fas fa-briefcase-medical"></i> Лечить
        </button>
      </div>

      {}
      <div className="container">
        <div className="logs">
          <h3>Лог действий</h3>
          <ul className="Log">
            {log.map((action, index) => (
              <li key={index}>{action}</li>
            ))}
          </ul>
        </div>
        <div className="chart">
          <PetChart energyData={[energy]} healthData={[health]} />
        </div>
      </div>

      {}
      {notifications.length > 0 && (
        <Notification message={notifications[0]} removeNotification={removeNotification} />
      )}
    </div>
  );
}

export default App;