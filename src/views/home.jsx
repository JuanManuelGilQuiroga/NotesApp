import SearchIcon from "../assets/search.svg"
import InfoIcon from "../assets/info.svg"
import AddIcon from "../assets/add.svg"
import { Icon } from "../components/icon"
import { Link, useLoaderData } from "react-router-dom";
import { NoteCard } from "../components/noteCard";

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
    console.log(data)
    return (
        <div className="w-[100%] h-[100%] flex flex-col items-center">
            <header className="w-[100%] h-[150px] flex justify-between items-center px-5">
                <p className="text-5xl text-white">Notes</p>
                <div className="flex gap-4">
                    <Icon icon={SearchIcon}/>
                    <Icon icon={InfoIcon}/>
                </div>
            </header>
            <main className="text-white w-[100%] px-5">
                {data.length > 0 ? 
                <div className="w-[100%] h-[100%] overflow-y-scroll overflow-hidden">
                    {data.map((nota, index) => {
                        return (
                            <NoteCard title={nota.titulo} id={nota._id}/>                       
                        )
                    }) }
                </div> :
                <div className="w-[100%]">
                    <img src="../../public/homeImage.png" className="w-[100%]" />
                    <p>Create your first note !</p>
                </div>
                }
            </main>
            <Link to="/note" className="w-[70px] h-[70px] rounded-full flex justify-center items-center absolute bottom-12 right-5"style={{boxShadow: '-4px 4px 10px 2px rgba(0, 0, 0, 0.5)'}} ><img src={AddIcon} /></Link>
        </div>
    )
}