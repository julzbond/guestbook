window.onload = function () {
  createForm();

  var guestbookSection = document.createElement('section');
  document.body.appendChild(guestbookSection);

  var guestbookOrder = document.createElement('ol');
  guestbookOrder.id = "Guestbook";
  guestbookSection.appendChild(guestbookOrder);

  var oReq = new XMLHttpRequest();
  oReq.onload = function(){
    var guestbook = JSON.parse(this.responseText);
    guestbook.forEach(loadEntries);
  };
  oReq.open("get", "/guestbook", true);
  oReq.send();
}

function createForm(){
  var form = document.createElement('form');
  // form.method = "POST";
  // form.action = "http://localhost:3000/guestbook";

  new InputField('name');
  new InputField('date');
  new InputField('post');

  function InputField(name){
    var input = document.createElement('input');
        input.name = name;
        input.id = name;
    form.appendChild(input);
  }

  var submit = document.createElement('button');
  submit.innerHTML = "Submit";
  submit.type = "submit";
  form.onsubmit = function(event){
    event.preventDefault();
    var msg = {
      name: document.getElementById('name').value,
      date: document.getElementById('date').value,
      post: document.getElementById('post').value
    };
    var req = new XMLHttpRequest();
    req.onload = function (){
      var message = JSON.parse(this.responseText);
      loadEntries(message);
    }
    req.open("post", "/guestbook", true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.responseType = 'text';
    req.send(JSON.stringify(msg));
  }
  document.body.appendChild(form);
  form.appendChild(submit);
};

function loadEntries(message){
  var guestbook = document.getElementById("Guestbook");
  var msg = document.createElement('li');
  guestbook.appendChild(msg);

  var msgPost = document.createElement('p');
  var msgText = document.createTextNode(message.post);
  msgPost.appendChild(msgText);
  msg.appendChild(msgPost);

  var msgName = document.createElement('p');
  var msgNameText = document.createTextNode(message.name);
  msgName.appendChild(msgNameText);
  msg.appendChild(msgName);

  var msgDate = document.createElement('date');
  var msgDateText = document.createTextNode(message.date);
  msgDate.appendChild(msgDateText);
  msg.appendChild(msgDate);
};