const ENV =  process.env.ENV;

module.exports = class File {

    constructor(ARGS){
        this.ENV = ARGS.ENV
        this.title = ARGS.title || 'LiquidZulu.xyz';
    }

    async load() {
        this.html = `<!DOCTYPE html>
        <html>

            <head>

                <style>

                    table {
                        border-collapse: collapse;
                        width: 100%;
                    }
                    
                    th, td {
                        padding: 8px;
                        text-align: left;
                        border-bottom: 1px solid #ddd;
                        font-family: "Courier New", Courier, monospace;
                    }
                    
                    tr:hover {
                        background-color:#f5f5f5;
                    }
                </style>

            </head>
        
            <body>
                
                <table>

                    <tr>

                        <th>Currency</th>
                        <th>Currency Code</th>
                        <th>Address</th>

                    </tr>

                    <tr>

                        <td>Bitcoin (native segwit</td>
                        <td>XBT/BTC</td>
                        <td>bc1q9qlp7mr74d59aw8aznzfwphaw8gquee6p7mstt</td>

                    </tr>

                    <tr>

                        <td>Bitcoin (segwit</td>
                        <td>XBT/BTC</td>
                        <td>32qeAqvypzo6qVNgdUF1dRtPFoTf88F3D3</td>

                    </tr>

                    <tr>

                        <td>Monero</td>
                        <td>XMR</td>
                        <td>Not yet working</td>
                        <!-- <td>41vNaZfJV8Lgpr4N1dNV7fL2FxSaPyenk7dtJZ4EjPkm5rqPyEpjYQV4Zu4L73w31Ndfm24F6ii2WCoortSF</td> -->

                    </tr>

                    <tr>

                        <td>Etherium</td>
                        <td>ETH</td>
                        <td>0xe4Ff56c3c77348793E751618ABf8Cf979aDCa7EB</td>

                    </tr>

                    <tr>

                        <td>Litecoin</td>
                        <td>LTC</td>
                        <td>MP5H9STQ8KTbvG28U8KpqMQm8CzFZM9xCS</td>

                    </tr>

                </table>

            </body>
        
        </html>`
        return;
    }
}