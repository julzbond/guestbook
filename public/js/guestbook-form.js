var form = document.createElement('form');
form.method = "POST";
form.action = "http://localhost:3000/guestbook";

new InputField('name');
new InputField('date');
new InputField('post');

function InputField(name){
  var input = document.createElement('input');
      input.name = name;
  form.appendChild(input);
}

var submit = document.createElement('button');

submit.innerHTML = "Submit";
submit.type = "submit";
document.body.appendChild(form);
form.appendChild(submit);