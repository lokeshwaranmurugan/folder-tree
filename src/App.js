import './App.css';
import { useState } from 'react';
import Folder from './components/Folder';
import explorer from './data/folderData';
import useTraverseTree from './hooks/useTraverseTree';
import ModeSwitch from './components/ModeSwitch';

function App() {
  const [explorerData, setExplorerData] = useState(explorer);
  const [checked, setChecked] = useState(true);

  const handleViewModeChange = (e) => {
    setChecked(e.target.checked);
  };
  
  const {insertNode} = useTraverseTree();

  const handleDataChange = (folderId, item, isFolder) => {
      const finalTree = insertNode(explorerData, folderId, item, isFolder);
      setExplorerData(finalTree);
  }

  return (
    <div className="App">
      <ModeSwitch handleViewModeChange={handleViewModeChange} />
      <Folder handleDataChange = {handleDataChange} explorer = {explorerData}/>
    </div>
  );
}

export default App;
