import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TrashIcon from "../assets/trash.svg"

export function NoteCard ({title, id}) {
    const navigate = useNavigate();
    const [isClicked, setIsClicked] = useState(false);
    const [shouldRedirect, setShouldRedirect] = useState(true);
    let timeoutId = useRef(null);
    const infoRef = useRef(null);

    console.log(isClicked)
    
    const handleMouseDown = () => {
        timeoutId.current = setTimeout(() => {
            setIsClicked(true);
            setShouldRedirect(false);
        }, 500);
    };

    const handleMouseUp = () => {
        clearTimeout(timeoutId.current);
    };

    const handleTouchStart = () => {
        timeoutId.current = setTimeout(() => {
            setIsClicked(true);
            setShouldRedirect(false);
        }, 500);
    };
    
    const handleTouchEnd = () => {
        clearTimeout(timeoutId.current);
    };

    const handleClickOutside = (event) => {
        if (infoRef.current && !infoRef.current.contains(event.target)) {
            setIsClicked(false);
            setShouldRedirect(true);
        }
    };

    const handleClick = (event) => {
        if (!shouldRedirect) {
            event.preventDefault();
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            clearTimeout(timeoutId.current); // Limpia el timeout al desmontar
        };
    }, []);

    const handleDelete = async (id) => {
        const response = await fetch(`http://localhost:3001/notes/${id}`, {
            method: 'DELETE',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            return;
        }

        const data = await response.json();
        console.log(data.message);
        navigate('/home');

    };

    return (
        <Link onClick={handleClick}  ref={infoRef} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} to={`/note/${id}`} className={`w-[100%] h-[120px] max-h-[180px] overflow-hidden rounded-xl px-14 flex justify-center items-center ${isClicked ? "bg-red-600" : "bg-violet-400"} `}>
            {isClicked ? 
            <img src={TrashIcon} onClick={() => handleDelete(id)}/>
            :
            <p className="text-black text-2xl">{title}</p>
            }
        </Link>
    )
}