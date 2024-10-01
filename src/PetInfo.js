import React from 'react';

function PetInfo({ name, breed, age, mood, energy, health, walks }) {
  return (
    <div className="PetInfo">
      <h2>Информация о питомце</h2>
      <p>Имя: {name}</p>
      <p>Порода: {breed}</p>
      <p>Возраст: {age} лет</p>
      <p>Настроение: {mood}</p>
      <p>Уровень энергии: {energy}/10</p>
      <p>Здоровье: {health}/10</p>
      <p>Количество прогулок: {walks}</p>
    </div>
  );
}

export default PetInfo;