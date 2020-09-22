

var level = 'normal';
var star = 10;
var is_tutorial = false;

var map = '' +
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
    '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0\n';
var map_array = [];
var row = 0, col = 0;

var clock, pac, ghost_clock, ghost_timer, is_pacmove;
var direction = 0,pac_x = 9, pac_y = 12;
var score = 0, life = 3,  time = 60;
var ghost = 1, ghost_ = [[9,10],[9,10],[9,10]], ghost_direction = 270;


$(".index").on('click',function () {

    switch ($(this).val()) {
        case "easy":
        case "normal":
        case "hard":
            $('.selected').removeClass('selected')
            $(this).addClass('selected');
            level = $(this).val();
            break;

        case 'start':
            if($("#plyr_input").val() == '') {
                $("#plyr_input").css('background-color', 'red');
                setTimeout(function () {
                    $("#plyr_input").css('background-color', 'white');
                }, 250);
                break;
            }
            $("#tutorial_box").css('display', 'none');
            $("#index_container").css('display', 'none');
            $("#play_container").css('display', 'block');
            is_tutorial = false;
            start_game();
            break;

        case 'tutorial':
            $("#plyr_input").val('example');
            $("#map").empty();
            $("#index_container").css('display', 'none');
            $("#play_container").css('display', 'block');
            is_tutorial = true;
            start_game();
            break;
    }
});

function map_initalize() {
    map_array = [];
    var map_tmp = map.trim('\n').split('\n');
    for(var i in map_tmp){
        var tmp = map_tmp[i].split(",");
        var tmp_array = [];
        for(var j in tmp){
            if(tmp[j] == "1"){
                var draw_star = 0;
                if(star > 0){
                    draw_star = Math.floor(Math.random()*10);
                    if(draw_star == 4){
                        tmp_array.push("5");
                        star -= 1;
                    }else
                        tmp_array.push(tmp[j]);
                }else
                    tmp_array.push(tmp[j]);

            }else
                tmp_array.push(tmp[j]);
            col = j;
        }
        map_array.push(tmp_array);
        row = i;
    }
}

function map_refresh() {
    $("#score").html(score);
    $("#map").empty();
    for(var i in map_array){
        var div = '<div class="map_row">';
        for(var j in map_array[i]){

            var isDrawing = true;

            if(i == pac_y && j == pac_x){
                div += '<img id="pacman" src="./source/Asset%207.png" style="transform: rotate(' + direction +'deg)" class="map_icon" />';
                isDrawing = false;
            }

            for(var k = 0; k < ghost; k++){
                if(isDrawing){
                    if(ghost_[k][0] == j && ghost_[k][1] == i){
                        div += '<img id="ghost'+k+'" src="./source/Asset%205.png" class="map_icon" />';
                        isDrawing = false;
                    }
                }
            }

            if(isDrawing){
                switch(map_array[i][j]){
                    case "0":
                        div += '<img src="./source/wall.png" class="map_icon" />';
                        break;
                    case "1":
                        div += '<img src="./source/dot.png" class="map_icon" />';
                        break;
                    case "2":
                        div += '<img src="./source/blank.png" class="map_icon" />';
                        break;
                    case "3":
                        div += '<img src="./source/Asset%203.png" class="map_icon" />';
                        break;
                    case "5":
                        div += '<img src="./source/Asset%2011.png" class="map_icon" />';
                        break;
                }
            }

        }
        div += '</div>';
        $("#map").append(div);
    }


    for(var k = 0; k< ghost; k++){
        if( ghost_[k][1] == pac_y && ghost_[k][0] == pac_x){
            life -= 1;
            live_left(life);
        }
    }

}

