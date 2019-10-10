const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;

class ArduinoDataRead {

    constructor() {
        this.listDataTemperatura = [];
        this.listDataUmidade = [];
    }

    get ListTemperatura() {
        return this.listDataTemperatura;
    }

    get ListUmidade() {
        return this.listDataUmidade;
    }

    SetConnection() {

        SerialPort.list().then(listSerialDevices => {

            let listArduinoSerial = listSerialDevices.filter(serialDevice => {
                return serialDevice.vendorId == 2341 && serialDevice.productId == 43;
            });

            if (listArduinoSerial.length != 1) {
                throw new Error("The Arduino was not connected or has many boards connceted");
            }

            console.log("Arduino found in the com %s", listArduinoSerial[0].comName);

            return listArduinoSerial[0].comName;

        }).then(arduinoCom => {

            let arduino = new SerialPort(arduinoCom, { baudRate: 9600 });

            const parser = new Readline();
            arduino.pipe(parser);

            parser.on('data', (data) => {
                var result = data.split(";");
                this.listDataTemperatura.push(parseFloat(result[0]));
                this.listDataUmidade.push(parseFloat(result[1]));
            });

        }).catch(error => console.log(error));
    }
}

const serial = new ArduinoDataRead();
serial.SetConnection();

module.exports.ArduinoData = {
    ListTemperatura: serial.ListTemperatura,
    ListUmidade: serial.ListUmidade
}; 