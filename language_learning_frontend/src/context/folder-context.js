import {createContext, useContext, useState} from "react";

const FolderContext = createContext();

export const FolderProvider = ({children}) => {
    const [folderReload, setFolderReload] = useState(false);

    const triggerReload = () => {
         setFolderReload(prevState => !prevState);
    }

    return (
        <FolderContext.Provider
            value={{
                folderReload,
                triggerReload
            }}>
            {children}
        </FolderContext.Provider>
    );
}
export const useFolderContext = () => useContext(FolderContext);