<?php

    $valid = "Y";
    $str = '9789864762603';
    $tmp = explode("-", $str);
    if(count($tmp) < 2) $tmp = explode(" ",$str);

    $str = '';
    for($i=0; $i < count($tmp); $i++){
        $str .= $tmp[$i];
    }

    $first = substr($str,0,3);
    if($first == '978' || $first == '979'){
        $now = 1;
        $total =0;

        for($i=0; $i<12;$i++){
            if(!is_numeric(substr($str,$i,1)))$valid = "N";
            $total += $now* intval(substr($str,$i,1));
            ($now == 1) ? $now = 3 : $now = 1;
        }

        if((10 - ($total % 10)) != substr($str,12,1)) $valid = "N";

    }else{  $valid = "N";   }

    echo $valid;

    echo'<br>===================================================<br>';

    $m = 3;
    $m_input = ['color','type','gender'];

    $n = 6;
    $n_input = [['color', 'black', 2],['color', 'green', 2],['color', 'golden', 5],['type', 't-shirt', 100],['type', 'pants', 150],['gender', 'male', 10],['gender', 'female', 10]];

    $detail = $m_input;
    for($i = 0; $i < count($n_input); $i++){
        for($j = 0; $j <count($m_input); $j++){
            if($n_input[$i][0] == $m_input[$j]){
                $detail[$j] .= '_' .$n_input[$i][1] . '('. $n_input[$i][2] .')';
            }
        }
    }

    $category = [];
    for($i=0; $i < count($detail); $i++){
        $tmp = explode("_",$detail[$i]);
        $tmp_array =[];
        for($j=1; $j< count($tmp); $j++){
            array_push($tmp_array,$tmp[$j]);
        }
        array_push($category,$tmp_array);
    }

    $result = Q($category,0,'',0);
    asort($result);

    foreach($result as $x => $x_value){
        echo $x_value . " " .  $x .'<br>';
    }


    function Q($category, $current_level, $str, $price){
        static $result = [];
        for($i =0; $i < count($category[$current_level]); $i++){
            $tmp = $str;
            $tmp_price = $price;
            if($current_level < count($category) -1 ){
                $str .= explode("(",$category[$current_level][$i])[0]. " ";
                $price += intval(explode("(",$category[$current_level][$i])[1]);
                Q($category,$current_level+1,$str,$price);
            }else{
                $str .= explode("(",$category[$current_level][$i])[0];
                $price += intval(explode("(",$category[$current_level][$i])[1]);
                $result[$str] = $price;
            }
            $str = $tmp;
            $price = $tmp_price;
        }
        return $result;
    }


    echo'<br>===================================================<br>';

    $graph = [
        [0,1,1,1,0,1,1,0],
        [0,0,0,1,0,0,0,1],
        [0,1,0,1,1,0,1,1],
        [1,1,0,0,0,0,1,0],
        [1,0,0,1,1,0,1,0],
        [1,1,0,0,1,0,1,1],
        [1,1,1,1,1,0,1,0],
        [0,0,1,1,1,1,0,0]
    ];

    $direction = [
        [0,-1], [1,-1], [1,0], [1,1], [0,1], [-1,1], [-1,0], [-1,-1]
    ];

    $x = 0; $y = 0;
    $last_x = 0; $last_y = 0;
    $index = -1;
    $try_count = -1;

    $graph[$x][$y] = 2;
    echo '(' . $y . ",", $x . ")<br>";

    while ($x != 7 || $y != 7){

        $index +=1 ;
        if($index > 7 ) $index = 0;
        $try_count += 1;

        $tmp = $direction[$index];
        $tmp_x = $x + $tmp[0];
        $tmp_y = $y + $tmp[1];

        if($tmp_x > -1 && $tmp_y > -1) {
            if($tmp_x < 8 && $tmp_y < 8) {
                if ($graph[$tmp_y][$tmp_x] == 0) {
                    $last_x = $x;
                    $last_y = $y;
                    $x = $tmp_x;
                    $y = $tmp_y;
                    $graph[$y][$x] = 2;
                    $index = -1;
                    $try_count = -1;
                    echo '(' . $y . ",", $x . ")<br>";
                }
            }
        }

        if($try_count > 7){
            $index_reserve = $index;
            $graph[$y][$x] = 3;

            while(1){
                $index_reserve -= 1;
                if($index_reserve < 0 ) $index_reserve = 7;

                $tmp = $direction[$index_reserve];
                $tmp_x = $x + $tmp[0];
                $tmp_y = $y + $tmp[1];

                if ($tmp_x > -1 && $tmp_y > -1) {
                    if($tmp_x < 8 && $tmp_y < 8) {
                        if ($graph[$tmp_y][$tmp_x] == 2) {
                            $x = $tmp_x;
                            $y = $tmp_y;
                            $try_count = -1;
                            break;
                        }
                    }
                }
            }
        }
    }

    echo'<br>===================================================<br>';

    $str = '[(()[])]';
    $valid = "Y";
    $result = [];

    for($i=0; $i<strlen($str); $i++){
        $now = substr($str, $i, 1);
        if($now != ')' && $now != ']' && $now != '}'){
            array_push($result,$now);
        }else{
            $index = count($result)-1;
            if($index < 0 ) $index =0;
            switch ($now){
                case ")":
                    if($result[$index] == "(")
                        array_pop($result);
                    else
                        array_push($result, $now);
                    break;
                case "]":
                    if($result[$index] == "[")
                        array_pop($result);
                    else
                        array_push($result, $now);
                    break;
                case "}":
                    if($result[$index] == "{")
                        array_pop($result);
                    else
                        array_push($result, $now);
                    break;
            }
        }
    }

    if(count($result) > 0)
        $valid = "N";

    echo $valid;

?>