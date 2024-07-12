import {useEffect,useState} from 'react'; 
function PlayerStats(){
const [players, setPlayers] = useState(0);

useEffect(() => {
    const fetchData = () => {
      fetch('http://localhost:4000/data/status')
        .then(response => response.json())
        .then(data => {
          let sum = 0;
          data.planetStatus.forEach(planet => sum += planet.players);
          setPlayers(sum);
        });
    };

    fetchData(); 
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval); 
},[])

return players

}

export default PlayerStats; 