import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useReducer,
  createContext,
} from "react";

import "./App.css";

// ===============================
// CONTEXT
// ===============================
const ThemeContext = createContext();

// ===============================
// TAB 1: useState & useEffect
// ===============================
function ClockTimer() {
  const [time, setTime] = useState(new Date());
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const clockInterval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    const secondsInterval = setInterval(() => {
      setSeconds((previous) => previous + 1);
    }, 1000);

    return () => {
      clearInterval(clockInterval);
      clearInterval(secondsInterval);
    };
  }, []);

  return (
    <div className="main-card">
      <h3 className="section-title">
        ◷ &nbsp; Live Digital Clock & Effect Timer
      </h3>

      <div className="timer-grid">
        <div className="timer-box">
          <h4>CURRENT TIME</h4>
          <h2>{time.toLocaleTimeString()}</h2>
        </div>

        <div className="timer-box">
          <h4>SECONDS ACTIVE (USEEFFECT)</h4>
          <h2 className="green">{seconds} s</h2>
        </div>
      </div>

      <p className="description">
        <code>useEffect</code> establishes a background interval
        subscription on initial mount and cleans it up when unmounted.
      </p>
    </div>
  );
}

// ===============================
// TAB 2: useRef
// ===============================
function RefExamples() {
  const inputRef = useRef(null);
  const countRef = useRef(0);

  const [displayCount, setDisplayCount] = useState(0);

  const incrementRef = () => {
    countRef.current += 1;
  };

  const forceRender = () => {
    setDisplayCount((previous) => previous + 1);
  };

  return (
    <div className="main-card">
      <h3 className="section-title">
        # &nbsp; DOM Reference & Mutable Persistent Values
      </h3>

      <div className="example-box">
        <h4>1. Direct DOM Element Focus</h4>

        <div className="input-row">
          <input
            ref={inputRef}
            type="text"
            placeholder="Click focus button below..."
          />

          <button
            className="purple-btn"
            onClick={() => inputRef.current.focus()}
          >
            Focus Input
          </button>
        </div>
      </div>

      <div className="example-box">
        <h4>2. Silent Ref Counter (No Re-renders triggered)</h4>

        <div className="button-row">
          <button className="orange-btn" onClick={incrementRef}>
            Increment Ref Value
          </button>

          <button className="dark-btn" onClick={forceRender}>
            Force Component Re-render
          </button>
        </div>

        <p className="ref-value">
          Ref Value (updates silently):{" "}
          <strong>{countRef.current}</strong>
        </p>
      </div>
    </div>
  );
}

// ===============================
// TAB 3: useContext & useReducer
// ===============================

function reducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };

    case "DECREMENT":
      return { count: state.count - 1 };

    case "RESET":
      return { count: 0 };

    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  const { dark, toggleTheme } = useContext(ThemeContext);

  return (
    <div className={`theme-panel ${dark ? "dark-theme" : ""}`}>
      <div className="theme-header">
        <h3>☾ &nbsp; useContext Theme Consumer</h3>

        <button className="purple-btn" onClick={toggleTheme}>
          Toggle Theme State
        </button>
      </div>

      <div className="counter-box">
        <div className="counter-icon">▱</div>

        <h2 className="count-text">Count: {state.count}</h2>

        <div className="button-row">
          <button
            className="green-btn"
            onClick={() => dispatch({ type: "INCREMENT" })}
          >
            Dispatch +
          </button>

          <button
            className="red-btn"
            onClick={() => dispatch({ type: "DECREMENT" })}
          >
            Dispatch -
          </button>

          <button
            className="gray-btn"
            onClick={() => dispatch({ type: "RESET" })}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

function HooksContext() {
  const [dark, setDark] = useState(true);

  const toggleTheme = () => {
    setDark((previous) => !previous);
  };

  return (
    <ThemeContext.Provider value={{ dark, toggleTheme }}>
      <Counter />
    </ThemeContext.Provider>
  );
}

// ===============================
// MAIN APPLICATION
// ===============================
export default function App() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    "1. useState & useEffect",
    "2. useRef Hook",
    "3. useContext & useReducer",
  ];

  return (
    <div className="app">
      <nav className="tabs">
        {tabs.map((tab, index) => (
          <button
            key={tab}
            className={`tab ${activeTab === index ? "active" : ""}`}
            onClick={() => setActiveTab(index)}
          >
            {tab}
          </button>
        ))}
      </nav>

      <main className="tab-content">
        {activeTab === 0 && <ClockTimer />}
        {activeTab === 1 && <RefExamples />}
        {activeTab === 2 && <HooksContext />}
      </main>
    </div>
  );
}