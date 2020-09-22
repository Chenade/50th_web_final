

window.onbeforeunload = function(){return false;};
$(document).ready(function(){
	window.addEventListener('keyup',keypress_event, false);
});

var current_playing = '';

var url_update = new URL(window.location.href);
var search = url_update.searchParams.get('album');
console.log(search);
function keypress_event(e){
	if(e.code == 'Space'){
		$("#play_pause").click();
	}

	var cur = $("#keyword").val();
	if( cur.includes("title:")){
		if( cur.length > 8){
			$("#searchbtn").click();
		}
	}else if( cur.includes("artist:")){
		if( cur.length > 9){
			$("#searchbtn").click();
		}
	}else if( cur.includes("composer:")){
		if( cur.length > 11){
			$("#searchbtn").click();
		}
	}else if( cur.includes("album:")){
		if( cur.length > 8){
			$("#searchbtn").click();
		}
	}
}

var data = {};

$("#searchbtn").on("click",function(){
	localStorage.clear();

	data = {}, valid = false;

	var condition = $("#keyword").val();

	if($("#advance").prop('checked')){
		var advanced = condition.split(" ");
		for ( var i in advanced){
			if(advanced[i].includes("title")){
				data['title'] = (advanced[i].includes('"')) ? advanced[i].split('"')[1] : advanced[i].split(':')[1];
				valid = true;
			}
			else if(advanced[i].includes("artist")){
				data['artist'] = (advanced[i].includes('"')) ? advanced[i].split('"')[1] : advanced[i].split(':')[1];
				valid = true;
			}
			else if(advanced[i].includes("composer")){
				data['composer'] = (advanced[i].includes('"')) ? advanced[i].split('"')[1] : advanced[i].split(':')[1];
				valid = true;
			}
			else if(advanced[i].includes("album")){
				data['album'] = (advanced[i].includes('"')) ? advanced[i].split('"')[1] : advanced[i].split(':')[1];
				valid = true;
			}
		}
		console.log(JSON.stringify(data));
	}else{
		if(condition.includes("title")){
			data['title'] = (condition.includes('"')) ? condition.split('"')[1] : condition.split(':')[1];
			valid = true;
		}
		else if(condition.includes("artist")){
			data['artist'] = (condition.includes('"')) ? condition.split('"')[1] : condition.split(':')[1];
			valid = true;
		}
		else if(condition.includes("composer")){
			data['composer'] = (condition.includes('"')) ? condition.split('"')[1] : condition.split(':')[1];
			valid = true;
		}
		else if(condition.includes("album")){
			data['album'] = (condition.includes('"')) ? condition.split('"')[1] : condition.split(':')[1];
			valid = true;
		}
	}

	// if(valid){
	//
	// 	$.ajax({
	// 	  type: 'GET',
	// 	  url: 'http://127.0.0.1:8000/api/albums/',
	// 	  data: data,
	// 	  success: function(msg) {
	// 		console.log('Data Saved: ' + JSON.stringify(msg.data));
	// 	  },
	// 	  error: function(s){
	// 		console.log(JSON.stringify(s));
	// 	  }
	// 	});
	// }
});


//===================== audio =======================//
var audio = document.getElementById('audio');

var old_playlist = JSON.parse(localStorage.getItem('playlist'));
var playlist = (old_playlist != null) ? old_playlist :	 [
	['title1','host1','name1','http://127.0.0.1/second/resources/img/6.png', './snow-fight.mp3'],
	['title2','host2','name2','http://127.0.0.1/second/resources/img/6.png', './snow-fight.mp3'],
	['title3','host3','name3','http://127.0.0.1/second/resources/img/6.png', './snow-fight.mp3'],
	['title4','host4','name3','http://127.0.0.1/second/resources/img/6.png', './snow-fight.mp3'],
	['title5','host5','name3','http://127.0.0.1/second/resources/img/6.png', './snow-fight.mp3'],
	['title6','host6','name3','http://127.0.0.1/second/resources/img/6.png', './snow-fight.mp3'],
];


var index = 0;
refresh(index);
plyrlist();

$("#play_pause").on('click',function () {
	if($(this).html() == 'play'){
		audio.play();
		$(this).html('pause');
		refresh(index);
	}else{
		audio.pause();
		$(this).html('play');
	}
});
$("#previous").on('click',function () {
	index -= 1;
	if(index<0) index = playlist.length-1;
	audio.pause();
	$("#play_pause").html('play');
	$.ajax({
		type:"GET",
		url: playlist[index][4],
		data: '',
		success:function () {
			$("#audio").attr('src',playlist[index][4]);
		},
		error:function () {
			alert("影片下載失敗");
			$("#previous").click();
		}
	});

	refresh(index);
});
$("#next").on('click',function () {
	index += 1;
	if(index >= playlist.length) index = 0;
	audio.pause();
	$("#play_pause").html('play');
	$.ajax({
		type:"GET",
		url: playlist[index][4],
		data: '',
		success:function () {	$("#audio").attr('src',playlist[index][4]);},
		error:function () {
			alert("影片下載失敗");
			$("#next").click();
		}
	});

	refresh(index);
});
$("#mute").on('click',function () {
	audio.volume = 0;
});
$('#vol').on('change',function () {
	console.log($(this).val());
	audio.volume = $(this).val();
});