function ghost_moving(){

    for(var k = 0; k< ghost; k++){

        var ghost_x = ghost_[k][0];
        var ghost_y = ghost_[k][1];
        var k_direction = (ghost_direction + 90*k) % 360;

        switch (k_direction) {
            case 0:
                if(map_array[ghost_y][ghost_x + 1] != "0"){
                    if((ghost_x + 1) < 25) ghost_[k][0] += 1;

                }
                break;

            case 90:
                if(map_array[ghost_y + 1][ghost_x] != "0"){
                    ghost_[k][1] += 1;
                }
                break;

            case 180:
                if(map_array[ghost_y][ghost_x - 1] != "0"){
                    if((ghost_x - 1) > -1) ghost_[k][0] -= 1;
                }
                break;

            case 270:
                if(map_array[ghost_y - 1][ghost_x] != "0"){
                    ghost_[k][1] -= 1;
                }
                break;

        }
    }
}

var is_event;

$("#play_pause").on('click',function () {
    if($(this).attr('src') == './source/play.png'){
        $(this).attr('src', './source/pause.png');

        if(!is_tutorial){
            clock = setInterval(function () {
                time -= 1;
                if(time < 1) end_game();
                if(time < 10) $("#time").html("00:0" + time.toString());
                else $("#time").html("00:" + time.toString());

            },1000);
        }

        pac = setInterval(function () {
            if($("#pacman").attr('src') == "./source/Asset%207.png")
                $("#pacman").attr('src', "./source/Asset%208.png");
            else
                $("#pacman").attr('src', "./source/Asset%207.png");
        }, 250);

        ghost_clock = setInterval(function () {
            ghost_moving();
            map_refresh();
        }, 500);

        ghost_timer = setInterval(function () {
            ghost_direction = (ghost_direction + (90*Math.floor(Math.random()*4))) % 360;
        }, 2000);

        is_pacmove = setInterval(function () {
            if (is_event){
                switch (direction) {
                    case 270:
                        if(map_array[pac_y -1 ][pac_x] != "0"){
                            pac_y -= 1;
                            if(map_array[pac_y][pac_x] == "1") score += 10;
                            if(map_array[pac_y][pac_x] == "5") {
                                if(is_tutorial){
                                    $("#play_pause").click();
                                    is_tutorial = false;
                                    start_game();
                                }
                                score += 50;
                            }
                            if(map_array[pac_y][pac_x] != "3") map_array[pac_y][pac_x] = "2";
                        }
                        map_refresh();
                        break;

                    case 90:
                        if(map_array[pac_y +1 ][pac_x] != "0"){
                            pac_y += 1;
                            if(map_array[pac_y][pac_x] == "1") score += 10;
                            if(map_array[pac_y][pac_x] == "5") {
                                if(is_tutorial){
                                    $("#play_pause").click();
                                    is_tutorial = false;
                                    start_game();
                                }
                                score += 50;
                            }
                            if(map_array[pac_y][pac_x] != "3") map_array[pac_y][pac_x] = "2";
                        }
                        map_refresh();
                        break;

                    case 0:
                        if(map_array[pac_y][pac_x + 1] != "0" && (pac_x + 1) <= col){
                            pac_x += 1;
                            if(map_array[pac_y][pac_x] == "1") score += 10;
                            if(map_array[pac_y][pac_x] == "5") {
                                if(is_tutorial){
                                    $("#play_pause").click();
                                    is_tutorial = false;
                                    start_game();
                                }
                                score += 50;
                            }
                            if(map_array[pac_y][pac_x] != "3") map_array[pac_y][pac_x] = "2";
                        }
                        map_refresh();
                        break;

                    case 180:
                        if(map_array[pac_y][pac_x - 1] != "0" && (pac_x - 1) > -1){
                            pac_x -= 1;
                            if(map_array[pac_y][pac_x] == "1") score += 10;
                            if(map_array[pac_y][pac_x] == "5") {
                                if(is_tutorial){
                                    $("#play_pause").click();
                                    is_tutorial = false;
                                    start_game();
                                }
                                score += 50;
                            }
                            if(map_array[pac_y][pac_x] != "3") map_array[pac_y][pac_x] = "2";
                        }
                        map_refresh();
                        break;
                }
            }
        }, 500);


        window.addEventListener('keydown', function (e) {

            switch (e.key) {
                case "w":
                case "ArrowUp":
                    direction = 270;
                    is_event = true;
                    break;

                case "s":
                case "ArrowDown":
                    direction = 90;
                    is_event = true;
                    break;

                case "d":
                case "ArrowRight":
                    direction = 0;
                    is_event = true;
                    break;

                case "a":
                case "ArrowLeft":
                    direction = 180 ;
                    is_event = true;
                    break;
            }
            if(e.code == 'Space') $('#play_pause').click();
        });
        window.addEventListener('keyup', function () {
            is_event = false;
        });


    }else{
        $(this).attr('src', './source/play.png');
        clearInterval(clock);
        clearInterval(pac);
        clearInterval(ghost_clock);
        clearInterval(ghost_timer);
        clearInterval(is_pacmove);



    }
});

