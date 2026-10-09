import React from 'react'
import { Volume2 } from 'lucide-react'

export default function Voice({name}) {
    function speakname(){
        if (!name) return;
        window.speechSynthesis.cancel();
        const speech = new SpeechSynthesisUtterance(name);
        speech.lang="en-US";
        speech.rate=0.85;
        window.speechSynthesis.speak(speech)
    }
  return (
    <div>
        <Volume2 strokeWidth={1} className="cursor-pointer" onClick={speakname}/>
    </div>
  )
}
