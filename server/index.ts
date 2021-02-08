import cors from 'cors';
// import * as errorHandler from 'errorhandler';
import express from 'express';
import helmet from 'helmet';
import {customAlphabet} from 'nanoid';
import fetch from 'isomorphic-fetch';
import {config} from 'dotenv';
import {LinkResponse} from "../types/common";
config();
const app = express();
app.use(helmet());
app.use(express.json())
app.use(cors());

const port = process.env.PORT || 9001;
const PROD = process.env.NODE_ENV === 'production';

const DATA_URL = "https://api.jsonbin.io/b/601dc953d5aafc6431a484e3";
const headers = {
    "secret-key": process.env.JSON_BIN
};

const getLinks = async () => {
    const response = await fetch(DATA_URL+"/latest", { headers });    
    const links =  await response.json();
    return isLinkMap(links)? links as LinkMap : {}
}

type LinkMap = {
    [key: string]: { url: string, count: number}
}

const isLinkMap = (response: any): response is LinkMap => {
    return typeof response === "object";
}

const updateLinks = async (data: LinkMap) => {
    const options = { 
        method: "PUT",
        headers: { ...headers, "content-type": "application/json" }, 
        body: JSON.stringify(data)
    };
    const response = await fetch(DATA_URL, options);
    return await response.json();
}

if (PROD) {
    app.use('/', express.static('public'));    
}


/**
 * TODO: should accept multiple URLs 
 */
app.post('/v1/link', async (req, res) => {
    const { url } = req.body;
    // generate hash id and new url to show in UI
    // https://www.npmjs.com/package/nanoid
    const nanoid = customAlphabet('1234567890abcdef', 7);
    const hash = nanoid();
    
    // get the list of links
    const links = await getLinks();
    // if a url exists return it
    const existing = Object.keys(links).find(key => links[key].url === url);
    // make link to return
    const link = `http://0.0.0.0:${port}/${existing ? existing : hash}`;
    const newLinks: { [key: string]: string } = {};
    newLinks[url] = link;
    let response: LinkResponse = { links: newLinks };
    if(!existing) {
        links[hash] = { url, count: 0 };
        const { success, message } = await updateLinks(links);
         if (!success) {
            response = { error: message };
        } 
    }
    res.send(JSON.stringify(response));        
});

// https://www.kevinleary.net/regex-route-express/

app.get('/:id([0-9a-f]{7})', async (req, res) => {    
    const {id} = req.params;
    const links = await getLinks();
   
    if(Reflect.has(links, id)) {
        res.redirect(links[id].url)
        links[id].count = links[id].count + 1;
        await updateLinks(links);
    } else {
        res.redirect("/");
    }
});

app.listen(port, () => {
    console.log(`${PROD ? "prod" : "dev"} @ port:${port}.`);
})