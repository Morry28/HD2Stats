import {useEffect, useState} from 'react';
import TestBlock from "../TestBlock";
import Bar from "./Bar";
function PlanetTab(allCampaign){
    const [campaigns, setCampaigns] = useState([]);
    useEffect(() => {

        setCampaigns(allCampaign);
    }, [allCampaign]);

    return (
        <>{campaigns.allCampaign && campaigns.allCampaign.length > 0 
            ? campaigns.allCampaign.map(p => (
                <div key={p.id} className="flex-shrink-0 w-fit h-full m-auto relative">
                    
                    <div className="truncate h-12 bg-BG content-center flex border-stone-700 border-dashed border text-ACC justify-around">
                        <p className="p-3 font-bold">{p.planetAddition.name}</p>
                        <p className="p-3 font-semibold">Sector: {p.planetAddition.sector}</p>
                    </div>
                    <div className="m-auto h-fit bg-SC ">
                        <TestBlock biome={p.planetAddition.biome ? p.planetAddition.biome.slug : ''} />
                        <Bar planet={p.campaignAddition} />
                    </div>
                    <div className="flex w-full">
                        {p.planetAddition.environmentals && p.planetAddition.environmentals.length > 0 ? (
                            p.planetAddition.environmentals.map((n, index) => n ? (
                                <div key={index} className="truncate w-full h-12 bg-BG items-center flex text-ACC gap-2 p-2 group">
                                    <p className="font-semibold p-2 bg-SC rounded-md text-ACC">{n.name}</p>
                                    <span className="cursor-default group-hover:visible invisible bg-BG text-ACC p-3 absolute max-w-40 text-wrap break-words rounded-md bottom-0">{n.description}</span>
                                </div>
                            ) : (
                                <div key={index} className="truncate w-full h-12 bg-ACC items-center flex text-BG gap-2 p-2 group">
                                    <p className="font-semibold p-2 bg-SC rounded-md text-ACC">Nice Environment</p>
                                </div>
                            ))) : (
                            <div className="truncate w-full h-12 bg-BG items-center flex text-BG gap-2 p-2 group">
                                <p className="font-semibold p-2 bg-SC rounded-md text-PM">Nice Environment</p>
                            </div>
                        )}

                    </div>
                </div>
            ))
            : null
        }</>
    );
}
export default PlanetTab;
/*

*/