$("#audio").on('play',function () {
	var min = parseInt($("#audio")[0].duration / 60);
	var sec = parseInt($("#audio")[0].duration % 60);
	$("#total_time").html(((min<10) ? "0"+min : min) + ":" + ((sec<10) ? "0"+sec : sec) );

	$("#timeline").attr('max', $("#audio")[0].duration);
});
$("#audio").on('timeupdate',function () {
	var min = parseInt($(this)[0].currentTime / 60);
	var sec = parseInt($(this)[0].currentTime % 60);

	$("#current_time").html(((min<10) ? "0"+min : min) + ":" + ((sec<10) ? "0"+sec : sec) );
	$("#timeline").val($(this)[0].currentTime);
});

$("#audio").on('ended',function () {
	$("#play_pause").click();
	$("#next").click();
});

$("#timeline").on('mousedown', function () {
	$("#audio")[0].pause();
});
$("#timeline").on('change', function () {
	$("#audio")[0].currentTime = $(this).val();
	$("#audio")[0].play();
	$("#play_pause").html("pause");
});

navigator.mediaSession.setActionHandler('play', function() {
	audio.play();
	$("#play_pause").html('pause');
	refresh();
});
navigator.mediaSession.setActionHandler('pause', function() {
	audio.pause();
	$("#play_pause").html('play');
});
navigator.mediaSession.setActionHandler('previoustrack', function() {
	index -= 1;
	if(index < 0) index = playlist.length-1;
	refresh(index);
});
navigator.mediaSession.setActionHandler('nexttrack', function() {
	index += 1;
	if(index >= playlist.length) index = 0;
	refresh(index);
});


function refresh(current) {

	navigator.mediaSession.metadata = new MediaMetadata({
		title: playlist[current][0],
		artist: playlist[current][1],
		album: playlist[current][2],
		artwork: [{ src: playlist[current][3], sizes: '512x512'},]
	});
	$("#title").html(playlist[current][0]);
	$("#player").html(playlist[current][1]);
	$("#name").html(playlist[current][2]);

	data = [['album',playlist[current][0]], ['song', playlist[current][2]]];
	var search = new URLSearchParams(data);
	var url_update = new URL(window.location.href);
	url_update.search = search;
	history.pushState('','',url_update.href);

	$('.selected').removeClass();
	$("#"+playlist[current][0]).addClass('selected');

	if(current == 0) $("#previous").attr('disabled',true);
	else $("#previous").attr('disabled',false);

	if(current == playlist.length -1) $("#next").attr('disabled',true);
	else $("#next").attr('disabled',false);
}

function plyrlist(){
	$("#plyr_list").empty();
	$("#plyr_list").append('<H1>播放清單 <button id="hide">HIDE</button></H1>');
	for(var i in playlist){
		var add = '<div id="' + playlist[i][0] + '" style="display: flex; flex-direction: row; justify-content: space-around; margin-bottom: 5px;">' +
			'<div>'+ (parseInt(i) + 1) +'</div>' +
			'<div>'+ playlist[i][0] +'</div>' +
			'<div>'+ playlist[i][1] +'</div>' +
			'<div>'+ playlist[i][2] +'</div>' +
			'<div>'+ playlist[i][2] +'</div>' +
			'<div><button class="delete" value="'+ playlist[i][0] +'">刪除</button></div>' +
			'</div>';
		$("#plyr_list").append(add);
	}

	$(".delete").on('click',function(){

		if($("#"+$(this).val()).hasClass('selected')){
			alert('playing');
		}else{
			var tmp = playlist;
			playlist = [];
			for(var i in tmp){
				if(tmp[i][0] != $(this).val()){
					playlist.push([tmp[i][0],tmp[i][1],tmp[i][2],tmp[i][3]])
				}
			}
			localStorage.setItem('playlist', JSON.stringify(playlist));
			plyrlist();
		}


	});

	$("#hide").on('click',function () {
		$("#plyr_list").empty();
		$("#plyr_list").append('<H1>播放清單 <button id="show">SHOW</button></H1>');

		$("#show").on('click',function () {	plyrlist();	});
	});

}
