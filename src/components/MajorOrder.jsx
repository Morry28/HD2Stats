import React, { useEffect, useState, useCallback } from 'react';
import medal from '../assets/medal.png';
import semo from '../assets/SEMO.png';
import DesignatedPlanets from './DesignatedPlanets';
import Counter from './Counter';
import PlanetTab from './PlanetTab';
const MajorOrder = () => {
    const [majorOrder, setMajorOrder] = useState([]);
    const [time, setTime] = useState(0);
    const [planets, setPlanets] = useState([]);
    const [campaign, setCampaign] = useState([]);

    const fetchData = useCallback(async () => {
        try {
            const response = await fetch('http://localhost:4000/data/major-orders');
            const data = await response.json();
            if (!data) return console.error('No data returned from server');
            const MO = data.map(d => d.setting);
            setTime(data[0]?.expiresIn || 0);
            setMajorOrder(MO);
        } catch (err) {
            console.error(err);
        }
    }, []);

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
            const campaigns = ArrayPlanets.filter(p => p.statusAddition);
            setPlanets(campaigns);
        };

        getData();

        const intervalId = setInterval(getData, 3000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 3000);
        return () => clearInterval(interval);
    }, [fetchData]);


    useEffect(() => {
    
        const taskIndexes = majorOrder.flatMap(order => 
            order?.tasks?.map(task => task.values[2]) || []
        );

        const moPlanets = planets.filter(planet => 
            taskIndexes.includes(planet.index)
        );
        

        setCampaign(moPlanets);
        
    }, [majorOrder, planets]);
    
    useEffect(() => {console.log(campaign)}, [campaign]);
    return (
        <div className='flex flex-col'>
            <div className='w-full h-auto flex bg-ACC items-center'>
                {majorOrder.length > 0 ? (
                    majorOrder.map(mo => (
                        <div className='p-3 flex w-full justify-between font-semibold text-BG' key={mo.id}>
                            <div className='md:flex md:flex-col md:w-fit hidden bg-BG items-center justify-between p-3'>
                                <p className='text-ACC truncate'>{mo.overrideTitle}</p>
                                <img src={semo} className='w-20' alt='semo' />
                            </div>
                            <div className='chain flex flex-col items-center md:mx-4 mx-auto w-3/4 gap-2'>
                                <h1 className='p-2 bg-BG text-ACC h-fit truncate md:text-3xl text-sm'>A NEW MAJOR ORDER DISPATCHED !</h1>
                                <p className='text-wrap break-words overflow-hidden md:text-justify text-center max-w-screen-2xl'>{mo.overrideBrief.replace("<i=1>","").replace("</i>","")}</p>
                                <p className='text-wrap break-words overflow-hidden max-w-screen-2xl'>{mo.taskDescription}</p>
                                <p className='p-2 bg-BG text-ACC h-fit truncate'>Remaining time: <Counter time={time} /></p>
                                <div className='shadow-2xl md:max-w-full max-w-fit mx-auto md:h-fit h-fit gap-4 md:p-4 md:flex-row flex flex-col overflow-x-auto md:relative' >
                               {/* <PlanetTab allCampaign={campaign} >*/}
                                <DesignatedPlanets allCampaign={campaign} />
                                </div>
                            </div>

                            <div className='md:flex md:flex-col hidden relative bg-BG items-center justify-between p-3'>
                                <p className='text-ACC truncate'>Reward: {mo.rewards[0].amount}</p>
                                <img src={medal} className='w-12' alt='medal' />
                            </div>
                        </div>
                    ))
                ) : (
                    <div className='m-auto flex flex-col'>
                        <p className='text-BG font-semibold  m-auto mt-8'>Major Order Status:</p>
                        <p className='text-BG font-bold text-5xl m-auto mt-2'>Major Order Ended</p>
                        <p className='text-BG font-semibold m-auto p-8 text-justify'>Stand By</p>
                    </div>
                )}
            </div>

        </div>

    );
};

export default MajorOrder;
