const express = require('express');

const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, async() => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
    const {Airport,City} = require('./models');
    // const city = await City.findByPk(1);
    // console.log('Cities:', city);
//    const airport= Airport.create({
//      name:'IndiraGandhiTerminal Airport',
//      code:'IGTU',
//      cityId:734,
//    })
   // console.log('Airport:', airport);
//    const response= await city.createAirport({
//     name:'IndiraGandhiTerminal Airport',
//     code:'IGTU',
//     cityId:'734',
//     address:'New Delhi'
//    });
//    console.log('Airport:', response);

    // const city = await City.findByPk(7);
    // await city.createAirport({name:'Dublin Airport',code:'DUB',address:'Germany'});
    //   await City.destroy({
    //     where: {
    //       id: 7,
    //     },
    //   });

});
