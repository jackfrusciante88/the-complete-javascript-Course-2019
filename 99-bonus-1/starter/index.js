const fs = require('fs');
const http = require('http');
const url = require('url');

const json = fs.readFileSync(`${__dirname}/data/data.json`,'UTF-8');
const laptopData = JSON.parse(json)

const server = http.createServer((req, res)=> {

    const pathName = url.parse(req.url, true).pathname;
    const query = url.parse(req.url, true).query;
    const id = url.parse(req.url, true).query.id;

    console.log(url.parse(req.url, true));
    console.log(query);

    if(pathName === '/products'|| pathName === '/' ){
        res.writeHead(200,{'content-type':'text/html'})
        res.end(`<h1>this is the PRODUCT PAGE</h1>`)
    }

    else if(pathName ==='/laptop' && id < laptopData.length){
        res.writeHead(200,{'content-type':'text/html'})
        res.end(`<h1>this is the LAPTOP PAGE for id ${id}</h1>`)
    }else {
        res.writeHead(404,{'content-type':'text/html'})
        res.end('<h1>page not found</h1>')
    }

});

server.listen(1337, '127.0.0.1', ()=> {
    console.log('listening for request now');
});