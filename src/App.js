import logo from './logo.svg';
import './App.css';
import Poll from './components/Poll/index.tsx'; // Correct path to Poll.js

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Poll />

      </header>
    </div>
  );
}

export default App;
