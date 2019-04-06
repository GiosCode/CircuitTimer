/**
 * Holds Electrons features.
 */
const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu} = electron;

let mainWindow;
let settingsWindow;

//Settings W/ defaults
let workTime = 25; //Work seassion duration in minutes
let shortBreak = 5; //Short break duration in minutes
let longBreak = 15; //Long break duration in minutes
let longBreakTrigger = 4; //Number of work sessions needed to trigger long break

/**
 * main
 */
app.on('ready', createMainWindow());

const mainMenuTemplate = [
    {
        label: 'File',
        submenu: [
            label: 
        ]
    }
]

//Fuctions
function createMainWindow(){
    mainWindow = new BrowserWindow({});
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname,'mainWindow.html'),
        protocol: 'file:',
        slashes: true
    }));
    mainWindow.on('closed', function(){
        app.quit();
    });
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);
}