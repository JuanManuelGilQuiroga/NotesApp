export function Icon ({icon, position, onClick }) {
    return (
        <div onClick={onClick} className={`w-[50px] h-[50px] rounded-lg flex justify-center items-center bg-second-black ${position}`}><img src={icon} /></div>
    )
}