$(".touch").on('mousedown',function () {
    switch ($(this).val()) {
        case "w":
        case "ArrowUp":
            direction = 270;
            if(map_array[pac_y -1 ][pac_x] != "0"){
                pac_y -= 1;
                if(map_array[pac_y][pac_x] == "1") score += 10;
                if(map_array[pac_y][pac_x] == "5") {
                    if(is_tutorial){
                        $("#play_pause").click();
                        is_tutorial = false;
                        start_game();
                    }
                    score += 50;
                }
                if(map_array[pac_y][pac_x] != "3") map_array[pac_y][pac_x] = "2";
            }
            map_refresh();
            break;

        case "s":
        case "ArrowDown":
            direction = 90;
            if(map_array[pac_y +1 ][pac_x] != "0"){
                pac_y += 1;
                if(map_array[pac_y][pac_x] == "1") score += 10;
                if(map_array[pac_y][pac_x] == "5") {
                    if(is_tutorial){
                        $("#play_pause").click();
                        is_tutorial = false;
                        start_game();
                    }
                    score += 50;
                }
                if(map_array[pac_y][pac_x] != "3") map_array[pac_y][pac_x] = "2";
            }
            map_refresh();
            break;

        case "d":
        case "ArrowRight":
            direction = 0;
            if(map_array[pac_y][pac_x + 1] != "0"){
                pac_x += 1;
                if(map_array[pac_y][pac_x] == "1") score += 10;
                if(map_array[pac_y][pac_x] == "5") {
                    if(is_tutorial){
                        $("#play_pause").click();
                        is_tutorial = false;
                        start_game();
                    }
                    score += 50;
                }
                if(map_array[pac_y][pac_x] != "3") map_array[pac_y][pac_x] = "2";
            }
            map_refresh();
            break;

        case "a":
        case "ArrowLeft":
            direction = 180 ;
            if(map_array[pac_y][pac_x - 1] != "0"){
                pac_x -= 1;
                if(map_array[pac_y][pac_x] == "1") score += 10;
                if(map_array[pac_y][pac_x] == "5") {
                    if(is_tutorial){
                        $("#play_pause").click();
                        is_tutorial = false;
                        start_game();
                    }
                    score += 50;
                }
                if(map_array[pac_y][pac_x] != "3") map_array[pac_y][pac_x] = "2";
            }
            map_refresh();
            break;
    }
})

function end_game() {

    $("#play_pause").click();

    $("#end_box_container").css('display', 'inline');
    $("#end_box_container").css('left', $('#play_page').css('left'));
    $("#end_box_container").css('top', $('#play_page').css('top'));

    $("#end").empty();
    $("#end").append('' +
        '<H1>Result</H1>' +
        '<hr>' +
        '<div id="score_board"></div>' +
        '' +
        '<button class="index" id="restart">RESTART</button>');

    $("#restart").on('click',start_game);

    clearInterval(is_pacmove);
    clearInterval(ghost_clock);
    clearInterval(ghost_timer);
    clearInterval(clock);
    clearInterval(pac);

    window.removeEventListener('keypress', function (e) {
        switch (e.key) {
            case "w":
            case "ArrowUp":
                direction = 270;
                is_event = true;
                break;

            case "s":
            case "ArrowDown":
                direction = 90;
                is_event = true;
                break;

            case "d":
            case "ArrowRight":
                direction = 0;
                is_event = true;
                break;

            case "a":
            case "ArrowLeft":
                direction = 180 ;
                is_event = true;
                break;
        }
        if(e.code == 'Space') $('#play_pause').click();
    });
    window.removeEventListener('keyup', function () {
        is_event = false;
    });
}

