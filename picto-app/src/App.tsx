import ImageViewer from '@components/ImageViewer';
import './App.css'

function App() {
  return (
    <>
    <div className="App">
      <header className='App-header'>
        <h1>Picto 360</h1>
      </header>
      <main className='App-body'>
        <ImageViewer width="100%" height="100%"
          image="https://cdn.aframe.io/360-image-gallery-boilerplate/img/sechelt.jpg"
        />
      </main>
    </div>
    </>
  );
}

export default App
