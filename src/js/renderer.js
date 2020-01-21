const ipc = require('electron').ipcRenderer


window.onload=function(){
const  syncBtn  = document.querySelector('#submit-btn');

let replyDiv = document.querySelector('#reply');

syncBtn.addEventListener('click', () => {

    // form is valid (both email and name)
    if( $('.ui.form').form('is valid')) {

        let $form = $(('.ui.form'));
        let allFields = $form.form('get values');

        let reply = ipc.sendSync('synMessage',allFields);
        console.log(reply);


        //hide form after pressing a button
        document.getElementById('form').style.display = 'none';

        //show animation and message
        replyDiv.innerHTML = reply;
        document.getElementById('animation').style.display = 'block';

    }


});

}
