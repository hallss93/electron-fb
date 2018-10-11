'use strict';
const FB = require('fb');
module.exports = function (client_id, scopes, width, height, mainWindow) {
    return new Promise((resolve, reject) => {
        const { BrowserWindow } = require('electron').remote
        let options = {
            client_id: client_id,
            scopes: scopes,
            redirect_uri: 'https://www.facebook.com/connect/login_success.html'
        };

        let authWindow = new BrowserWindow({ width: width, height: height, show: false, parent: mainWindow, modal: true, webPreferences: { nodeIntegration: false } });
        let facebookAuthURL = `https://www.facebook.com/login/device-based/regular/login/?login_attempt=1&lwv=111`
        authWindow.once('ready-to-show', () => {
            authWindow.show()
        })

        authWindow.loadURL(facebookAuthURL);
        authWindow.show();
        authWindow.webContents.on('did-navigate', function (event, newUrl, code, text) {
            if (newUrl == "https://www.facebook.com/") {
                authWindow.loadURL(`https://www.facebook.com/v3.1/dialog/oauth?
                          client_id=${options.client_id}
                          &display=popup
                          &response_type=token
                          &redirect_uri=${options.redirect_uri}`)
                authWindow.loadURL(`https://www.facebook.com/v2.8/dialog/oauth?client_id=${options.client_id}&redirect_uri=${options.redirect_uri}&response_type=token,granted_scopes&scope=${options.scopes}&display=popup`)
            } else {
                let raw_code = /access_token=([^&]*)/.exec(newUrl) || null;
                let access_token = (raw_code && raw_code.length > 1) ? raw_code[1] : null;
                let error = /\?error=(.+)$/.exec(newUrl);

                if (error) reject(error)

                if (access_token) {
                    FB.setAccessToken(access_token);
                    FB.api('/me', { fields: ['id', 'name', 'picture.width(800).height(800)'] }, function (resMe) {
                        resolve(resMe)
                        authWindow.close();
                    });
                }
            }
        });
    })
}
