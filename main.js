const { app, BrowserWindow, Menu } = require('electron')
const deletePosts = require('facebook-janitor').default
const shell = require('electron').shell

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 700,
    title: "Facebook Janitor",
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.loadFile('src/main.html')

  // Open the DevTools.
 // win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })

  var menu = Menu.buildFromTemplate([
      {
          label: 'Menu',
          submenu: [
            {label: 'User Guide'},
            {type: 'separator'},
            {
              label: 'Exit',
              click() {
                app.quit()
              }
            }

          ]
        },
        {
          label: "Edit",
          submenu: [
              { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
              { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
              { type: "separator" },
              { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
              { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
              { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
              { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
          ]},
        {
          label: 'Github',
          submenu:[
            {label: 'Github page',
            click(){
              shell.openExternal('https://github.com/MohamedBarhdadi/Facebook-Janitor')
            }
          }

          ]
        }


    ])

    Menu.setApplicationMenu(menu);

}



// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

//renderer
const ipc = require('electron').ipcMain;

ipc.on('synMessage', async (event, args) => {
  const { email, password, deletePreferences } = args;

  const filters = deletePreferences.filter(preference => Boolean(preference));

  console.log({ email, filters });

  try {
    event.returnValue = 'Clean-up initiated!';
    await deletePosts({ email, password, filters });

    // TODO: Inform user that the cleanup has succeeded
  } catch(error) {
    // TODO: Inform user that an error has occured
  }
});
