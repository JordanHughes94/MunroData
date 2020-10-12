import express, { Application, Request, Response, NextFunction } from 'express'
const app: Application = express();
const fs = require('fs');
const neatCsv = require('neat-csv');
const request = require("request");


app.set('view engine', 'ejs');

app.get('/', (req: Request, res: Response) => {
  request('http://localhost:5000/munro', function (err: string, response: Response, body: string ) {
    if (err || response.statusCode !== 200) {
        return res.sendStatus(500);
    }

    var result = JSON.parse(body);

    function cleanData(o: Array<string>) {
      return o[1997] !== "";
    }
  
    res.render('index', { title: 'Main page', munroData: result.filter(cleanData)});
  });
});

app.get('/Munro', (req: Request, res: Response) => {

  fs.readFile('./munro_data.csv', async (err: string, data: object) => {
    if (err) {
      console.error(err)
      return
    }

    res.send(JSON.stringify(await neatCsv(data)))
  })
});

app.listen(5000, () => console.log('server running'));





