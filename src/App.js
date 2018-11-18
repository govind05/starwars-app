import React, { useState } from 'react';
import './App.css';

function App() {
  const [char, setChar] = useState(null);
  const [fetching, setFetching] = useState(false);
  const [buttonClass, setButtonClass] = useState('increment-btn');
  async function onClick() {
    setChar(null);
    setFetching(true);
    setButtonClass('increment-btn increment-btn-up');
    const res = await useSWApi();
    setFetching(false);
    setChar(res);
  }
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#333',
      }}
    >
      <button className={buttonClass} onClick={onClick}>
        Which StarWars character are you?
      </button>
      {char ? (
        <div className="char-container">
          <div>
            <span className="char-info">Name:</span> {char.name}
          </div>
          <div>
            <span className="char-info">gender:</span> {char.gender}
          </div>
          <div>
            <span className="char-info">Homeworld:</span> {char.homeworld}
          </div>
          <div>
            <span className="char-info">Species:</span> {char.species}
          </div>
        </div>
      ) : null}
      <div className="loading">{fetching ? `You are...` : ''}</div>
    </div>
  );
}

async function useSWApi() {
  const rand = Math.random() * 86 + 1;
  console.log(rand.toFixed(0));
  let res = await fetch(`https://swapi.co/api/people/${rand.toFixed(0)}`);
  const char = await res.json();
  res = await fetch(char.species);
  const species = await res.json();
  res = await fetch(char.homeworld);
  const homeworld = await res.json();
  return { ...char, species: species.name, homeworld: homeworld.name };
}

export default App;
