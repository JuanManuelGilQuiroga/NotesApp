export function Icon ({icon, position}) {
    return (
        <div className={`w-[50px] h-[50px] rounded-lg flex justify-center items-center bg-second-black ${position}`}><img src={icon} /></div>
    )
}