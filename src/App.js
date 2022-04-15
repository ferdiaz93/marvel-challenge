import './assets/scss/App.scss';
import { ConfiguratorProvider } from "./context";

function App() {
  return (
    <ConfiguratorProvider>
      <div className="App">
        <h1>test</h1>
      </div>
    </ConfiguratorProvider>
  );
}

export default App;
