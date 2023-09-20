import {useState} from "react";

const { v4: uuidv4 } = require('uuid');

export default function Folder({explorer}){
    const [expand, setExpand] = useState(false);
    const [showInput, setShowInput] = useState({
        visibile: false,
        isFolder: null
    });
    const expandFolder = () => {
        setExpand(!expand);
    }
    const onAddToFolder = (e, isFolder) => {
        setExpand(true);
        setShowInput({
            visibile:true,
            isFolder:isFolder
        })        
        e.stopPropagation();
    }
    const handleNewEntry = (e) => {
        if(e.keyCode === 13 && e.target.value){
            explorer.items.push({
                id: uuidv4(),
                name: e.target.value,
                isFolder: showInput.isFolder,
                items: []
            });
            console.log(explorer);
            setShowInput({...showInput,visibile:false});
        }
    }
    return (
        <div>
            {
                explorer.isFolder ?
                    <div className="folder" onClick={expandFolder}>
                        <span> 📂 {explorer.name} </span>
                        <div>
                            <button onClick={(e)=> onAddToFolder(e,true)}> + 📂</button>
                            <button onClick={(e)=> onAddToFolder(e,false)}> + 📄 </button>
                        </div>
                    </div>
                    :
                    <div className="file">
                        <span> 📄 {explorer.name} </span>
                    </div>
            }            
            <div style={{ marginLeft : 15, display: expand ? 'block' : 'none' }}> 
                {
                    showInput.visibile &&
                    <div className="inputContainer">
                        <span>
                            {showInput.isFolder ? '📂':'📄'}
                        </span>
                        <input 
                            className="inputContainer__input"
                            onKeyDown={handleNewEntry}
                            onBlur={()=>setShowInput({...showInput,visibile:false})}
                            autoFocus
                        />
                    </div>
                }
                {
                    explorer.items.map((item) =>{
                        return (<Folder explorer={item} key={item.id}/>);
                    })
                }
            </div>
        </div>
    );
}