import { useEffect, useState } from "react";
import { AdviceService } from "./services/advice.service";

interface SlipData {
  id:number,
  advice:string;
}

function App() {
  const [slipState, setSlipState] = useState<SlipData>();
  const adviceService = new AdviceService('https://api.adviceslip.com/advice');

  useEffect(()=> {
    generateRandomAdvice();
  }, []);

  const generateRandomAdvice = async ()=> {
    const {slip} =  await (await adviceService.getRandomAdvice()).json();
    setSlipState(slip);
  }

  const changeAdvice = ()=> generateRandomAdvice();

  return (
    <div className="flex justify-center items-center h-screen p-5">
      <div className="bg-dark_grayish_blue w-full h-80 lg:w-1/3 rounded-xl p-8">
        <div className="flex flex-col items-center justify-center gap-12">
          <span className="text-neon_green font-medium">ADVICE # {slipState?.id}</span>
          <span className="text-light_cyan text-xl text-center font-bold h-24 lg:h-20">"{slipState?.advice}"</span>
          <picture>
            <source media="(max-width: 799px)" srcSet="./icons/pattern-divider-mobile.svg" />
            <img src="./icons/pattern-divider-desktop.svg" alt="patter-icon"/>
          </picture>
        </div>
        <div className="relative -bottom-8 lg:-bottom-10">
          <div className="flex justify-center">
            <button className="bg-neon_green w-14 h-14 rounded-full flex justify-center items-center cursor-pointer active:shadow-neon_green" 
              onClick={changeAdvice}>
              <img src="./icons/icon-dice.svg" alt="icon-dice"/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
