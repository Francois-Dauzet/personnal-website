import React, { useEffect, useRef, useState } from 'react';
import { useStateStore } from '../../stores/stateStore';
import { useNavigate } from 'react-router-dom';
import './TransitionPage.scss';

const TransitionPage = () => {
  const navigate = useNavigate();
  const { currentPageName, currentPageRoute } = useStateStore();
  const [transitionActive, setTransitionActive] = useState(false);

  const textTitleArray = currentPageName ? currentPageName.split('') : [];
  const letterItems = useRef([]);
  const timeouts = useRef([]);

  useEffect(() => {
    const executeAnimation = () => {
      if (!currentPageName) {
        navigate('/' + sessionStorage.getItem('currentPageRoute'));
        return;
      }

      sessionStorage.setItem('currentPageRoute', currentPageRoute);

      setTransitionActive(true);
      letterItems.current.forEach((item, index) => {
        if (item) {
          timeouts.current.push(
            setTimeout(() => {
              item.style.transform = `translateY(0)`;
            }, index * 160)
          );
          timeouts.current.push(
            setTimeout(() => {
              item.style.textShadow = `16px 16px  #fff`;
            }, index * 160 + 400)
          );
          timeouts.current.push(
            setTimeout(() => {
              item.style.textShadow = `32px 32px 64px #fff0`;
            }, index * 160 + 1600)
          );
          timeouts.current.push(
            setTimeout(() => {
              item.style.transform = `translateY(+1400%) rotate(${
                Math.floor(Math.random() * 2884) - 1440
              }deg)`;

              if (index === textTitleArray.length - 1) {
                timeouts.current.push(
                  setTimeout(() => {
                    navigate(`/${currentPageRoute}`);
                  }, index * 160)
                );
              }
            }, index * 160 + 3200)
          );
        }
      });
    };

    executeAnimation();
  }, [currentPageName, currentPageRoute, navigate, textTitleArray]);

  const handleScreenClick = () => {
    timeouts.current.forEach((timeout) => clearTimeout(timeout));
    navigate(`/${currentPageRoute}`);
  };

  return (
    <div className="container-transition-page" onClick={handleScreenClick}>
      <div className={`background ${transitionActive ? 'active' : ''}`}></div>
      <div className="container-title">
        <ul translate="no">
          {textTitleArray.map((item, index) => (
            <li
              key={index}
              ref={(el) => (letterItems.current[index] = el)}
              style={{
                transform: `translateY(-1400%) rotate(${
                  Math.floor(Math.random() * 1442) - 720
                }deg)`,
                fontSize: `${
                  88 / (currentPageName ? currentPageName.length : 1)
                }vw`,
              }}
            >
              {item === '.' ? '\u200B \u200B' : item}
            </li>
          ))}
        </ul>
        <span translate="no" className="text-stop-animation">
          Click to stop the animation
        </span>
      </div>
    </div>
  );
};

export default TransitionPage;
