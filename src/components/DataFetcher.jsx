import {useEffect,useState} from 'react'; 
function DataFetcher(){
const [players, setPlayers] = useState(0);

useEffect(()=>{
fetch('https://helldiverstrainingmanual.com/api/v1/war/status')
.then(response => response.json())
.then(data=> {
    console.log(data)
    let sum=0;
    data.planetStatus.forEach(planet=> sum+=planet.players);
    setPlayers(sum);
})
},[])


}

export default DataFetcher; 