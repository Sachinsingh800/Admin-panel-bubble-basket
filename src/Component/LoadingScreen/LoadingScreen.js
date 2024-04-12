import React, { useEffect, useState } from 'react';
import './LoadingScreen.css'; // Import the CSS file with animation styles

function BeerAnimation() {
  const [beerFilled, setBeerFilled] = useState(false);
  const [headActive, setHeadActive] = useState(false);
  const [beerPouring, setBeerPouring] = useState(false);

  useEffect(() => {
    const beerRise = () => {
      setBeerFilled(true);
      setHeadActive(true);
    };

    const pourBeer = () => {
      setBeerPouring(true);
      beerRise();
      setTimeout(() => {
        setBeerPouring(false);
      }, 1500);
    };

    const timer = setTimeout(() => {
      pourBeer();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='main'>
          <div id="container">
      <div className={`glass ${beerFilled ? 'beer-filled' : ''}`}>
        <div className={`beer ${beerFilled ? 'fill' : ''}`}></div>
      </div>
      <div className={`head ${headActive ? 'active' : ''}`}></div>
      <div className={`pour ${beerPouring ? 'pouring' : ''} ${beerPouring && !headActive ? 'end' : ''}`}></div>
    </div>
    <br/>
    <p>LOADING...</p>
    </div>

  );
}

export default BeerAnimation;
