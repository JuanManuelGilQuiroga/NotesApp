import { useState } from "react";
import { Link } from "react-router-dom";
import TrashIcon from "../assets/trash.svg"

export function NoteCard ({title, id}) {
    const [isClicked, setIsClicked] = useState(false);
    let timeoutId = null;
    console.log(isClicked)
    const handleMouseDown = () => {
        timeoutId = setTimeout(() => {
        setIsClicked(true);
        }, 1000); // Cambiar después de 1 segundo
    };

    const handleMouseUp = () => {
        clearTimeout(timeoutId); // Limpia el timeout si se suelta el botón
    };
    return (
        <Link onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} to={`/note/${id}`} className={`w-[100%] h-[120px] max-h-[180px] overflow-hidden rounded-xl px-14 flex justify-center items-center ${isClicked ? "bg-red-600" : "bg-violet-400"} `}>
            {isClicked ? 
            <img src={TrashIcon} />
            :
            <p className="text-black text-2xl">{title}</p>
            }
        </Link>
    )
}