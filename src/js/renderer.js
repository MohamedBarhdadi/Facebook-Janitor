const ipc = require('electron').ipcRenderer;

window.onload = function() {
  const formMain = document.querySelector('.ui.form');

  let replyDiv = document.querySelector('#reply');

  formMain.addEventListener('submit', event => {
    event.preventDefault();

    // form is valid (both email and name)
    if ($('.ui.form').form('is valid')) {
      let $form = $('.ui.form');
      let allFields = $form.form('get values');

      let reply = ipc.sendSync('synMessage', allFields);
      console.log(reply);

      //hide form after pressing a button
      document.getElementById('form').style.display = 'none';

      //show animation and message
      replyDiv.innerHTML = reply;
      document.getElementById('animation').style.display = 'block';
    }
  });

  // Catch message that clean-up is finished

  ipc.on('successReply', function(event, msg) {
    console.log(msg);
    replyDiv.innerHTML = msg;
  });
};
