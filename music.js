const musicInfo = [];

function addSongFromField(event) {
  event.preventDefault();

  const info = $('#musicField').eq(0).val();

  musicInfo.push(info);
  renderList();
  $('#musicField').eq(0).val('');
}

$('#addButton').click(addSongFromField);
$('#musicField').keyup(function(event) {
  if (event.which == 13) { // User presses Enter
    addSongFromField(event);
  }
});

function renderList() {
  const $list = $('.info').eq(0);

  $list.empty();

  for (const info of musicInfo) {
    const $item = $('<li class="list-group-item">').text(info);

    $list.append($item)
  }
}

$('#getPlaylistBtn').click(function (event) {
  // TODO: Display a list of music.
  // You may use anything from musicInfo.
  var searchterm = ""
 // console.log($('.info').children().text())
  for( term of $('.info').children() ) {
    //console.log(term.innerHTML );
    if (searchterm =="") {
      searchterm = term.innerText;
    } else {
      searchterm = searchterm + "+" + term.innerText;
    }
  }
  console.log(searchterm)

  const $recomm = $('.info').eq(0);
  $recomm.empty();

  $.get( "https://itunes.apple.com/search?term="+searchterm+"&media=music", function ( data ) {
      var music = JSON.parse(data);
      var trackName = music.results.map( function (obj) { return (obj.trackName)});
      for (const track of trackName) {
        const $item = $('<li class="recommend-item">').text(track);
        $recomm.append($item)
      }
    });

  //console.log($playlist);

  console.log('Testing Music Call');
});
