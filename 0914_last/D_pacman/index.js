var level = "normal";
var star = 10;
var ghost = 1;
var score = 0;
var time = 60;
var life = 3;
var is_tutorial = false;
var is_playing = false;
var is_moving = false;
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
var col =0, row =0;

var pac_x = 9, pac_y = 12;
var ghost_xy = [[9,10,0],[9,10,0],[9,10,0]];
var direction = 0;

var timer, pac_moving, pac_animation, ghost_moving;
var t1, t2, t3, t4, t5, t6, t7, t8, t9, t10;

$(".index").on('click', function () {

    switch ($(this).val()) {
        case "easy":
        case "normal":
        case "hard":
            level = $(this).val();
            $(".selected").removeClass("selected");
            $(this).addClass("selected");
            break;

        case "tutorial":
            $(this).addClass("selected");
            is_tutorial = true;
            start_game();
            break;

        case "start":
            $(this).addClass("selected");
            is_tutorial = false;
            start_game();
            break;

        case "end":
            console.log('456');
            $("#index_box").css('display', 'block');
            $("#play_box").css('display', 'none');
            is_tutorial = false;
            break;

    }
});

$(".font").on("click", function () {
    if ($(this).val() === "add"){
        var tmp = parseInt($("H1").css('font-size')) +2 ;
        $("H1").css('font-size', tmp + "px");

        var tmp = parseInt($(".index").css('font-size')) +2 ;
        $(".index").css('font-size', tmp + "px");

        var tmp = parseInt($("p").css('font-size')) +2 ;
        $("p").css('font-size', tmp + "px");
    }else{
        var tmp = parseInt($("H1").css('font-size')) -2 ;
        $("H1").css('font-size', tmp + "px");

        var tmp = parseInt($(".index").css('font-size')) -2 ;
        $(".index").css('font-size', tmp + "px");

        var tmp = parseInt($("p").css('font-size')) -2 ;
        $("p").css('font-size', tmp + "px");
    }
});

$("#play_pause").on("click", function () {

    if(is_playing == false){
        //play
        $(this).attr("src", './source/pause.png');
        is_playing = true;

        window.addEventListener('keydown', key_press);
        window.addEventListener('keyup', function () {  is_moving = false;});

        pac_moving = setInterval(function () {
            if(is_moving){
                switch (direction) {
                    case 270:
                        if(map_array[pac_y - 1][pac_x] != "0"){
                            pac_y -= 1;
                            events();
                        }
                        break;
                    case 180:
                        if(map_array[pac_y][pac_x-1] != "0"){
                            pac_x -= 1;
                            events();
                        }
                        break;
                    case 0:
                        if(map_array[pac_y][pac_x + 1] != "0"){
                            pac_x += 1;
                            events();
                        }
                        break;
                    case 90:
                        if(map_array[pac_y + 1][pac_x] != "0"){
                            pac_y += 1;
                            events();
                        }
                        break;
                }

                map_refresh();
                function events() {
                    switch(map_array[pac_y][pac_x]){
                        case "1":
                            score += 10;
                            break;
                        case "5":
                            score += 50;
                            if(is_tutorial){
                                is_tutorial = false;
                                start_game();
                            }
                            break;

                    }
                    map_array[pac_y][pac_x] = "2";
                }
            }
        }, 500);

        if(!is_tutorial){
            timer = setInterval(function () {
                if(time == 60){
                    $("#time").html("01:00");
                }else if(time < 60 && time > 9){
                    $("#time").html("00:" + time.toString());
                }else{
                    $("#time").html("00:0" + time.toString());
                }

                time -= 1;
                if(time < 0) end_game();
            }, 1000);
        }

        pac_animation = setInterval(function () {
            if($("#pacman").attr('src') == "./source/Asset%207.png") {
                $("#pacman").attr('src', "./source/Asset%208.png");
                $("#ghost0").attr('src', "./source/Asset%204.png");
                $("#ghost1").attr('src', "./source/Asset%202.png");
                $("#ghost2").attr('src', "./source/Asset%206.png");

            }

            else {
                $("#pacman").attr('src', "./source/Asset%207.png");
                $("#ghost0").attr('src', "./source/Asset%203.png");
                $("#ghost1").attr('src', "./source/Asset%201.png");
                $("#ghost2").attr('src', "./source/Asset%205.png");
            }

        }, 250);

        ghost_moving = setInterval(function () {
            for(k=0; k< ghost; k++){
                var selection = [0,90,180,270];
                var rnd= Math.floor(Math.random()*5);
                ghost_xy[k][2] = selection[rnd];
                switch (selection[rnd]) {
                    case 270:
                        if(map_array[ghost_xy[k][1] - 1][ghost_xy[k][0]] != "0"){
                            ghost_xy[k][1] -= 1;
                        }
                        break;
                    case 180:
                        if(map_array[ghost_xy[k][1]][ghost_xy[k][0]-1] != "0"){
                            ghost_xy[k][0] -= 1;
                        }
                        break;
                    case 0:
                        if(map_array[ghost_xy[k][1]][ghost_xy[k][0] + 1] != "0"){
                            ghost_xy[k][0] += 1;
                        }
                        break;
                    case 90:
                        if(map_array[ghost_xy[k][1] + 1][ghost_xy[k][0]] != "0"){
                            ghost_xy[k][1] += 1;
                        }
                        break;
                }
            }
            map_refresh();

        }, 500);


    }else{
        //pause
        $(this).attr("src", './source/play.png');
        is_playing = false;

        clearInterval(timer);
        clearInterval(pac_moving);
        clearInterval(pac_animation);

        window.removeEventListener('keydown', key_press);
        window.removeEventListener('keyup', function () {  is_moving = false;});

    }


});

