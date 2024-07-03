import Toolbar from './components/Toolbar';
import ImageViewer from './components/ImageViewer';

import './App.css';

const App: React.FC = () => {
  return (
    <div className="app">
      <Toolbar />
      <ImageViewer />
    </div>
  );
}

export default App;
