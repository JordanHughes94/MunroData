"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const fs = require('fs');
const neatCsv = require('neat-csv');
const request = require("request");
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    request('http://localhost:5000/munro', function (err, response, body) {
        if (err || response.statusCode !== 200) {
            return res.sendStatus(500);
        }
        var result = JSON.parse(body);
        function cleanData(o) {
            return o[1997] !== "";
        }
        res.render('index', { title: 'Main page', munroData: result.filter(cleanData) });
    });
});
app.get('/Munro', (req, res) => {
    fs.readFile('./munro_data.csv', (err, data) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            console.error(err);
            return;
        }
        res.send(JSON.stringify(yield neatCsv(data)));
    }));
});
app.listen(5000, () => console.log('server running'));
