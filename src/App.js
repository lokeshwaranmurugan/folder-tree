import './App.css';
import Folder from './components/Folder';
import explorer from './data/folderData';

function App() {
  console.log("This is");
  console.log(explorer);
  console.log("Explorer Block");
  return (
    <div className="App">
      <Folder explorer = {explorer}/>
    </div>
  );
}

export default App;
