

var map =
    '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0\n' +
    '0,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,0\n' +
    '0,1,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0,1,0\n' +
    '0,1,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0,1,0\n' +
    '0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0\n' +
    '0,1,0,0,1,0,1,0,0,0,0,0,1,0,1,0,0,1,0\n' +
    '0,1,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,1,0\n' +
    '0,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0,0,0\n' +
    '2,2,2,0,1,0,1,1,1,1,1,1,1,0,1,0,2,2,2\n' +
    '0,0,0,0,1,0,1,0,0,3,0,0,1,0,1,0,0,0,0\n' +
    '2,2,2,2,1,1,1,0,3,3,3,0,1,1,1,2,2,2,2\n' +
    '0,0,0,0,1,0,1,0,0,0,0,0,1,0,1,0,0,0,0\n' +
    '2,2,2,0,1,0,1,1,1,2,1,1,1,0,1,0,2,2,2\n' +
    '0,0,0,0,1,0,1,0,0,0,0,0,1,0,1,0,0,0,0\n' +
    '0,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,0\n' +
    '0,1,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0,1,0\n' +
    '0,1,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,0\n' +
    '0,0,1,0,1,0,1,0,0,0,0,0,1,0,1,0,1,0,0\n' +
    '0,1,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,1,0\n' +
    '0,1,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,1,0\n' +
    '0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0\n' +
    '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0\n',
    col = 0, row = 0;

var map_tmp = map.trim('\n').split('\n');
    map_array = [];



//======================== map end =====================================//

var timer, pac_eating, pac_moving, ghost_moving;
var tutorial = false;
var level = 'normal';
var star = (level == "normal")? 10 : 6 ;
var ghost = (level == "normal")? 1 : 3 ;
var direction = 0, score = 0, time = 60, life = 3,
    pac_x = 9, pac_y=12,
    ghost_ = [[9,8],[7,8],[10,8]], ghost_direction = 2;

$(".font").on('click',function ()  {
    switch ($(this).val()) {
        case "add":
            var font_h1 = parseInt($("H1").css('font-size')) +2;
            $("H1").css('font-size',font_h1 + "px" );
            var font_button = parseInt($(".index").css('font-size')) +2;
            $(".index").css('font-size',font_button + "px" );
            var font_input = parseInt($(".input").css('font-size')) +2;
            $(".input").css('font-size',font_input + "px" );
            break;
        case "minus":
            var font_h1 = parseInt($("H1").css('font-size')) - 2;
            $("H1").css('font-size',font_h1 + "px" );
            var font_button = parseInt($(".index").css('font-size')) -2;
            $(".index").css('font-size',font_button + "px" );
            var font_input = parseInt($(".input").css('font-size')) +2;
            $(".input").css('font-size',font_input + "px" );
            break;
    }
});
$(".screen_index").on('click',function () {
    switch ($(this).val()) {
    case 'ArrowUp':
    case 'w':
        direction = 270;
        break;
    case 'ArrowDown':
    case 's':
        direction = 90;
        break;
    case 'ArrowLeft':
    case 'a':
        direction = 180;
        break;
    case 'ArrowRight':
    case 'd':
        direction = 0;
        break;
    default:
        return;
    }
    move(direction);
});
$(".index").on('click',function () {
    console.log($(this).val());

    switch ($(this).val()) {

        case "easy":
        case "normal":
        case "hard":
            $('.select').removeClass("select");
            $(this).addClass('select');
            level = $(this).val();
            star = (level == "normal")? 10 : 6 ;
            ghost = (level == "normal")? 1 : 3 ;
            break;

        case "tutorial":
            $(this).addClass('select');
            $("#tut_word").css('display','inline');
            $("#tut_close").css('display','inline');
            setTimeout(function () {
                tutorial = true;
                start_game();
            },500);
            break;
        case "start":
            $(this).addClass('select');
            tutorial = false;
            $("#tut_word").css('display','none');
            $("#tut_close").css('display','none');
            setTimeout(function () {
                start_game();
            },500);
            break;
        case "index":
            $("#index_page").css('display','inline');
            $("#play_page").css('display','none');
            $("#tut_word").css('display','none');
            $("#tut_close").css('display','none');
            break;

    }
});
$("#play_pause").on('click',function () {
    if($(this).attr('src') == "./source/pause.png"){
        $(this).attr('src',"./source/play.png");
        window.removeEventListener('keydown',keyevent,false);
        clearInterval(timer);
        clearInterval(pac_eating);
        clearInterval(ghost_moving);
        clearInterval(pac_moving);
    }else{
        $(this).attr('src',"./source/pause.png");
        window.addEventListener('keydown',keyevent,false);
        if(!tutorial){
            timer = setInterval(function () {
                time -= 1;
                if (time < 1) {
                    end_game();
                }
                $("#info_time").text(time_display(time));
            }, 1000);
        }

        pac_eating = setInterval(function () {
            if($("#pac_man").attr('src') == "./source/Asset%207.png")
                $("#pac_man").attr('src',"./source/Asset%208.png");
            else
                $("#pac_man").attr('src',"./source/Asset%207.png");
        },500);

        ghost_moving = setInterval(function () {
            ghost_direction = Math.floor(Math.random()*20) % 4;
        },3000);

        pac_moving = setInterval(function () {
            move(direction);
        },500);


    }
});

