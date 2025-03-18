import './App.css'
import { useState, useEffect, useRef } from "react";
import figlet from "figlet";
import slant from "figlet/importable-fonts/Slant.js";

function App() {
  
  const [isLoading, setIsLoading] = useState(true);

  const frames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
  const [frameIndex, setFrameIndex] = useState(0);

  const [header, setHeader] = useState("");
  const [history, setHistory] = useState([]);
  const [userInput, setUserInput] = useState("");

  figlet.parseFont("Slant", slant);

  const inputRef = useRef(null);

  useEffect(() => {

    const interval = setInterval(() => {
      setFrameIndex((prevIndex) => (prevIndex + 1) % frames.length);
    }, 50);

    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1500); 


    figlet.text(
      "John Daniel Tejero",
      {
        font: "Slant",
      },
      
      function (err, data) {
        if (err) {
          console.error("Figlet error:", err);
          return;
        }

        setHeader(data);
        inputRef.focus();
      }
    );
    return () => {
      clearInterval(interval)
      clearTimeout(timeout);
    };
  }, [frames.length]);

  const onSubmit = (data) => {
    event.preventDefault();

    setHistory([...history, {
      type: "input",
      value: data
    }]);

    setUserInput("");
  }
  
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmit(userInput);
      setUserInput(""); 

      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  useEffect(() => {
    if (!isLoading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isLoading]);

  
  return (
    <div className="bg-primary w-[100vw] h-[100vh] p-4 overflow-y-auto overflow-x-hidden text-background font-consolas">
      {isLoading ? (
        <div className="w-full rounded-lg">
          loading profile please wait {frames[frameIndex]}
        </div>
      ) : (
        <>
          <pre>{header}</pre>
          <div>Pleased to have you here. I am John Daniel Tejero.</div>
          <div>
            Type{" "}
            <span className="text-green-400 italic font-bold">'help'</span> to
            view a list of available commands.
          </div>
          <div className="w-full flex flex-row items-center gap-1">
            <span className="text-white">{">"}</span>
            <input
              ref={inputRef}
              className="w-full bg-inherit p-1 cursor-text focus:outline-none"
              value={userInput}
              onInput={(e) => setUserInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
        </>
      )}
    </div>
  );
}


export default App
