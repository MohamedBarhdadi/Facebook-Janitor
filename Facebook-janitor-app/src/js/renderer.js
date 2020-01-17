const
    ipc      = require('electron').ipcRenderer,

    syncBtn  = document.querySelector('#submit-btn');

let replyDiv = document.querySelector('#reply');

syncBtn.addEventListener('click', () => {
    let $form = $(('.ui.form'));
    let allFields = $form.form('get values');
    var email = $form.form('get value', 'email');
    var password = $form.form('get value', 'password');
    var deletePreferences = $form.form('get value', 'deletePreferences');


    let reply = ipc.sendSync('synMessage', 'allFields', 'email', 'password', 'deletePreferences');

    replyDiv.innerHTML = reply;
});