function keyevent(e) {
    switch (e.key) {
        case 'ArrowUp':
        case 'w':
            direction = 270;
            break;
        case 'ArrowDown':
        case 's':
            direction = 90;
            break;
        case 'ArrowLeft':
        case 'a':
            direction = 180;
            break;
        case 'ArrowRight':
        case 'd':
            direction = 0;
            break;
        default:
            return;
    }
    move(direction);
}
function map_initalize() {

    $("#map").empty();

    var draw = '<div class="map_col">';

    for(var i in map_array){
        draw += '<div class="map_row">';
        for(var j in map_array[i]){
            var isDraw = true;

            if(i == pac_y && j == pac_x){
                draw += '<img class="map_icon" id="pac_man" style="transform: rotate('+ direction+'deg)" src="./source/Asset%207.png" />';
                isDraw = false;
            }

            for(var k=0; k < ghost; k++){
                if(isDraw && ghost_[k][0] == j && ghost_[k][1] == i){
                    switch (k) {
                        case 0:
                            draw += '<img class="map_icon" src="./source/Asset%203.png" />'; break;
                        case 1:
                            draw += '<img class="map_icon" src="./source/Asset%205.png" />'; break;
                        case 2:
                            draw += '<img class="map_icon" src="./source/Asset%201.png" />'; break;
                    }
                    isDraw = false;
                }
            }

            if(isDraw){
                switch (map_array[i][j]) {
                    case "0":
                        draw += '<img class="map_icon" src="./source/wall.png" />';
                        break;
                    case "1":
                        draw += '<img class="map_icon" src="./source/dot.png" />';
                        break;
                    case "2":
                        draw += '<img class="map_icon" src="./source/blank.png" />';
                        break;
                    case "3":
                        draw += '<img class="map_icon" src="./source/Asset%201.png" />';
                        break;
                    case "5":
                        draw += '<img class="map_icon" src="./source/Asset%2011.png" />';
                        break;
                }
            }


        }
        draw += '</div>';
    }

    for(var k=0; k < ghost; k++){
        if(ghost_[k][0] == pac_x && ghost_[k][1] == pac_y){
            life -= 1;
            life_draw(life);
        }
    }

    draw += '</div>';
    $("#map").append(draw);
    $("#info_score").text(score);

}
function time_display(time) {
    if(time < 60 && time > 9)
        return "00:" + time;
    else if(time < 10)
        return "00:0" + time;
    else
        return "01:00"
}
function end_game() {

    if($("#play_pause").attr('src') == "./source/pause.png")
        $("#play_pause").click();

    window.removeEventListener('keydown',keyevent,false);

    $("#result").css('display','inline');
    $("#result").css('left', $("#map").offset().left + 100);
    $("#result").css('top', $("#map").offset().top);

}
function start_game() {

    if(navigator.userAgent.includes('Mobile')){
        $("#screen_control").css('display','inline');
    }else{
        $("#screen_control").css('display','none');
    }

    $("#index_page").css('display','none');
    $("#play_page").css('display','inline');

    var star_tmp = star;
    map_array =[];
    for(var i in map_tmp){
        var cur = map_tmp[i].split(",");
        col = cur.length;
        var cur_array = [];
        for(var j in cur){
            var rnd = 0;
            if(cur[j] != 0)
                if(star_tmp > 0) rnd = Math.floor(Math.random()*10);

            if(rnd == 3) {
                cur_array.push("5");
                star_tmp -=1;
            }
            else cur_array.push(cur[j]);

        }
        map_array.push(cur_array);
    }
    row = map_tmp.length;

    time = 20;
    life = 3;
    life_draw(life);
    direction = 0;
    pac_x = 9;
    pac_y=12;

    $(".select").removeClass('select');
    $("#result").css('display','none');
    $("#info_time").text(time_display(time));
    $("#info_player").text($('#player_name').val());
    $("#info_level").text(level);
    map_initalize();

    if(tutorial){

        $('#tut_word').css('left',$("#map").offset().left + 280);
        $('#tut_word').css('top',$("#map").offset().top);

        $('#tut_word').append('<H1>分數顯示區</H1>');
        $('#score').addClass('tut_box');

        setTimeout(function () {
            $('#tut_word').empty();
            $('.tut_box').removeClass('tut_box');
            $('#tut_word').append('' +
                '<H1>生命顯示區</H1>' +
                '<hr>' +
                '<H2>預設有3條命</H2>'+
                '<H2>生命用盡，則遊戲結束</H2>');
            $('#life').addClass('tut_box');
        },3000);

        setTimeout(function () {
            $('#tut_word').empty();
            $('.tut_box').removeClass('tut_box');
            $('#tut_word').append('' +
                '<H1>時間顯示區</H1>' +
                '<hr>' +
                '<H2>一次遊戲時間為60秒</H2>');
            $('#time').addClass('tut_box');
        },6000);

        setTimeout(function () {
            $('#tut_word').empty();
            $('.tut_box').removeClass('tut_box');
            $('#tut_word').append('' +
                '<H1>繼續 / 暫停 按鈕</H1>');
            $('#play_pause').addClass('tut_box');
        },9000);

        setTimeout(function () {
            $('#tut_word').empty();
            $('#tut_word').css('top',$("#map").offset().top + 50);
            $('#tut_word').css('left',$("#map").offset().left + 30);
            $('.tut_box').removeClass('tut_box');
            $('#tut_word').append('' +
                '<H1>地圖區域</H1>' +
                '<hr>' +
                '<div style="display: flex; flex-direction: row;"><img src="source/dot.png" class="icon"/><h2>豆子：一顆十分</h2></div>' +
                '<div style="display: flex; flex-direction: row;"><img src="source/Asset%2011.png" class="icon"/><h2>星星：一顆五十分</h2></div>' +
                '<div style="display: flex; flex-direction: row;"><img src="source/Asset%201.png" class="icon"/><img src="source/Asset%203.png" class="icon"/><img src="source/Asset%205.png" class="icon"/><h2>鬼：碰到則會減少一條生命</h2></div>' +
                '<div style="display: flex; flex-direction: row;"><img src="source/Asset%207.png" class="icon"/><h2>PACMAN：使用方向鍵 (上下左右) 或 ASDW 鍵控制方向</h2></div>' +
                '<div style="display: flex; flex-direction: row;"><img src="source/blank.png" class="icon"/><h2>A：左 &emsp;W：上 &emsp;S：下 &emsp;D：右 &emsp;</h2></div>' +
                '');
            $('#map').addClass('tut_box');
        },12000);



        setTimeout(function () {

            $('#tut_word').empty();
            $('#tut_word').css('top',$("#map").offset().top + 400);
            $('#tut_word').css('left',$("#map").offset().left + 280);
            $('.tut_box').removeClass('tut_box');
            $('#tut_word').append('' +
                '<H1>玩家名稱 (歷史最高分)</H1>');
            $('#info_player').addClass('tut_box');
        },15000);

        setTimeout(function () {
            $('#tut_word').empty();
            $('.tut_box').removeClass('tut_box');
            $('#tut_word').append('' +
                '<H1>目前遊戲難度</H1>' +
                '<hr>' +
                '<div style="display: flex; flex-direction: row;"><img src="source/blank.png" class="icon"/><h2>分為</h2></div>' +
                '<H2>簡單(EASY)</H2>'+
                '<H2>中等(NORMAL))</H2>'+
                '<H2>困難(HARD)</H2>');
            $('#info_level').addClass('tut_box');
        },18000);

        setTimeout(function () {
            $('#tut_word').empty();
            $('.tut_box').removeClass('tut_box');
            $('#tut_word').append('' +
                '<H1>調整頁面所有字體大小</H1>');
            $('#tut_word').append('<button class="index" value="start">結束TUTORIAL</button>');
            $('#font_control').addClass('tut_box');
        },21000);

        setTimeout(function () {
            $('#tut_word').empty();
            $('.tut_box').removeClass('tut_box');
            $('#tut_word').append('' +
                '<H1>新手任務</H1>' +
                '<hr>' +
                '<h2>吃到一顆星星</h2>' +
                '<h2>任務完成，則遊戲結束</h2>');
        },24000);

        setTimeout(function () {
            if(tutorial){
                $('#tut_word').empty();
                $('#tut_word').css('display','none');
                $('.tut_box').removeClass('tut_box');
                $("#play_pause").click();
            }
        },26000);

    }else{
        $("#play_pause").click();
    }


}
function move(dir) {

    for(var k=0; k < ghost; k++){
        switch (ghost_direction + k % 4) {
            case 2:
                if(map_array[ghost_[k][1] -1][ghost_[k][0]] != 0)   ghost_[k][1] -= 1;
                break;
            case 3:
                if(map_array[ghost_[k][1] +1][ghost_[k][0]] != 0)   ghost_[k][1] += 1;
                break;
            case 0:
                if(map_array[ghost_[k][1]][ghost_[k][0]-1] != 0)   {
                    if(ghost_[k][0]-1 > -1) ghost_[k][0] -= 1;
                    else ghost_[k][0] = col;
                }
                break;
            case 1:
                if(map_array[ghost_[k][1]][ghost_[k][0]+1] != 0) {
                    if(ghost_[k][0]+1 <col -1) ghost_[k][0] += 1;
                    else ghost_[k][0] = 0;
                }
                break;
        }
    }

    switch (dir) {
        case 270:
            if(map_array[pac_y -1][pac_x] == 1) score += 10;
            if(map_array[pac_y -1][pac_x] == 5) {
                score += 50;
                if(tutorial == true)    tutorial_end();
            }
            if(map_array[pac_y -1][pac_x] != 0){
                pac_y -= 1;
                map_array[pac_y][pac_x] = "2";
            }
            break;
        case 90:
            if(map_array[pac_y +1][pac_x] == 1) score += 10;
            if(map_array[pac_y +1][pac_x] == 5) {
                if(tutorial == true)    tutorial_end();
                score += 50;
            }
            if(map_array[pac_y +1][pac_x] != 0){
                pac_y += 1;
                map_array[pac_y][pac_x] = "2";
            }
            break;
        case 180:
            if(map_array[pac_y][pac_x-1] == 1) score += 10;
            if(map_array[pac_y][pac_x-1] == 5) {
                if(tutorial == true)    tutorial_end();
                score += 50;
            }
            if(map_array[pac_y][pac_x-1] != 0){
                if(pac_x-1 > -1) {
                    pac_x -= 1;
                    map_array[pac_y][pac_x] = "2";
                }
                else pac_x = col;
            }
            break;
        case 0:
            if(map_array[pac_y][pac_x+1] == 1 ) score += 10;
            if(map_array[pac_y][pac_x+1] == 5 ) {
                if(tutorial == true)    tutorial_end();
                score += 50;
            }
            if(map_array[pac_y][pac_x+1] != 0 ){
                if(pac_x+1 < col) {
                    pac_x += 1;
                    map_array[pac_y][pac_x] = "2";
                }
                else pac_x = 0;
            }
            break;
        default:
            return;
    }
    map_initalize();
}
function life_draw(life) {
    $("#info_life").empty();

    if(life == 0) end_game();

    for(var i = 0; i<life; i++){
        $("#info_life").append('<img class="map_icon" src = "./source/Asset%208.png" />');
    }

}
function tutorial_end() {

    alert('GAME START');
    tutorial =false;
    $("#play_pause").click();
    window.removeEventListener('keydown',keyevent,false);
    start_game();

}