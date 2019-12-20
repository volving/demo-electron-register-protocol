const { app, BrowserWindow, ipcMain, protocol } = require('electron');
const path = require('path');
const cp = require('child_process');

let mainWindow;
let randomWordWindow;
const winURL =
    process.env.NODE_ENV === 'development'
        ? `http://localhost:9080`
        : `file://${__dirname}/index.html`;

function createWindow() {
    mainWindow = new BrowserWindow({
        height: 900,
        useContentSize: true,
        width: 1300,
        webPreferences: {
            webSecurity: false,
            nodeIntegration: true,
            devTools: true
        }
    });

    mainWindow.loadURL(winURL);

    protocol.registerFileProtocol(
        'movtile',
        function(request, callback) {
            console.log('request: ', request);
            var url = request.url.substr(10);
            // const fn = 'D:\\apps\\PotPlayer\\PotPlayerMini.exe';
            const fn = '/usr/local/ffmpeg/4.2.1/bin/ffplay';
            cp.spawn(fn, [url]);
        },
        function(error) {
            if (error) console.error('Failed to register protocol');
        }
    );

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
