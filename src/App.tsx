import React from 'react';

import './App.css';
import { Image } from './image';
import {randomOrder,getRandomInt} from "./gallary";
import {images,sizeLevel} from './const';
import classNames from "classnames";
import './heart.css';
import party from "party-js";

function App() {

  const imageArray = Object.keys(images);
  const shuffledImage = imageArray.sort((a,b) => 0.5-Math.random());
  const newGameSet = new Set();
  for (const i in shuffledImage.slice(0,12)) {
    const key:string = shuffledImage[i];    console.log(key);
    const value:string =(images as any)[key];
    (newGameSet as any)[key] = value;
  }

  React.useEffect(()=>{

      var imgs = document.querySelectorAll('img');
      imgs.forEach((the_img) => {
        window.addEventListener('load', function() {
          randomOrder(the_img);
        });
    })
    
}); 

  const concat  = (file:string) => {
    return `./images/${file}`
  };


  const picked:number[] = [];
  const setNewRound = ()=>{
      let newPick= getRandomNum();
      while (picked.includes(newPick) || Object.values(newGameSet)[newPick] === undefined){
        newPick= getRandomNum(); 
      }
      
    
      picked.push(newPick)
      
      console.log("new pick",  Object.values(newGameSet)[newPick])
      return newPick;
  }
  
  const getRandomNum = () => {
    return getRandomInt(0, Object. keys(newGameSet). length);
  }

  const [score, setScore] = React.useState(0);
  const [pick, setPick] = React.useState(setNewRound());
  const [win, setWin] = React.useState(false);
  
  const size = sizeLevel[score];
  const page = document.querySelectorAll('body')[0];

  const handleOnDrop = (ev:React.DragEvent) => {
      ev.preventDefault()
      ev.stopPropagation()
      const data = ev.dataTransfer.getData("text");
      if (data === Object.values(newGameSet)[pick]){
        effect(page);
          setScore(score=>score+1);
          if (score === 6) {
              setWin(true);
          }
          setPick(setNewRound());
          
      }
      else {
          setScore(0);
          setPick(setNewRound());
      }
  }

  const handleDragOver = (ev:any) => {
      ev.preventDefault()
      ev.stopPropagation()
  }
  

  const effect = (element:HTMLElement) => {
    party.confetti(element, {
      count: party.variation.range(40, 60),
      size:party.variation.range(1.5,2),
      spread:party.variation.range(40,50)
  });

  }
  if (win) {
    const eYay = document.querySelectorAll('body')[0];
    eYay.addEventListener('click', ()=>effect(eYay));
    effect(eYay);
  

    return (
      <body className="done" id='yay'>
        <div className="center">
        <p>恭喜你通过了考核：）</p>
        </div>


      </body>
    )
  }
  return (
    <body id='wip'>
      <div className='left'>
      <div className="prompt">{Object.values(newGameSet)[pick] }</div>
      <div className={classNames("heart-container", size)}>
            <div className={classNames("heart", size)} onDrop={handleOnDrop} onDragOver={handleDragOver} />
        </div>
      </div>

          <div className="grid-container">
        {
          Object.entries(newGameSet).map(([index,value])=> 
            (
              <Image src={require(`${concat(index)}`)} value={value} />
            )
          )
    }
    </div>
    </body>
  );
}

export default App;
