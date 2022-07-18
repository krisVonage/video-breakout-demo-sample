let session = OT.initSession(apiKey, sessionId);
let camera = OT.initPublisher('publishers');

session.connect(token, function() {
  session.publish(camera);
})

session.on('streamCreated', function(event) {
  session.subscribe(event.stream, 'subscribers', { insertMode: 'append', width: '500px', height: '500px' });
})

let hangup = document.querySelector('button[name="hangup"]');
hangup.addEventListener('click', function() {
  console.log('Hangup Clicked');
  session.disconnect();
})

let send = document.querySelector('button[name="send"]');
let input = document.querySelector('input[name="chatter"]');
let userName = document.querySelector('input[name="myName"]');
let ul = document.querySelector('ul');

send.addEventListener('click', function() {
  console.log('Send Clicked');
  session.signal({ type: 'chat', data: '<i>(' + userName.value + ')</i>:  ' + input.value });
  input.value = '';
  // do something else
})

session.on('signal:chat', function(event) {
  let li = document.createElement('li');
  li.innerHTML = event.data;
  ul.appendChild(li);
})