function start_game() {



    direction = 0,pac_x = 9, pac_y = 12,
    score = 0, life = 3,  time = 60;
    ghost_ = [[9,10],[9,10],[9,10]];
    ghost_direction = 270;

    $("#end_box_container").css('display', 'none');

    if(level == "normal") {
        star = 10;
        ghost = 1;
    }
    if(level == "hard") {
        star = 6;
        ghost = 3;
    }

    map_initalize();
    map_refresh();

    if(navigator.userAgent.includes('Mobile'))
        $("#touch_panel").css('display', 'block');
    else
        $("#touch_panel").css('display', 'none');

    $("#player").html($("#plyr_input").val());
    $("#score").html(score);
    $("#level").html(level);
    live_left(life);

    window.addEventListener('keypress', function (e) {
        if(e.code=="Space")
            $("#play_pause").click();
    });

    if(is_tutorial) tutorial();
    if(!is_tutorial) $("#play_pause").click();

}

function live_left(life) {
    $("#live").empty();
    for(var i = 0; i < life; i++){
        $("#live").append('<img src="./source/Asset%208.png" class="map_icon" />')
    }
    if(life == 0) end_game();
}

function tutorial() {

    $("#tutorial_box").css('display', 'inline');
    $("#tutorial_box").css('left', $('#play_page').css('left'));
    $("#tutorial_box").css('top', $('#play_page').css('top'));
    $("#pacman").css('display', 'none');

    var t1 = setTimeout(function () {
        $(".highlight").removeClass('highlight');
        $("#score_box").addClass('highlight');
        $('#description').empty();
        $('#description').append('' +
            '<H1>分數顯示區</H1>' +
            '<hr>' +
            '<p>  <img src="source/Asset%2011.png" class="map_icon" />：10分 </p>' +
            '<p>  <img src="source/dot.png" class="map_icon" />：50分 </p>' +
            '<button id="quit">退出教學</button>');
        $("#quit").on('click', function () {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t4);
            clearTimeout(t5);
            clearTimeout(t6);
            clearTimeout(t6_1);
            clearTimeout(t7);
            clearTimeout(t8);
            clearTimeout(t9);
            clearTimeout(t10);

            $("#play_container").css('display', 'none');
            $("#index_container").css('display', 'inline');
        });
    }, 100);

    var t2 = setTimeout(function () {
        $(".highlight").removeClass('highlight');
        $("#live_box").addClass('highlight');
        $('#description').empty();
        $('#description').append('' +
            '<H1>分數顯示區</H1>' +
            '<hr>' +
            '<p>預設有3條命</p>' +
            '<p>生命用盡則遊戲結束</p>' +
            '<button id="quit">退出教學</button>');
        $("#quit").on('click', function () {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t4);
            clearTimeout(t5);
            clearTimeout(t6);
            clearTimeout(t6_1);
            clearTimeout(t7);
            clearTimeout(t8);
            clearTimeout(t9);
            clearTimeout(t10);

            $("#play_container").css('display', 'none');
            $("#index_container").css('display', 'inline');
        });
    }, 5100);

    var t4 = setTimeout(function () {
        $(".highlight").removeClass('highlight');
        $("#time_box").addClass('highlight');
        $('#description').empty();
        $('#description').append('' +
            '<H1>時間顯示區</H1>' +
            '<hr>' +
            '<p>預設有1分鐘遊戲時間</p>' +
            '<button id="quit">退出教學</button>');
        $("#quit").on('click', function () {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t4);
            clearTimeout(t5);
            clearTimeout(t6);
            clearTimeout(t6_1);
            clearTimeout(t7);
            clearTimeout(t8);
            clearTimeout(t9);
            clearTimeout(t10);

            $("#play_container").css('display', 'none');
            $("#index_container").css('display', 'inline');
        });
    }, 10100);

    var t5 = setTimeout(function () {
        $(".highlight").removeClass('highlight');
        $("#play_pause").addClass('highlight');
        $('#description').empty();
        $('#description').append('' +
            '<H1>遊戲控制按鈕</H1>' +
            '<hr>' +
            '<p>開始 / 暫停</p>' +
            '<p>暫停時，無法操作任何動作</p>' +
            '<button id="quit">退出教學</button>');
        $("#quit").on('click', function () {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t4);
            clearTimeout(t5);
            clearTimeout(t6);
            clearTimeout(t6_1);
            clearTimeout(t7);
            clearTimeout(t8);
            clearTimeout(t9);
            clearTimeout(t10);

            $("#play_container").css('display', 'none');
            $("#index_container").css('display', 'inline');
        });
    }, 15100);

    var t6 = setTimeout(function () {
        $(".highlight").removeClass('highlight');
        $("#map").addClass('highlight');
        $('#description').empty();
        $('#description').append('' +
            '<H1>地圖顯示區</H1>' +
            '<hr>' +
            '<p>  <img src="source/Asset%207.png" class="map_icon" />：小精靈 </p>' +
            '<p>  ' +
            '   <img src="source/Asset%201.png" class="map_icon" />' +
            '   <img src="source/Asset%203.png" class="map_icon" />' +
            '   <img src="source/Asset%205.png" class="map_icon" />' +
            '：鬼</p>' +
            '<p>  <img src="source/dot.png" class="icon" />：豆子</p>' +
            '<button id="quit">退出教學</button>');
        $("#quit").on('click', function () {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t4);
            clearTimeout(t5);
            clearTimeout(t6);
            clearTimeout(t6_1);
            clearTimeout(t7);
            clearTimeout(t8);
            clearTimeout(t9);
            clearTimeout(t10);

            $("#play_container").css('display', 'none');
            $("#index_container").css('display', 'inline');
        });
    }, 25100);

    var t6_1 = setTimeout(function () {
        $(".highlight").removeClass('highlight');
        $("#map").addClass('highlight');
        $('#description').empty();
        $('#description').append('' +
            '<H1>操作方法</H1>' +
            '<hr>' +
            '<div> <button class="touch">W</button> <button class="touch">上</button>：上 </div>' +
            '' +
            '<div> <button class="touch">A</button> <button class="touch">左</button> ：左 </div>' +
            '' +
            '<div> <button class="touch">S</button>  <button class="touch">下</button> ：下 </div>' +
            '' +
            '<div> <button class="touch">D</button>  <button class="touch">右</button>：右 </div>' +
            '<button id="quit">退出教學</button>');
        $("#quit").on('click', function () {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t4);
            clearTimeout(t5);
            clearTimeout(t6);
            clearTimeout(t6_1);
            clearTimeout(t7);
            clearTimeout(t8);
            clearTimeout(t9);
            clearTimeout(t10);

            $("#play_container").css('display', 'none');
            $("#index_container").css('display', 'inline');
        });
    }, 30100);

    var t7 = setTimeout(function () {
        $(".highlight").removeClass('highlight');
        $("#player").addClass('highlight');
        document.getElementById('player').scrollIntoView();
        $('#description').empty();
        $('#description').append('' +
            '<H1>玩家名稱</H1>' +
            '<button id="quit">退出教學</button>');
        $("#quit").on('click', function () {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t4);
            clearTimeout(t5);
            clearTimeout(t6);
            clearTimeout(t6_1);
            clearTimeout(t7);
            clearTimeout(t8);
            clearTimeout(t9);
            clearTimeout(t10);

            $("#play_container").css('display', 'none');
            $("#index_container").css('display', 'inline');
        });
    }, 35100);

    var t8 = setTimeout(function () {
        $(".highlight").removeClass('highlight');
        $("#level_box").addClass('highlight');
        $('#description').empty();
        $('#description').append('' +
            '<H1>難度顯示區</H1>' +
            '<hr>' +
            '<p>有 EASY/ NORMAL/ HARD</p>' +
            '<p>3種難度，於起始頁面選擇</p>' +
            '<button id="quit">退出教學</button>');
        $("#quit").on('click', function () {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t4);
            clearTimeout(t5);
            clearTimeout(t6);
            clearTimeout(t6_1);
            clearTimeout(t7);
            clearTimeout(t8);
            clearTimeout(t9);
            clearTimeout(t10);

            $("#play_container").css('display', 'none');
            $("#index_container").css('display', 'inline');
        });
    }, 40100);

    var t9 = setTimeout(function () {
        $(".highlight").removeClass('highlight');
        $("#font_box").addClass('highlight');
        $('#description').empty();
        $('#description').append('' +
            '<H1>字體控制區</H1>' +
            '<hr>' +
            '<p>可以控制頁面上所有字體大小</p>' +
            '<button id="quit">退出教學</button>');
        $("#quit").on('click', function () {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t4);
            clearTimeout(t5);
            clearTimeout(t6);
            clearTimeout(t6_1);
            clearTimeout(t7);
            clearTimeout(t8);
            clearTimeout(t9);
            clearTimeout(t10);

            $("#play_container").css('display', 'none');
            $("#index_container").css('display', 'inline');
        });
    }, 45100);

    if($("#touch_panel").css('display') != 'none'){
        var t10 = setTimeout(function () {
            $(".highlight").removeClass('highlight');
            $("#touch_panel").addClass('highlight');
            $('#description').empty();
            $('#description').append('' +
                '<H1>操作方法</H1>' +
                '<hr>' +
                '<div> <button class="touch">W</button> ：上 </div>' +
                '' +
                '<div> <button class="touch">A</button> ：左 </div>' +
                '' +
                '<div> <button class="touch">S</button> ：下 </div>' +
                '' +
                '<div> <button class="touch">D</button> ：右 </div>' +
                '<button id="quit">退出教學</button>');
            $("#quit").on('click', function () {
                clearTimeout(t1);
                clearTimeout(t2);
                clearTimeout(t4);
                clearTimeout(t5);
                clearTimeout(t6);
                clearTimeout(t6_1);
                clearTimeout(t7);
                clearTimeout(t8);
                clearTimeout(t9);
                clearTimeout(t10);

                $("#play_container").css('display', 'none');
                $("#index_container").css('display', 'inline');
            });
        }, 50100);
    }

    var t11 = setTimeout(function () {
        $(".highlight").removeClass('highlight');
        $("#touch_panel").addClass('highlight');
        $('#description').empty();
        $('#description').append('' +
            '<H1>新手任務</H1>' +
            '<hr>' +
            '<p>透過控制小精靈，吃到一顆星星</p>' +
            '<p>透過按「遊戲控制鍵」開始操作</p>' +
            '');
    }, 55100);

    var end = setInterval(function () {
        $("#tutorial_box").css('display', 'none');
        $("#pacman").css('display', 'inline');
        $("#play_pause").addClass('highlight');
    }, 65100);


}


$('.font').on('click',function () {
    if($(this).val() == 'add'){
        var tmp = $("H1").css('font-size');
            tmp = parseInt(tmp) + 2;
        $("H1").css('font-size',tmp.toString() + "px");

            tmp = $("p").css('font-size');
            tmp = parseInt(tmp) + 2;
        $("p").css('font-size',tmp.toString() + "px");

        tmp = $("button").css('font-size');
        tmp = parseInt(tmp) + 2;
        $("button").css('font-size',tmp.toString() + "px")
    }else{
        var tmp = $("H1").css('font-size');
        tmp = parseInt(tmp) - 2;
        $("H1").css('font-size',tmp.toString() + "px");

        tmp = $("p").css('font-size');
        tmp = parseInt(tmp) - 2;
        $("p").css('font-size',tmp.toString() + "px");

        tmp = $("button").css('font-size');
        tmp = parseInt(tmp) - 2;
        $("button").css('font-size',tmp.toString() + "px")
    }
});