var map_str =   '',
    map_tmp = map_str.split('\n'),
    map = [],
    row = map_tmp.length-1, col =0,
    life = 3, direction = "R", score = 0,
    time = 12, ms = 1, star = 10, level = 'normal';

var pac_move;
var pac_x = 9, pac_y = 12, pac_direction=0;
var ghost_count = 2, ghost_direction=2, ghost = [[9,8],[9,8],[9,8]];

function initalize_map(){
    $("#map").empty();

    var isdraw = false;

    for(var i=0; i < row; i++){
        var new_row = '<div class="row">';
        for(var j=0; j<= col; j++){
            isdraw = false;
            for(var k = 0; k<ghost_count;k++){
                var tmp_y = ghost[k][1], tmp_x = ghost[k][0];
                if (i == tmp_y && j == tmp_x){
                    if(k == 0){
                        new_row += '<div><img src="./source/Asset%205.png" style="width: 30px; margin: 1px;"/></div>';
                    }else if( k == 1){
                        new_row += '<div><img src="./source/Asset%203.png" style="width: 30px; margin: 1px;"/></div>';
                    }else{
                        new_row += '<div><img src="./source/Asset%201.png" style="width: 30px; margin: 1px;"/></div>';
                    }

                    isdraw = true;
                    break;
                }
            }

            if(isdraw == false){
                if( i == pac_y && j == pac_x){
                    new_row += '<div><img id="pacman" src="./source/Asset%208.png" style="width: 30px; margin: 1px; transform: rotate('+ pac_direction +'deg)"/></div>';
                }else if( map[i][j] == "0" ){
                    new_row += '<div><img src="./source/wall.png" style="width: 30px; margin: 1px;"/></div>';
                }else if( map[i][j] == "2" ){
                    new_row += '<div><img src="./source/blank.png" style="width: 30px; margin: 1px;"/></div>';
                }else if( map[i][j] == "3" ){
                    new_row += '<div><img src="./source/Asset%201.png" style="width: 30px; margin: 1px;"/></div>';
                }else if( map[i][j] == "5" ){
                    new_row += '<div><img src="./source/Asset%2011.png" style="width: 30px; margin: 1px;"/></div>';
                }else{
                    new_row += '<div><img src="./source/ball.png" style="width: 30px; margin: 1px;"/></div>';
                }
            }
        }

        new_row += '</div>';
        $("#map").append(new_row);
    }

    console.log(JSON.stringify(ghost));

}
function myEventHandler(e){
    switch (e.keyCode) {
        case 87:
        case 119:
            direction = "U";
            pac_direction = 270;
            break;
        case 83:
        case 115:
            direction = "D";
            pac_direction = 90;
            break;
        case 65:
        case 97:
            direction = "L";
            pac_direction = 180;
            break;
        case 68:
        case 100:
            direction = "R";
            pac_direction = 0;
            break;
    }
    pac_moving();
}
function pac_moving(ghost_direction){

    for(var k =0; k <ghost_count; k++){
        ghost_direction = (ghost_direction+1) % 4;
        var tmp_y = ghost[k][1], tmp_x = ghost[k][0];
        switch (ghost_direction) {
            case 0: //R
                if(map[tmp_y][tmp_x+1] != 0){
                    ghost[k][0] += 1;
                }
                break;
            case 1:  //L
                if(map[tmp_y][tmp_x-1] != 0){
                    ghost[k][0] -= 1
                }
                break;
            case 2: //U
                if(map[tmp_y-1][tmp_x] != 0){
                    ghost[k][1] -= 1;
                }
                break;
            case 3:  //D
                if(map[tmp_y+1][tmp_x] != 0){
                    ghost[k][1] += 1;
                }
                break;
        }
    }

    switch (direction) {
        case "R":
            if(map[pac_y][pac_x+1] != 0){
                pac_x += 1;
                if(map[pac_y][pac_x] == 1)  {score += 10;}
                if(map[pac_y][pac_x] == 5)  {score += 50;}
                map[pac_y][pac_x] = 2;
            }
            break;
        case "L":
            if(map[pac_y][pac_x-1] != 0){
                pac_x -= 1
                if(map[pac_y][pac_x] == 1)  {score += 10;}
                if(map[pac_y][pac_x] == 5)  {score += 50;}
                map[pac_y][pac_x] = 2;
            }
            break;
        case "U":
            if(map[pac_y-1][pac_x] != 0){
                pac_y -= 1;
                if(map[pac_y][pac_x] == 1)  {score += 10;}
                if(map[pac_y][pac_x] == 5)  {score += 50;}
                map[pac_y][pac_x] = 2;
            }
            break;
        case "D":
            if(map[pac_y+1][pac_x] != 0){
                pac_y += 1;
                if(map[pac_y][pac_x] == 1)  {score += 10;}
                if(map[pac_y][pac_x] == 5)  {score += 50;}
                map[pac_y][pac_x] = 2;
            }
            break;
    }

    for(var k =0; k <ghost_count; k++){
        var tmp_y = ghost[k][1], tmp_x = ghost[k][0];
        if(pac_x == tmp_x && pac_y == tmp_y)    {life -= 1; life_left(life); }
    }

    $("#score_play").html(score);
    initalize_map();
}
function play_end(){

    clearInterval(pac_move);
    $("#end_play").css("display","block");
    $("#end_play").css("left",$("#main_play").offset().left+ 120);
    $("#end_play").css("top",$("#main_play").offset().top+200);
    $("#time_play").html("00:00");
    window.removeEventListener("keydown", myEventHandler, false);
    console.log(score);
}

