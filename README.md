# electron-facebook

> Módulo para login com Facebook e Electron.

## Como iniciar

_Start:_

1. Instale a dependência com `npm i --save electron-fb`
2. Importe a biblioteca:
````
const { ipcRenderer, remote } = require('electron')
const { BrowserWindow } = remote
import ef from 'electron-fb';
ef('CLIENT_ID,'public_profile', 800, 400, BrowserWindow.getAllWindows().filter((e)=>e.id==1))
.then(console.log)
        ```
## Tecnologias inseridas no projeto

_Dependências ou futuras possibilidades_

- [FB 2.0.0](https://github.com/node-facebook/facebook-node-sdk)