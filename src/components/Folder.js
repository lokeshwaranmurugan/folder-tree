import {useState} from "react";



export default function Folder({handleDataChange = () => {}, explorer}){
    const [expand, setExpand] = useState(false);
    const [showInput, setShowInput] = useState({
        visibile: false,
        isFolder: false
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
            handleDataChange(explorer.id, e.target.value, showInput.isFolder);
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
                        return (<Folder explorer={item} key={item.id} handleDataChange={handleDataChange}/>);
                    })
                }
            </div>
        </div>
    );
}