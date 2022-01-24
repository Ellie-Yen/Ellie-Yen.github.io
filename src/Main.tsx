// make sure has installed types by following commands
// npm i --save-dev @types/react
// npm i --save-dev @types/react-dom
import { useRef } from 'react';
import DecoPic from './sections/DecoPic';
import Intro from './sections/Intro';
import Strength from './sections/Strength';
import Project from './sections/Project';
import Contact from './sections/Contact';

export default function Main(){
  const decoPicRef = useRef(null);
  return (
    <div id="main_body">
      <DecoPic refObj={decoPicRef}/>
      <Intro refObj={decoPicRef} />
      <Project refObj={decoPicRef}/>
      <Strength refObj={decoPicRef} />
      <Contact refObj={decoPicRef}/>
    </div>
  );
}