const { v4: uuidv4 } = require('uuid');
const useTraverseTree = () => {
    const insertNode = (tree, folderId, item, isFolder) => {
        if(tree.id === folderId && tree.isFolder){
            tree.items.unshift({
                id: uuidv4(),
                name: item,
                isFolder: isFolder,
                items: []
            })
            return tree;
        }

        let latestNode = [];
        latestNode = tree.items.map((obj) => {
            return insertNode(obj, folderId, item, isFolder);
        });

        return {...tree, items: latestNode};
    }

    return {insertNode};
}

export default useTraverseTree;
