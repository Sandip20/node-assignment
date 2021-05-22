const Router = require('express').Router();
const fs = require('fs');
const path = require('path');
const cache = require('../store/cache')()
Router.post('/', (req, res) => {
    let body = req.body;
    let dataFolder = path.join(__dirname, '..', 'data');
    if (!fs.existsSync(dataFolder)) {
        fs.mkdirSync(dataFolder);
    }
    let filename = Date.now().toString() + '.json';
    path.join(dataFolder, Date.now().toString() + '.json');
    cache.setFileName(filename)
    fs.writeFile(path.join(dataFolder, filename), JSON.stringify(body), 'utf8', (err) => {
        if (err) {
            console.log(err)
        }
    });
    res.send({ success: true, message: 'data saved successfully' });


});
Router.get('/', (req, res) => {
    let recentFile = cache.getfilename();
    res.setHeader('Content-Type', 'application/json');
    if (!recentFile) {
        fs.readdir('./data', (err, files) => {
            if (err) {
                return res.status(404).send({ success: false, message: 'No Data found' })
            }
            cache.setFileName(files.map(file => file.split('.json')[0]).sort((a, b) => b - a)[0] + '.json');
            fs.createReadStream('./data/' + cache.getfilename()).pipe(res)

        })
    } else {
        fs.createReadStream('./data/' + recentFile).pipe(res)
    }


})
module.exports = Router