$(".touch").on('click', function () {
    var tmp = $(this).val();
    switch (tmp) {
        case "w":
        case "ArrowUp":
            direction = 270;
            break;
        case "a":
        case "ArrowLeft":
            direction = 180;
            break;
        case "d":
        case "ArrowRight":
            direction = 0;
            break;
        case "s":
        case "ArrowDown":
            direction = 90;
            break;
        case "space":
            $("#play_pause").click();
            return;
    }
    switch (direction) {
        case 270:
            if(map_array[pac_y - 1][pac_x] != "0"){
                pac_y -= 1;
                events();
            }
            break;
        case 180:
            if(map_array[pac_y][pac_x-1] != "0"){
                pac_x -= 1;
                events();
            }
            break;
        case 0:
            if(map_array[pac_y][pac_x + 1] != "0"){
                pac_x += 1;
                events();
            }
            break;
        case 90:
            if(map_array[pac_y + 1][pac_x] != "0"){
                pac_y += 1;
                events();
            }
            break;
    }

    map_refresh();
    function events() {
        switch(map_array[pac_y][pac_x]){
            case "1":
                score += 10;
                break;
            case "5":
                score += 50;
                if(is_tutorial){
                    is_tutorial = false;
                    start_game();
                }
                break;

        }
        map_array[pac_y][pac_x] = "2";
    }
});

function key_press(e) {
    is_moving = true;
    var tmp = e.key;
    switch (tmp) {
        case "w":
        case "ArrowUp":
            direction = 270;
            break;
        case "a":
        case "ArrowLeft":
            direction = 180;
            break;
        case "d":
        case "ArrowRight":
            direction = 0;
            break;
        case "s":
        case "ArrowDown":
            direction = 90;
            break;
        case " ":
            is_moving = false;
            window.addEventListener('keydown',function(e){
                if(e.key == " ") $("#play_pause").click();
            });
            $("#play_pause").click();
            break;
    }
}

function map_initalize() {
    var tmp = map.trim("\n").split("\n");
    for(var i in tmp){
        var tmp_row = tmp[i].split(",");
        var tmp_array = [];
        for(var j in tmp_row){

            if(tmp_row[j] == "1"){
                if(star > 0){
                    var star_rnd = Math.floor(Math.random()*10);
                    if(star_rnd == 3){
                        tmp_array.push("5");
                        star -= 1;
                    }else
                        tmp_array.push(tmp_row[j]);
                }
                else
                    tmp_array.push(tmp_row[j]);
            }
            else
                tmp_array.push(tmp_row[j]);



            col = j;
        }
        map_array.push(tmp_array);
        row = i;
    }
}

