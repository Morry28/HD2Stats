const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const cron = require('node-cron');
const cors = require('cors'); 
const { info } = require('console');
const app = express();
const port = 4000;

const apiDataFolder = path.join(__dirname, 'apiData');
if (!fs.existsSync(apiDataFolder)) {
  fs.mkdirSync(apiDataFolder);
}


function mergeData() {
  const apiDataFolder = './apiData'; 

  const infoJson = JSON.parse(fs.readFileSync(path.join(apiDataFolder, 'info.json'), 'utf8'));
  const statusJson = JSON.parse(fs.readFileSync(path.join(apiDataFolder, 'status.json'), 'utf8'));
  const campaignJson = JSON.parse(fs.readFileSync(path.join(apiDataFolder, 'campaign.json'), 'utf8'));
  const planetsJson = JSON.parse(fs.readFileSync(path.join(apiDataFolder, 'planets.json'), 'utf8'));

  let mergedJson = infoJson.planetInfos.map((info) => {
    let index = infoJson.planetInfos.indexOf(info);
  const statusAddition = statusJson.planetStatus.find((status) => status.index === index);

  const planetsArray = Object.entries(planetsJson).map(([key, value]) => ({
    index: Number(key),
    ...value
  }));
  
  const planetAddition = planetsArray.find((planet) => planet.index === index);

  const campaignAddition = campaignJson.find((campaign) => campaign.planetIndex=== index);
  console.log(statusAddition);

return {...info, ...{statusAddition},...{planetAddition},...{campaignAddition},index};
  });
  /*mergedJson = mergedJson.map((info) => {
    const newAddition = Object.entries(planetsJson).find(([key, value]) => key === info.planet);
    console.log(newAddition);
    return {...info, ...newAddition};
  });*/


  const filePath = path.join(apiDataFolder, 'merged.json');
  fs.writeFile(filePath, JSON.stringify(mergedJson, null, 2), 'utf8', (err) => {
    if (err) {
      console.error(`Error writing data to ${filePath}:`, err);
    } else {
      console.log(`Data saved successfully to ${filePath}`);
    }
  });
}

mergeData()