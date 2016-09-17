$(document).ready(function() {
  var streamers = ['freecodecamp', 'syndicate', 'riotgames', 'esl csgo', 'Nightblue3', 'summit1g', 'LIRIK', 'PhantomL0rd', 'imaqtpie', 'captainsparklez', 'sodapoppin', 'goldglove', 'tsm bjergsen', 'Joshdog', 'Tsm dyrus', 'mushisgoshu', 'trick2g', 'comster404', 'brunofin'];
  var status, url, picture, x = 0;

  function updateHTML(section) {
    $(section).append('<div class="row streamer"><div class="proflogo" id="user-image-' + x + '"></div><span class="status">' + status + '</span></div></div>');
    if (section == ".online" || section == ".offline") {
      $("#user-image-" + x).css({
        background: picture,
        'background-size': '55px'
      });
    }
    x++;
  }

  function showOnline() { //Show only online users
    $(".offline-users, .all-users").removeClass('focus');
    $(".online-users").addClass('focus');
    $(".offline, .unavailable").addClass('hidden');
    $(".online").removeClass('hidden');
  }

  function showOffline() { //Show only offline users
    $(".online-users, .all-users").removeClass('focus');
    $(".offline-users").addClass('focus');
    $(".offline, .unavailable").removeClass('hidden');
    $(".online").addClass('hidden');
  }

  function showAll() { //Show all users
    $(".offline-users, .online-users").removeClass('focus');
    $(".all-users").addClass('focus');
    $(".online, .offline, .unavailable").removeClass('hidden');
  }



  //fetch the data for each streamer using ajax requests
  for (var i = 0; i < streamers.length; i++) {
    ajax();
  }

  function ajax() {
    $.ajax({
      url: "https://api.twitch.tv/kraken/streams/" + streamers[i] + "?callback=?",
      dataType: "jsonp",
      data: {
        format: "json"
      },

      success: function(data) {
        fetchData(data);
      },

      error: function() {
        console.log("unable to access json");
      }
    })
  }

  function fetchData(data) {
    if (data.stream === null) {
      url = data._links.channel.substr(38);
      updateOfflineUsers();
    } else if (data.status == 422 || data.status == 404) {
      status = data.message;
      updateHTML(".unavailable");
    } else {
      if (data.stream.channel.logo !== null) {
        picture = 'url("' + data.stream.channel.logo + '")';
      } else {
        picture = 'url("http://seeklogo.com/images/T/twitch-logo-4931D91F85-seeklogo.com.png")';
      }
      url = data._links.channel.substr(38);
      status = "<a href='https://twitch.tv/" + url + "' target='_blank'" + "'>" + data.stream.channel.display_name + "</a>" + " is currently streaming " + data.stream.game;
      updateHTML(".online");
    }
  }

  //another API call for more info on the offline users
  function updateOfflineUsers() {
    $.ajax({
      url: "https://api.twitch.tv/kraken/channels/" + url,
      dataType: "jsonp",
      data: {
        format: "json"
      },
      success: function(json) {
        status = "'<a href='" + json.url + "' target='_blank'" + "'>" + json.display_name + "</a>'" + " is currently offline";
        if (json.logo !== null) {
          picture = 'url("' + json.logo + '")';
        } else {
          picture = 'url("http://seeklogo.com/images/T/twitch-logo-4931D91F85-seeklogo.com.png")';
        }
        updateHTML(".offline");
      }
    });
  }

  $('#all button').on('click', function() {
    showAll();
  });

  $('#online button').on('click', function() {
    showOnline();
  });

  $('#offline button').on('click', function() {
    showOffline();
  });
    
    $('[data-toggle="tooltip"]').tooltip();
})

 $('.btn').click(function() {
        $('.btn').css('background', '#17141F')
        $(this).css('background-color', '#4f3d66');
    })