function map_refresh() {

    for(var k =0; k<ghost; k++){
        if(pac_x == ghost_xy[k][0] && pac_y == ghost_xy[k][1])
            life -= 1;
    }

    $("#score").html(score);
    life_left();
    $("#map").empty();



    for(var i =0; i<= row; i++){
        var div = '<div class="map_row">';
        for(var j =0; j<= col; j++){

            var is_drawing = true;

            if(i == pac_y && j==pac_x){
                div += '<img src="./source/Asset%207.png" id="pacman" style="transform: rotate('+direction+'deg)" class="map_icon" />';
                is_drawing = false;
            }

            for(var k =0; k<ghost; k++){
                if(is_drawing){
                    if(i == ghost_xy[k][1] && j==ghost_xy[k][0]){
                        div += '<img src="./source/Asset%203.png" id="ghost'+k+'"  class="map_icon" />';
                        is_drawing = false;
                    }
                }
            }

            if(is_drawing){
                var tmp = map_array[i][j];

                switch (tmp) {
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
                        div += '<img src="./source/Asset%201.png" class="map_icon" />';
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
}

function life_left() {
    $("#life").empty();
    for(var i =0; i<life; i ++){
        $("#life").append("<img src='source/Asset%208.png' class='map_icon' />")
    }
    if(life < 0) end_game();
}



function start_game() {
    $("#index_box").css('display', 'none');
    $("#play_box").css('display', 'block');

    if(level == "normal") {
        star = 10;
        ghost = 1;
    }
    if(level == "hard") {
        star = 6;
        ghost = 3;
    }

    pac_x = 9; pac_y = 12;
    map_initalize();
    map_refresh();

    score = 0;
    time = 60;
    life = 3;
    $("#level").html(level);
    $("#score").html(score);
    $("#time").html("01:00");
    $("#player").html($("#plyr_input").val());
    life_left();

    if(navigator.userAgent.includes("Mobile")){
        $("#touch_panel").css('display', 'block');
    }

    if(is_tutorial){

        $("#tab").css('top',$("#play_page").offset().top + 300)
            .css('left',$("#play_page").offset().left + 100)
            .css('display', 'block');
        $("#tutorial_box").css('display', 'block');
        $("#result_box").css('display', 'none');

        $("#end_tutorial").on('click', function () {
            $("#index_box").css('display', 'block');
            $("#play_box").css('display', 'none');
            $(".highlight").removeClass("highlight");
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
            clearTimeout(t4);
            clearTimeout(t5);
            clearTimeout(t6);
            clearTimeout(t7);
            clearTimeout(t8);
            clearTimeout(t9);
            clearTimeout(t10);
            is_tutorial = false;
        });

        $("#score_box").addClass("highlight");
        $("#content").html("" +
            "<H1>分數顯示區</H1>" +
            "<hr>" +
            "<table>" +
            "   <tr><td><img src='./source/dot.png' class='icon'></td><td><p>:10分</p></td></tr>" +
            "   <tr><td><img src='./source/Asset%2011.png' class='icon'></td><td><p>:50分</p></td></tr>" +
            "</table>" +
            "");

        t1 =    setTimeout(function () {
            $(".highlight").removeClass("highlight");
            $("#life_box").addClass("highlight");
            $("#content").html("" +
                "<H1>生命顯示區</H1>" +
                "<hr>" +
                "<p>預設有3條生命</p>" +
                "<p>生命用盡則遊戲結束</p>" +
                "");

        },5000);

        t2 =    setTimeout(function () {
            $(".highlight").removeClass("highlight");
            $("#time_box").addClass("highlight");
            $("#content").html("" +
                "<H1>時間顯示區</H1>" +
                "<hr>" +
                "<p>單次遊戲時間為60秒</p>" +
                "<p>時間用盡則遊戲結束</p>" +
                "");
        },10000);

        t3 =    setTimeout(function () {
            $(".highlight").removeClass("highlight");
            $("#play_pause").addClass("highlight");
            $("#content").html("" +
                "<H1>開始 / 暫停</H1>" +
                "<hr>" +
                "<table>" +
                "   <tr><td><img src='./source/play.png' class='icon'></td><td><p>: 開始遊戲</p></td></tr>" +
                "   <tr><td><img src='./source/pause.png' class='icon'></td><td><p>: 暫停遊戲</p></td></tr>" +
                "</table>" +
                "");
        },15000);

        t4 =    setTimeout(function () {
            $(".highlight").removeClass("highlight");
            $("#player_box").addClass("highlight");
            $("#content").html("" +
                "<H1>玩家名稱</H1>" +
                "<hr>" +
                "<p>會顯示在首頁輸入的玩家名稱</p>" +
                "");
        },20000);

        t5 =    setTimeout(function () {
            $(".highlight").removeClass("highlight");
            $("#level_box").addClass("highlight");
            $("#content").html("" +
                "<H1>關卡難度</H1>" +
                "<hr>" +
                "<p>分為 EASY / NORMAL / HARD</p>" +
                "<p>於起始頁面選擇</p>" +
                "");
        },25000);

        t6 =    setTimeout(function () {
            $(".highlight").removeClass("highlight");
            $("#font_box").addClass("highlight");
            $("#content").html("" +
                "<H1>字體大小控制</H1>" +
                "<hr>" +
                "<p>可控制頁面上所有顯示的字體大小</p>" +
                "");
        },30000);

        t7 =    setTimeout(function () {
            $(".highlight").removeClass("highlight");
            $("#map").addClass("highlight");
            $("#content").html("" +
                "<H1>地圖</H1>" +
                "<hr>" +
                "<table>" +
                "   <tr><td><img src='./source/Asset%201.png' class='icon'><img src='./source/Asset%203.png' class='icon'><img src='./source/Asset%205.png' class='icon'></td><td><p>:鬼</p></td></tr>" +
                "   <tr><td><img src='./source/Asset%207.png' class='icon'></td><td><p>: 小精靈</p></td></tr>" +
                "   <tr><td><img src='./source/dot.png' class='icon'></td><td><p>: 豆子</p></td></tr>" +
                "   <tr><td><img src='./source/Asset%2011.png' class='icon'></td><td><p>: 星星</p></td></tr>" +
                "   <tr><td><img src='./source/wall.png' class='icon'></td><td><p>: 牆壁</p></td></tr>" +
                "</table>" +
                "");
        },35000);

        if(navigator.userAgent.includes("Mobile")){
            t8 =    setTimeout(function () {
                $(".highlight").removeClass("highlight");
                $("#touch_panel").addClass("highlight");
                $("#content").html("" +
                    "<H1>觸碰螢幕控制區</H1>" +
                    "<hr>" +
                    "<table>" +
                    "   <tr><td align='center'><button class=\"touch\">W</button></td> <td><p>：上</p></td></tr>" +
                    "   <tr><td align='center'><button class=\"touch\">A</button></td> <td><p>：左</p></td></tr>" +
                    "   <tr><td align='center'><button class=\"touch\">S</button></td> <td><p>：下</p></td></tr>" +
                    "   <tr><tdalign='center'><button class=\"touch\">D</button></td> <td><p>：右</p></td></tr>" +
                    "   <tr><td><button class=\"touch\" style=\"width: 200px;\">Space</button></td> <td><p>：空白</p></td></tr>" +
                    "</table>" +
                    "");
            },40000);

            t9 =    setTimeout(function () {
                $(".highlight").removeClass("highlight");
                $("#touch_panel").addClass("highlight");
                $("#content").html("" +
                    "<H1>新手任務</H1>" +
                    "<hr>" +
                    "<p>透過控制小精靈，吃到一顆星星<img src='./source/Asset%2011.png' class='icon'/></p>" +
                    "");
            },45000);

            t10 =    setTimeout(function () {
                $(".highlight").removeClass("highlight");
                $("#tab").css('display','none');


                is_playing = false;
                $("#play_pause").click();

            },48000);
        }else{
            t9 =    setTimeout(function () {
                $(".highlight").removeClass("highlight");
                $("#touch_panel").addClass("highlight");
                $("#content").html("" +
                    "<H1>新手任務</H1>" +
                    "<hr>" +
                    "<p>透過控制小精靈，吃到一顆星星<img src='./source/Asset%2011.png' class='icon'/></p>" +
                    "");
            },40000);

            t10 =    setTimeout(function () {
                $(".highlight").removeClass("highlight");
                $("#tab").css('display','none');

                is_playing = false;
                $("#play_pause").click();

            },43000);
        }

    }else{
        is_playing = false;
        $("#play_pause").click();
    }
}

function end_game() {
    is_playing = false;
    clearInterval(timer);
    clearInterval(pac_moving);
    clearInterval(pac_animation);

    $("#tab").css('top',$("#play_page").offset().top + 300)
        .css('left',$("#play_page").offset().left + 100)
        .css('display', 'block');
    $("#tutorial_box").css('display', 'none');
    $("#result_box").css('display', 'block');


}