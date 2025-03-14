import { useState, useEffect } from 'react';

function ChangeHealth({index,onHealthChange}) {
    const [planetData, setPlanetData] = useState([]);
    const [percentualDamage, setPercentualDamage] = useState(0);
    useEffect(() => {
        if (index === -1) {
            console.log('No planet index');
            return;
        }
        fetch(`https://helldiverstrainingmanual.com/api/v1/war/history/${index}`)
            .then(response => response.json())
            .then(data => {
                setPlanetData(data);
            })
            .catch(error => console.log(error));
    }, [index]);

    useEffect(() => {
        if (planetData.length > 12 && planetData[0]?.current_health !== undefined && planetData[12]?.current_health !== undefined) {
            const dmg = planetData[12].current_health - planetData[0].current_health;
            const percentualDmg = (dmg || 0) / 10000;
            setPercentualDamage(percentualDmg);
            onHealthChange(percentualDmg);

        }
    }, [planetData]);

    return (
        <>
            <p>{percentualDamage.toFixed(4)}%/h</p>
        </>
    );
}

export default ChangeHealth;
