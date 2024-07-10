import Toolbar from "@components/Toolbar";
import ImageViewer from "@components/ImageViewer";
import "./App.css";

function App() {
  return (
    <>
      <div className="App">
        <main className="App-body">
          <Toolbar />
          <ImageViewer width="100%" height="100%" />
        </main>
      </div>
    </>
  );
}

export default App;
