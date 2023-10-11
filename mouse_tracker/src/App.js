import './App.css';
import {useEffect, useState} from 'react'

const withMousePosition = (WrappedComponent) => {
  return (props) => {
    const [mousePosition, setMousePostition] = useState({
      x:0,
      y:0,
    })

    useEffect(() => {
      const handleMousePositionChange = (e) =>{
        setMousePostition({
          x: e.clientX,
          y: e.clientY,
        });
      };

      window.addEventListener("mousemove", handleMousePositionChange);

      return() => {
        window.removeEventListener("mousemove", handleMousePositionChange);
      };
    }, []);
    return <WrappedComponent {...props} mousePosition={mousePosition}/>;
  };
};

const PanelMouserLogger = ({ mousePosition}) => {
  if (!mousePosition) {
    return null;
  }
  return (
    <div className="BasicTracker">
      <p>Mouse Position</p>
      <div className="Row">
        <span>x: {mousePosition.x}</span>
        <span>y: {mousePosition.y}</span>
      </div>
    </div>
  );
};

const PointeMouseLogger = ({mousePosition}) => {
  if (!mousePosition) {
    return null
  }
  return(
    <p>
      ({mousePosition.x}, {mousePosition.y})
    </p>
  );
};

const PanelMouserTracker = withMousePosition(PanelMouserLogger);
const PointMouserTracker = withMousePosition(PanelMouserLogger);

function App() {
  return (
    <div className="App">
      <header className="App-header">Susies' Salad S-bar</header>
      <PanelMouserTracker/>
      <PointMouserTracker/>
    </div>
  );
}

export default App;
