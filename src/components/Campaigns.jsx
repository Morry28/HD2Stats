import { useState, useEffect } from 'react';
import PlanetTab from './PlanetTab';

function Campaigns() {
    const [campaign, setCampaign] = useState([]);

    useEffect(() => {
        const getData = () => {
            const sessionData = sessionStorage.getItem('HD2merged');
            if (!sessionData) {
                console.log('No data in sessionStorage');
                return;
            }
            let sessionItems;
            try {
                sessionItems = JSON.parse(sessionData);
            } catch (e) {
                console.error('Error parsing JSON from sessionStorage:', e);
                return;
            }
            if (!sessionItems) {
                console.log('Parsed session items are null');
                return;
            }
            const ArrayPlanets = Array.isArray(sessionItems) ? sessionItems : Object.values(sessionItems);
            const campaigns = ArrayPlanets.filter(p => p.campaignAddition);
            setCampaign(campaigns);
        };

        getData(); 

        const intervalId = setInterval(getData, 3000);

        return () => clearInterval(intervalId); 
    }, []);

    return (
        <div className="max-w-screen mx-auto h-fit gap-4 p-4 flex overflow-x-scroll scrolling-auto">
            <PlanetTab allCampaign={campaign} />
        </div>
    );
}

export default Campaigns;
