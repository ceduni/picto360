import Toolbar from './components/Toolbar';
import ImageViewer from './components/ImageViewer';

import './App.css';
import LowerBar from './components/Lowerbar';

const App: React.FC = () => {
  return (
    <div className="app">
      <Toolbar />
      <LowerBar />
      <ImageViewer />
    </div>
  );
}

export default App;
