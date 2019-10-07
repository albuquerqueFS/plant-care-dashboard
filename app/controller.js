const express = require('express');
const { ArduinoData } = require('./serial')
const router = express.Router();


router.get('/', (request, response, next) => {

    let sum = ArduinoData.List.reduce((a, b) => a + b, 0);
    let average = (sum / ArduinoData.List.length).toFixed(2);

    let sumB = ArduinoData.ListB.reduce((a, b) => a + b, 0);
    let averageB = (sumB / ArduinoData.ListB.length).toFixed(1);

    response.json({
        data: ArduinoData.List,
        dataB: ArduinoData.ListB,
        total: ArduinoData.List.length,
        totalB: ArduinoData.ListB.length,
        average: isNaN(average) ? 0 : average,
        averageB: isNaN(averageB) ? 0 : averageB
    });

});

module.exports = router;