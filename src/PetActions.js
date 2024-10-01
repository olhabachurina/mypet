import React from 'react';

function PetActions({ changeMood, feedPet, walkPet, healPet }) {
  return (
    <div>
      <h3>Что хочет сделать питомец?</h3>
      <button onClick={() => changeMood('Счастливый')}>Поиграть</button>
      <button onClick={feedPet}>Покормить</button>
      <button onClick={walkPet}>Прогуляться</button>
      <button onClick={() => changeMood('Грустный')}>Отдохнуть</button>
      <button onClick={healPet}>Лечить</button>
    </div>
  );
}

export default PetActions;