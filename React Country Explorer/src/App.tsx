import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1>React Country Explorer</h1>
          <p>This is a simple React application to explore countries.</p>
          <button onClick={() => setCount(count + 1)}>Count: {count}</button>
        </header>
      </div>
    </>
  );
}

export default App;
