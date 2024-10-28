import { Icon } from "../components/icon"
import SaveIcon from "../assets/save.svg"
import VisibilityIcon from "../assets/visibility.svg"
import LeftIcon from "../assets/left.svg"
import EditIcon from "../assets/edit.svg"
import { useEffect, useRef, useState } from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

export const notaLoader = async ({params}) => {
    const { id } = params;
    if (id) {
        try {
            let res = await fetch(`http://localhost:3001/notes/${id}`,{
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
    } else {
        return null;
    }
}

export function Note () {
    const data = useLoaderData() || { data: null };;
    const navigate = useNavigate();
    console.log(data)
    const [title, setTitle] = useState(data.data ? data.data.titulo : "Titulo");
    const [description, setDescription] = useState(data.data ? data.data.descripcion : "Escribe algo...");
    const [isEditing, setIsEditing] = useState(false);

    const titleRef = useRef(null);
    const descriptionRef = useRef(null);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleGoBack = () => {
    navigate(-1); // -1 para ir a la página anterior
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
    

    const location = useLocation();
    const currentPath = location.pathname;
    const segments = currentPath.split('/');
    const endpoint = segments[segments.length - 1];

    const handlePostOrPut = async (titulo, descripcion) => {
        if (endpoint == "note") {
            const response = await fetch('http://localhost:3001/notes', {
                method: 'POST',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ titulo, descripcion }),
            });

            if (!response.ok) {
                return;
            }

            const data = await response.json();
            console.log(data.message);
            navigate('/home');
        } else {
            const id = endpoint;
            console.log("este es el id",id)
            const response = await fetch(`http://localhost:3001/notes/${id}`, {
                method: 'PUT',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ titulo, descripcion }),
            });

            if (!response.ok) {
                return;
            }

            const data = await response.json();
            console.log(data.message);
            navigate('/home');
        }
    };

    return (
        <div className="w-[100%] h-[100%] flex flex-col items-center">
            <header className="w-[100%] h-[150px] flex justify-between items-center px-5">
                <Icon icon={LeftIcon} onClick={() => handleGoBack()}/>
                <div className="flex gap-4">
                    {data.data ?
                        isEditing ? 
                        <>
                            <Icon icon={VisibilityIcon}/>
                            <Icon icon={SaveIcon} onClick={() => handlePostOrPut(title, description)}/>
                        </> 
                        :
                        <Icon icon={EditIcon} onClick={() => toggleEdit()}/>
                    :
                    <>
                        <Icon icon={VisibilityIcon}/>
                        <Icon icon={SaveIcon} onClick={() => handlePostOrPut(title, description)}/>
                    </>    
                    }
                </div>
            </header>
            <main className="text-white w-[100%] px-5">
                {data.data ?
                    isEditing ? 
                    <>
                        <textarea ref={titleRef} onChange={handleTitleChange} placeholder={title} name="titulo" className="text-5xl w-[100%] px-2 bg-transparent border-none outline-none text-gray-300">{title}</textarea>
                        <textarea ref={descriptionRef} onChange={handleDescriptionChange} placeholder={description} name="descripcion" className="text-2xl w-[100%] px-2 bg-transparent border-none outline-none text-gray-300 mt-10">{description}</textarea>
                    </>
                    :
                    <>
                        <p className="text-5xl w-[100%] px-2">{title}</p>
                        <p className="text-2xl w-[100%] px-2 mt-10">{description}</p>
                    </>
                :
                <>
                    <textarea ref={titleRef} onChange={handleTitleChange} placeholder={title} name="titulo" className="text-5xl w-[100%] px-2 bg-transparent border-none outline-none text-gray-300"></textarea>
                    <textarea ref={descriptionRef} onChange={handleDescriptionChange} placeholder={description} name="descripcion" className="text-2xl w-[100%] px-2 bg-transparent border-none outline-none text-gray-300 mt-10"></textarea>
                </> 
                }  
            </main>
            <div></div>
        </div>
    )
}