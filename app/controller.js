const express = require('express');
const { ArduinoData } = require('./serial')
const router = express.Router();

router.get('/', (request, response, next) => {

    let sumTemperatura = ArduinoData.ListTemperatura.reduce((a, b) => a + b, 0);
    let averageTemperatura = (sumTemperatura / ArduinoData.ListTemperatura.length).toFixed(2);

    let sumUmidade = ArduinoData.ListUmidade.reduce((a, b) => a + b, 0);
    let averageUmidade = (sumUmidade / ArduinoData.ListUmidade.length).toFixed(1);

    response.json({
        dataTemperatura: ArduinoData.ListTemperatura,
        dataUmidade: ArduinoData.ListUmidade,
        totalTemperatura: ArduinoData.ListTemperatura.length,
        totalUmidade: ArduinoData.ListUmidade.length,
        averageTemperatura: isNaN(average) ? 0 : averageTemperatura,
        averageUmidade: isNaN(averageB) ? 0 : averageUmidade
    });

});

module.exports = router;