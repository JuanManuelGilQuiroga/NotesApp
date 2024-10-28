export function NoteCard ({title}) {
    return (
        <div className="w-[100%] h-[120px] max-h-[180px] overflow-hidden rounded-xl px-14 flex justify-center items-center bg-violet-400">
            <p className="text-black text-2xl">{title}</p>
        </div>
    )
}