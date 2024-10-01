import React, { useEffect } from 'react';
import './Notification.css';

const Notification = ({ message, removeNotification }) => {
  useEffect(() => {
   
    const timer = setTimeout(() => {
      removeNotification();
    }, 3000);
    return () => clearTimeout(timer);
  }, [removeNotification]);

  return (
    <div className="notification">
      {message}
    </div>
  );
};

export default Notification;