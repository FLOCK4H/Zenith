const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    updateDevNerd: (data) => ipcRenderer.send('update-devnerd', data),
    readDevNerd: () => ipcRenderer.send('read-devnerd'),
    onDevNerdData: (callback) => ipcRenderer.on('devnerd-data', callback),
    removeDevNerdDataListener: (callback) => ipcRenderer.removeListener('devnerd-data', callback),
    executePythonScript: (content) => ipcRenderer.send('execute-python-script', content),
    closeWindow: () => ipcRenderer.send('close-window'),
    minimizeWindow: () => ipcRenderer.send('minimize-window'),
    maximizeWindow: () => ipcRenderer.send('maximize-window'),
    resizeWindow: () => ipcRenderer.send('resize-window')
});