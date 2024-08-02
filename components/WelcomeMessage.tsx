import React from 'react'
import { TypewriterEffectSmooth } from "@/components/ui/TypewriterEffect";





const WelcomeMessage = ({ firstName, lastName, className }: { firstName: string, lastName: string, className: string }) => {
  const words = [
    { text: "Welcome", className: "dark:text-blue-500" },
    { text: firstName, className: "dark:text-blue-500" },
    { text: lastName, className: "dark:text-blue-500" },
  ];

  return <TypewriterEffectSmooth words={[{ text: 'Welcome' }, { text: words[1].text, className: words[1].className }, { text: words[2].text, className: words[1].className }]} className="p-20 z-10 flex-nowrap" />;
};


export default WelcomeMessage
