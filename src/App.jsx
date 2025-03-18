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
  const containerRef = useRef(null);

  useEffect(() => {

    const interval = setInterval(() => {
      setFrameIndex((prevIndex) => (prevIndex + 1) % frames.length);
    }, 50);

    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1500); 


    figlet.text(
      "Name",
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
    if(data.trim().length == 0) return;
    setHistory([...history, data]);

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

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);
  
  return (
    <div className="bg-primary w-[100vw] h-[100vh] p-4 overflow-y-auto overflow-x-hidden text-background font-consolas"
      ref={containerRef}>
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
          
          {
            history.map((e) => {
              return (
                <>
                  <div className="w-full flex flex-row items-center gap-1">
                    <span className="text-white">{">"}</span>
                    <span>{e}</span>
                  </div>
                  {
                    e == "tite" &&
                    <div>tite mo malaki</div>
                  }
                </>
              );
            })
          }
          <div className="w-full flex flex-row items-center gap-1">
            <span className="text-white">{">"}</span>
            <input
              ref={inputRef}
              className="w-full bg-inherit cursor-text focus:outline-none"
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
