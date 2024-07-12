import { useState, useEffect } from 'react';
import diver from '../assets/diver.svg';
import Terminids from '../assets/Terminids.png';
import Automatons from '../assets/Automatons.png';
import Illuminates from '../assets/Illuminates.png';
import attack from '../assets/attack.png';
import defense from '../assets/defence.png';
import ChangeHealth from './ChangeHealth';

function Bar({ planet }) {
    const defaultPlanet = {
        players: 0,
        defense: "no",
        health: 0,
        maxHealth: 0,
        percentage: 0,
        planetIndex:-1,
    };

    const factions = {
        Automatons: {
            name: 'Automatons',
            image: Automatons,
        },
        Terminids: {
            name: 'Terminids',
            image: Terminids,
        },
        Illuminates: {
            name: 'Illuminates',
            image: Illuminates,
        },
        Default: {
            name: 'Illuminates',
        },
    };

    const currentPlanet = planet || defaultPlanet;
    const healthPercentage = (currentPlanet.health / currentPlanet.maxHealth) * 100;
    return (
        <div className="h-fit flex w-full flex-col items-center relative text-PM">
            <div className='absolute w-full flex justify-end -translate-y-36 gap-2 p-2 '>
                <p>{currentPlanet.players}</p>
                <img src={diver} className="w-4" alt="diver" />
            </div>
            <div className='absolute w-full flex justify-start -translate-y-36 gap-2 p-2'>
                {
                    currentPlanet.faction ? (
                        <img src={factions[currentPlanet.faction].image} className="w-6 " alt="faction" />
                    )
                        :
                        (<span></span>)
                }
                <img src={currentPlanet.defense===true ? defense : attack} className="w-6" alt="defense/attack" />
            </div>
            <div className='absolute w-full flex justify-start -translate-y-8 gap-2 p-2'>
                <p>{currentPlanet.percentage.toFixed(2)}%</p>
            </div>
            <div className='absolute w-full flex justify-end -translate-y-8 gap-2 p-2'>
                {currentPlanet.planetIndex?
            (<ChangeHealth index={currentPlanet.planetIndex||-1}/>)
            :null
                }</div>
            <div className="w-full bg-SC h-2">
                <div
                    className="bg-red-500 h-4"
                    style={{ width: `${healthPercentage ?? 100}%` }}
                ></div>
            </div>
            <div className="w-full bg-SC h-2">
                <div
                    className="bg-PM h-2"
                    style={{ width: `${currentPlanet.percentage ?? 100}%` }}
                ></div>
            </div>
        </div>
    );
}

export default Bar;
