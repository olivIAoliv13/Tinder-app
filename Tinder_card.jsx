import React, { useState, useEffect } from 'react';
import './App_tinder.css';

function Tinder() {
  const [profiles, setProfiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch('http://localhost:5000/api/profiles?n=50') 
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log('Fetched profiles:', data);
        setProfiles(data);
      })
      .catch(error => {
        console.error('Error fetching profiles:', error);
      });
  }, []);

  const handleSwipe = (direction) => {
    setCurrentIndex(prevIndex => prevIndex + 1);
    // implementer logique pour gérer les likes et les dislikes
  };

  return (
    <div className="App">
      <div className="title">Trouvez l'amour au coin de la rue</div>
      <div className="subtitle">Lutece et Olivia ont créé cette app juste pour toi</div>
      {profiles.length > 0 && currentIndex < profiles.length && (
        <div className="card">
          <img src={profiles[currentIndex].photo} alt="Profile" />
          <h2>{profiles[currentIndex].name}, {profiles[currentIndex].age}</h2>
          <p>{profiles[currentIndex].job}</p>
          <p>{profiles[currentIndex].city}, {profiles[currentIndex].country}</p>
          <div className="buttons">
            <img src="https://cdn-icons-png.flaticon.com/512/8184/8184331.png" alt="Dislike" onClick={() => handleSwipe('left')} />
            <img src="https://seeklogo.com/images/T/tinder-logo-FAAE852EC0-seeklogo.com.png" alt="Like" onClick={() => handleSwipe('right')} />
          </div>
        </div>
      )}
      {currentIndex === profiles.length && <h2>No more profiles to swipe!</h2>}
    </div>
  );
}

export default Tinder;