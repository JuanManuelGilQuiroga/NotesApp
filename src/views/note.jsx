import { Icon } from "../components/icon"
import SaveIcon from "../assets/save.svg"
import VisibilityIcon from "../assets/visibility.svg"
import LeftIcon from "../assets/left.svg"
import { useEffect, useRef, useState } from "react";

export function Note () {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    
    const titleRef = useRef(null);
    const descriptionRef = useRef(null);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    useEffect(() => {
        if (titleRef.current) {
            titleRef.current.style.height = 'auto';
            titleRef.current.style.height = `${titleRef.current.scrollHeight}px`;
        }
    }, [title]);

    useEffect(() => {
        if (descriptionRef.current) {
            descriptionRef.current.style.height = 'auto';
            descriptionRef.current.style.height = `${descriptionRef.current.scrollHeight}px`;
        }
    }, [description]);

    return (
        <div className="w-[100%] h-[100%] flex flex-col items-center">
            <header className="w-[100%] h-[150px] flex justify-between items-center px-5">
                <Icon icon={LeftIcon}/>
                <div className="flex gap-4">
                    <Icon icon={VisibilityIcon}/>
                    <Icon icon={SaveIcon}/>
                </div>
            </header>
            <main className="text-white w-[100%] px-5">
                <textarea ref={titleRef} onChange={handleTitleChange} placeholder="Titulo" name="titulo" className="text-5xl w-[100%] px-2 bg-transparent border-none outline-none text-gray-300"></textarea>
                <textarea ref={descriptionRef} onChange={handleDescriptionChange} placeholder="Escribe algo..." name="descripcion" className="text-2xl w-[100%] px-2 bg-transparent border-none outline-none text-gray-300 mt-10"></textarea>
            </main>
        </div>
    )
}