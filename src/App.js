import './App.css';
import { useState } from 'react';
import Folder from './components/Folder';
import explorer from './data/folderData';
import useTraverseTree from './hooks/useTraverseTree';

function App() {
  const [explorerData, setExplorerData] = useState(explorer);
  const {insertNode} = useTraverseTree();

  const handleDataChange = (folderId, item, isFolder) => {
      const finalTree = insertNode(explorerData, folderId, item, isFolder);
      setExplorerData(finalTree);
  }

  return (
    <div className="App">
      <Folder handleDataChange = {handleDataChange} explorer = {explorerData}/>
    </div>
  );
}

export default App;
