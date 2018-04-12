chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({
    numberPopup: 5
  });
});

$(document).ready(function(){
  var socket = io.connect('https://anime.miyata.moe');
  /*socket.on('connect', function(data) {
      socket.emit('join', 'Hello World from client');
  });*/
  socket.on('messages', function(data) {
      // alert(data.title)
      var opt = {
          type: "image",
          title: data.title.split(' - Episode ')[0],
          message: "Episode ".concat(data.title.split(' - Episode ')[1]).concat(" released on Crunchyroll!"),
          iconUrl: "logo.png",
          imageUrl: data.image.url
      }
      console.log(data.image.url)
      chrome.notifications.create(opt);
  });
  socket.on('recentfeed', function(data) {
      var y = []
      for (var x=0; x<3; x++) {
        var anime = {}
        anime.title = data[x].title.split(' - Episode ')[0]
        anime.message = "Episode ".concat(data[x].title.split(' - Episode ')[1])
        y.push(anime)
      }
      var recent = {
          type: "list",
          title: "Crunchyroll Notifier",
          message: "Recently released on Crunchyroll!",
          iconUrl: "logo.png",
          items: y
      }
      chrome.notifications.create(recent);
  });
});
