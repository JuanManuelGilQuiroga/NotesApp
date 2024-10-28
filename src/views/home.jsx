import SearchIcon from "../assets/search.svg"
import InfoIcon from "../assets/info.svg"
import AddIcon from "../assets/add.svg"
import { Icon } from "../components/icon"
import { Link, useLoaderData } from "react-router-dom";
import { NoteCard } from "../components/noteCard";
import { useEffect, useRef, useState } from "react";

export const notasLoader = async () => {
    try {
        let res = await fetch(`http://localhost:3001/notes`,{
            credentials: 'include'
        });
        if (!res.ok) {
            throw new Error('No se encontraron notas');
        }
        const data = await res.json();
        console.log(data)
        return {data};
    } catch (err) {
        return { error: true, message: err.message };
    }
}

export function Home () {
    const {data, error} = useLoaderData()
    const [info, setInfo] = useState(false);
    const infoRef = useRef(null);
    console.log(data)

    const handleClickOutside = (event) => {
        if (infoRef.current && !infoRef.current.contains(event.target)) {
            setInfo(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, []);

    return (
        <div className="w-[100%] h-[100%] flex flex-col items-center">
            <header className="w-[100%] h-[150px] flex justify-between items-center px-5">
                <p className="text-5xl text-white">Notes</p>
                <div className="flex gap-4">
                    <Icon icon={SearchIcon}/>
                    <Icon icon={InfoIcon} onClick={() => setInfo(true)}/>
                </div>
            </header>
            <main className="text-white w-[100%] px-5 flex flex-grow justify-center items-center">
                {data.length > 0 ? 
                <div className="w-[100%] h-[100%] overflow-y-scroll overflow-hidden flex flex-col gap-5">
                    {data.map((nota, index) => {
                        return (
                            <NoteCard key={index} title={nota.titulo} id={nota._id}/>                       
                        )
                    }) }
                </div> :
                <div className="w-[100%] flex flex-col justify-center items-center mt-[-10rem] text-center font-light text-lg">
                    <img src="../../public/homeImage.png" className="w-[100%] max-w-[350px]" />
                    <p>Create your first note !</p>
                </div>
                }
            </main>
            <Link to="/note" className="w-[70px] h-[70px] rounded-full flex justify-center items-center absolute bottom-12 right-5"style={{boxShadow: '-4px 4px 10px 2px rgba(0, 0, 0, 0.5)'}} ><img src={AddIcon} /></Link>
            {info ? 
            <div  className="fixed inset-0 bg-white bg-opacity-30 flex items-center justify-center z-10">
                {/* Contenedor del Modal */}
                <div ref={infoRef} className="bg-first-black text-white px-6 py-8 rounded-3xl shadow-lg w-96 flex flex-col justify-around items-center gap-5 font-extralight">
                    <div className="w-[100%] flex flex-col gap-2">
                        <p className="">Designed by -</p>
                        <p className="">Redesigned by -</p>
                        <p className="">Illustrations -</p>
                        <p className="">Icons -</p>
                        <p className="">Font -</p>
                    </div>
                    <p>Made by</p>
                </div>
            </div>
            :
            ("")
            }
            
        </div>
    )
}