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
app.use(cors());
const endpoints = {
  status: 'https://helldiverstrainingmanual.com/api/v1/war/status',
  info: 'https://helldiverstrainingmanual.com/api/v1/war/info',
  news: 'https://helldiverstrainingmanual.com/api/v1/war/news',
  campaign: 'https://helldiverstrainingmanual.com/api/v1/war/campaign',
  'major-orders': 'https://helldiverstrainingmanual.com/api/v1/war/major-orders',
  planets: 'https://helldiverstrainingmanual.com/api/v1/planets'
};

// Fetch data from an API and save to a JSON file
const fetchDataAndSave = async (url, fileName) => {
  try {
    const response = await axios.get(url);
    const data = response.data;

    const filePath = path.join(apiDataFolder, fileName);
    fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8', (err) => {
      if (err) {
        console.error(`Error writing data to ${filePath}:`, err);
      } else {
        console.log(`Data saved successfully to ${filePath}`);
      }
    });
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
  }
};

// Fetch data from all endpoints and save to JSON files
const fetchAllDataAndSave = () => {
  Object.keys(endpoints).forEach((key) => {
    fetchDataAndSave(endpoints[key], `${key}.json`);
  });

  setTimeout(() => mergeData(), 5000);
};

// Schedule the fetchAllDataAndSave function to run every minute
cron.schedule('* * * * *', fetchAllDataAndSave);
cron.schedule('30 * * * *', saveCampaign);
cron.schedule('0 * * * *', saveCampaign2);

// Fetch data immediately when the server starts
fetchAllDataAndSave();

function saveCampaign() {
  const apiDataFolder = './apiData';
  const jsonCompare = './jsonCompare';
  const campaignJson = JSON.parse(fs.readFileSync(path.join(apiDataFolder, 'campaign.json'), 'utf8'));

  const filePath = path.join(jsonCompare, `campaign30.json`);
  fs.writeFile(filePath, JSON.stringify(campaignJson, null, 2), 'utf8', (err) => {
    if (err) {
      console.error(`Error writing data to ${filePath}:`, err);
    } else {
      console.log(`Data saved successfully to ${filePath}`);
    }
  });
}

function saveCampaign2() {
  const apiDataFolder = './apiData';
  const jsonCompare = './jsonCompare';

  const campaign30 = JSON.parse(fs.readFileSync(path.join(jsonCompare, 'campaign30.json'), 'utf8'));
  const lastCampaign = JSON.parse(fs.readFileSync(path.join(apiDataFolder, 'campaign.json'), 'utf8'));

  if (!campaign30 || !lastCampaign) return;
  let comparedJson = campaign30.map((info) => {
    const sameIndexOtherJSON = campaign30.find((last) => last.planetIndex === info.planetIndex);

    if (sameIndexOtherJSON.percentage && info.percentage) {
      const percentage1 = info.percentage;
      const percentage2 = sameIndexOtherJSON.percentage;
      const percentageChange30Min = percentage2 - percentage1;
      const percentageChangePerHour = percentageChange30Min * 2;

      return { ...info, ...{ percentageChangePerHour } };
    } 
return info;
  })

  const filePath = path.join(jsonCompare, `campaignCompared.json`);
  fs.writeFile(filePath, JSON.stringify(comparedJson, null, 2), 'utf8', (err) => {
    if (err) {
      console.error(`Error writing data to ${filePath}:`, err);
    } else {
      console.log(`Data saved successfully to ${filePath}`);
    }
  });
}
function mergeData(dest = 'merged') {
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

    const campaignAddition = campaignJson.find((campaign) => campaign.planetIndex === index);
    console.log(campaignAddition);

    return { ...info, ...{ statusAddition }, ...{ planetAddition }, ...{ campaignAddition }, index };
  });
  /*mergedJson = mergedJson.map((info) => {
    const newAddition = Object.entries(planetsJson).find(([key, value]) => key === info.planet);
    console.log(newAddition);
    return {...info, ...newAddition};
  });*/


  const filePath = path.join(apiDataFolder, `${dest}.json`);
  fs.writeFile(filePath, JSON.stringify(mergedJson, null, 2), 'utf8', (err) => {
    if (err) {
      console.error(`Error writing data to ${filePath}:`, err);
    } else {
      console.log(`Data saved successfully to ${filePath}`);
    }
  });
}




// Set up GET endpoints for all JSON files
Object.keys(endpoints).forEach((key) => {
  app.get(`/data/${key}`, (req, res) => {
    const filePath = path.join(apiDataFolder, `${key}.json`);
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        return res.status(500).json({ error: `Error reading data from ${filePath}` });
      }
      res.json(JSON.parse(data));
    });
  });
});

app.get('/data/merged', (req, res) => {
  const filePath = path.join(apiDataFolder, 'merged.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: `Error reading data from ${filePath}` });
    }
    res.json(JSON.parse(data));
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
