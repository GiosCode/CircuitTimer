/**
 * Holds Electrons features.
 */
const electron = require('electron');
const url = require('url');
const path = require('path');

//Pulling items from electron
const{app, BrowserWindow, Menu} = electron;

//Enviroment type
//process.env.NODE_ENV = 'production';

//Display Windows
let mainWindow;
let settingsWindow;


//Settings with defaults
let workTime = 25; //Work seassion duration in minutes
let shortBreak = 5; //Short break duration in minutes
let longBreak = 15; //Long break duration in minutes
let longBreakTrigger = 4; //Number of work sessions needed to trigger long break

/**
 * main
 */
app.on('ready', createMainWindow);

//Main Menu Template
const mainMenuTemplate = [
    {
        label: 'Menu',
        submenu: [
            {
                label: 'Pause',
                accelerator: process.platform == 'darwin' ? 'Command+P' : 'Ctrl+P'
            },
            {
                label: 'Resume',
                accelerator: process.platform == 'darwin' ? 'Command+R' : 'Ctrl+R'
            },
            {
                label: 'Stop',
                accelerator: process.platform == 'darwin' ? 'Command+X' : 'Ctrl+X'
            },
            {type: 'separator'},
            {
                label: 'Settings',
                accelerator: process.platform == 'darwin' ? 'Command+V' : 'Ctrl+V',
                click(){
                    createSettingsWindow();
                }
            },
            {
                label: 'Quit',
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click(){
                    app.quit();
                }
            }
        ]
    }
];
const settingsMenuTemplate = [
    {
        label:'Menu',
        submenu: [
            {
                label: 'Save'
            },
            {
                label: 'Reset'
            }
        ]
    }
]

//Fuctions
function createMainWindow(){
    mainWindow = new BrowserWindow({
        width: 400, 
        height: 250, 
        title:'Timer'
    });
    //Load mainWindow.html
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname,'mainWindow.html'),
        protocol: 'file:',
        slashes: true
    }));
    // Emitted when the window is closed.
    mainWindow.on('closed', function(){
        app.quit();
        mainWindow = null;
    });
    //Build and insert the main Menu
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);
};

function createSettingsWindow(){
    //Assigning new widnow object
    settingsWindow = new BrowserWindow({
        width: 400,
        height: 250,
        title: 'Settings',
        parent: mainWindow,
        modal: true
    });
    //Loading settings html
    settingsWindow.loadURL(url.format({
        pathname: path.join(__dirname,'settingsWindow.html'),
        protocol: 'file:',
        slashes: true
    }));
    //Garbage Collection Handling
    settingsWindow.on('close', function(){
        settingsWindow = null;
    });
    //Setting menu
    const settingsMenu = Menu.buildFromTemplate(settingsMenuTemplate);
    settingsWindow.setMenu(settingsMenu);
};

//Other

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createMainWindow();
    }
  });
//If mac add extra object to menu
if(process.platform == 'darwin'){
    mainMenuTemplate.unshift({});
}
//Add developer tools item while not in production
if(process.env.NODE_ENV !== 'production'){
    mainMenuTemplate.push({//We are pushing an object which is named by {}
        label: 'Developer Tools',
        submenu:[
            {
                label: 'Toggle dev tools',
                accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
                click(item,focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role:'reload'
            }
        ]
    })
};