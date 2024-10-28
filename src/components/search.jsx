import CloseIcon from "../assets/close.svg"
import { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { NoteCard } from "./noteCard";

export function Search ({data, searchState}) {
    const [dataState, setDataState] = useState(data || null);
    const [searchTerm, setSearchTerm] = useState(''); 
    console.log(searchTerm)
    console.log(dataState)
    const filterData = (term) => {
        const lowercasedTerm = term.toLowerCase();
        const filtered = data.filter(doc => 
            doc.titulo.toLowerCase().includes(lowercasedTerm) || 
            doc.descripcion.toLowerCase().includes(lowercasedTerm)
        );
        setDataState(filtered);
    };


    const handleChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        filterData(value);
    };

    return (
        <>
            <header className="w-[100%] h-[150px] px-7 flex items-end">
                <div className="w-[100%] h-[50px] flex justify-between items-center px-7 bg-second-black rounded-full">
                    <input type="text" value={searchTerm} onChange={handleChange} placeholder="Search by the keyword..."  className=" w-[100%] px-2 bg-transparent border-none outline-none text-gray-300"/>
                    <img src={CloseIcon} onClick={() => searchState()}/>
                </div>
            </header>
            <main className="text-white w-[100%] px-7 flex flex-grow justify-center items-center">
                {searchTerm == "" ? 
                ""
                :
                dataState.length > 0 ? 
                    <div className="w-[100%] h-[100%] overflow-y-scroll overflow-hidden flex flex-col gap-5 mt-[50px]">
                        {dataState.map((nota, index) => {
                                return (
                                    <NoteCard key={index} title={nota.titulo} id={nota._id}/>                       
                                )
                        }) }
                    </div> 
                :
                    <div className="w-[100%] flex flex-col justify-center items-center mt-[-10rem] text-center font-light text-lg">
                        <img src="../../public/searchImage.png" className="w-[100%] max-w-[350px]" />
                        <p>File not found. Try searching again.</p>
                    </div>
                }
            </main>
        </>
    )
}