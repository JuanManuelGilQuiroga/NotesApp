import { Link } from "react-router-dom";

export function NoteCard ({title, id}) {
    return (
        <Link to={`/note/${id}`} className="w-[100%] h-[120px] max-h-[180px] overflow-hidden rounded-xl px-14 flex justify-center items-center bg-violet-400">
            <p className="text-black text-2xl">{title}</p>
        </Link>
    )
}