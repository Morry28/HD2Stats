import logo from './assets/Helldivers_2.svg';
import React from 'react';
import Header from './components/Header';
import MajorOrder from './components/MajorOrder';
import Campaigns from './components/Campaigns';
import Canva from './components/Canvas';
import { MergedFetch } from './helpers/utils.js';
import News from './components/News';
function App() {
  
  MergedFetch();

  return (

    <div className="h-full  w-full">
      <Header logo={logo} />
      <div className="bg-BG h-full flex flex-col">
        <div className=''>
          <MajorOrder />
        </div>
        <h1 className='flex m-auto text-PM font-bold text-3xl my-8'>
         All Active Campaign
          </h1>
        <div className=' '>
          <Campaigns />
        </div>
        <div className='flex flex-col'>
        <h1 className='text-PM font-bold text-3xl mt-8 m-auto'>Latest News</h1>

          <News/>
        </div>
        <div className='m-auto bg-BG p-10 relative md:block hidden'>
          <Canva />
        </div>
      </div>
    </div>

  );
}

export default App;
