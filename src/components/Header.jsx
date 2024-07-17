import PlayerStats from "./PlayerStats";
import diver from '../assets/diver.svg';
function Header({logo}){
    return (      
        <header className="bg-SC w-full">
            <div className="flex items-center p-4 justify-between border border-ACC" >
                <div className=" items-center gap-4 flex">
        <img src={logo} className="md:w-24 w-12" alt="logo" />
        <p className="font-semibold md:text-2xl">
            Helldivers 2
        </p>
        </div>
        <p className="absolute left-1/2 -translate-x-1/2 font-semibold md:text-2xl md:text-teal-50 text-transparent">
          GREAT GALACTIC WAR STATS
        </p>
        <h1 className="font-semibold flex items-center gap-2">
            Active Deployment:
            <p><PlayerStats /></p>
            <img src={diver} className="w-4" alt="diver" />
        </h1>
        </div>
        </header>
      )   
}

export default Header;