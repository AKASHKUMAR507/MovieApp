import { createContext, useState } from "react";


export const GenresContext = createContext();

export const GenresProvider = ({children}) => {
    const [genre, setGenre] = useState([]);

    return (
        <GenresContext.Provider value={{genre, setGenre}}>
            {children}
        </GenresContext.Provider>
    )
}