function life_left(life){
    // life
    $("#life_play").empty();
    for(var i=0; i<life;i++){
        $("#life_play").append('<div><img src="./source/Asset%208.png" style="width: 30px; margin: 3px;"/></div>');
    }
    if(life == 0)   {   play_end(); }
}

$("#start_game").on('click',function () {

    if($("#name").val() == ''){
        alert("Please input the player's name");
        return;
    }

    $("#stop_play").css("display",'none');
    $("#start_play").css("display",'inline');

    map_str =   '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0\n' +
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
        map_tmp = map_str.split('\n'),
        map = [],
        row = map_tmp.length-1, col =0,
        life = 3, direction = "R", score = 0, time = 30, ms = 1;

    if(level == "normal") {
        ghost_count = 1;
        star = 10;
    }
    else {
        ghost_count = 3;
        star = 6;
    }

    pac_x = 9, pac_y = 12,  pac_direction=0;
    ghost_x = 8, ghost_y = 9, ghost_direction=2;

    life_left(life);
    $("#score_play").html("0");
    $("#player_info").html($("#name").val());
    $("#stage_info").html(level);


    for(var i in map_tmp){
        var now = map_tmp[i].split(','),
            now_tmp = [];
        for(var j in now){
            now_tmp.push(now[j]);
            if( j!=0 ) col = j;
        }
        map.push(now_tmp);
    }

    for(var i=0; i < row; i++){
        for(var j=0; j<= col; j++){
            if(map[i][j] == "1") {
                if (star > 0) {
                    var cur = Math.floor(Math.random() * 5);
                    if (cur == 1) {
                        map[i][j] = 5;
                        star -= 1;
                    }
                }
            }
        }
    }

    window.addEventListener("keydown", myEventHandler, false);
    initalize_map();

    pac_move = setInterval(function () {

        pac_moving(ghost_direction);
        ms +=1;
        if( ms % 2 == 0){
            $("#pacman").attr("src","./source/Asset%207.png");
            time -= 1;
            if(time == 60) {
                $("#time_play").html("01:00");
            }else if(time == 0){
                play_end();
            }
            else
                $("#time_play").html("00:" + ((time<10) ? "0" : "") + time);
        }else if(ms % 3 == 0){
            ghost_direction = Math.floor(Math.random() * 4);
        }
        else
            $("#pacman").attr("src","./source/Asset%208.png");
    },500);




    $("#play_pause").on('click',function () {
        if( $("#play_pause").attr("src") == "./source/pause.png"){
            clearInterval(pac_move);
            window.removeEventListener("keydown", myEventHandler, false);
            $("#play_pause").attr("src","./source/play.png");
        }else{
            $("#play_pause").attr("src","./source/pause.png");
            window.addEventListener("keydown", myEventHandler, false);
            pac_move = setInterval(function () {
                pac_moving();
                ms +=1;
                if( ms % 2 == 0){
                    time -= 1;
                    if(time == 60) {
                        $("#time_play").html("01:00");
                    }else if(time == 0){
                        play_end();
                    }
                    else
                        $("#time_play").html("00:" + ((time<10) ? "0" : "") + time);
                }
            },500);

        }
    });

});

$("#restart").on("click",function () {
    $("#end_play").css("display","none");
    $("#start_game").click();
});

$("#tutorial").on('click',function () {



    $("#start_game").click();
});

$("#easy").on('click',function () {
    level = 'easy';
    $('.select').removeClass();
    $(this).addClass('select');
});
$("#normal").on('click',function () {
    level = 'normal';
    $('.select').removeClass();
    $(this).addClass('select');
});
$("#hard").on('click',function () {
    level = 'hard';
    $('.select').removeClass();
    $(this).addClass('select');
});

$("#font_up").on('click',function () {

    var font = parseInt($('h1').css('font-size')) +1;
    $('h1').css('font-size', font +'px');

    var font = parseInt($('h2').css('font-size')) +1;
    $('h2').css('font-size', font +'px');

    $("#main_play").css("overflow-y","auto");
    $("#main_play").css("padding-right","17px");

});