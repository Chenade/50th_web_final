<?php

    $valid = "Y";
    $str = '978 986 181 728 6';
    $array = explode("-", $str);
    $array2 = explode(" ", $str);
    if(count($array) != 5 && count($array2) != 5) {
        if(strlen($str) != 13){
            $valid = "N";
            goto result;
        }
    }

    if(strlen($str) != 13){
        if(count($array) == 5)
            $str = $array[0].$array[1].$array[2].$array[3].$array[4];
        else
            $str = $array2[0].$array2[1].$array2[2].$array2[3].$array2[4];
    }

    $total =0;
    for($i = 0; $i<12; $i++){
        if(is_numeric(substr($str,$i,1))){
            $total += substr($str,$i,1);
        }else{
            $valid = "N";
            goto result;
        }
    }
    $total = 10 - ($total % 10);

    $last_digit = substr($str,$i,1);
    if(!is_numeric($last_digit)){
        $valid = "N";
        goto result;
    }else{
        if($total != $last_digit)
            $valid = "N";
    }

    
    result:
    echo $valid;

    echo "<br>====================================================<br>";

$m = 3;
$m_input = ['color','type','gender'];

$n = 6;
$n_input = [['color', 'black', 2],['color', 'green', 2],['color', 'golden', 5],['type', 't-shirt', 100],['type', 'pants', 150],['gender', 'male', 10],['gender', 'female', 10]];

    $detail = $m_input;
    foreach ($n_input as $x => $x_value){
        foreach ($m_input as $y => $y_value){
            if($x_value[0] == $y_value){
                $detail[$y] .= "_" . $x_value[1] ."(". $x_value[2];
            }
        }
    }

    $category = [];
    foreach ($detail as $x => $x_value){
        $tmp = explode("_", $x_value);
        $tmp_array = [];
        foreach ($tmp as $y => $y_value){
            if($y > 0){
                array_push($tmp_array, $y_value);
            }
        }
        array_push($category,$tmp_array);
    }



    $result = Q($category, 0, '', 0);
    asort($result);

    foreach ($result as $x => $x_value){
        echo $x_value . " " .$x;
        echo '<br>';
    }

    function Q($category, $current_level, $str, $price){
        static $result = [];
        for($i =0; $i < count($category[$current_level]); $i++){
            $tmp_str = $str;
            $tmp_price = $price;
            if($current_level < count($category) -1 ){
                $tmp = explode("(", $category[$current_level][$i]);
                $str .= $tmp[0] . ' ';
                $price += $tmp[1];

                Q($category, $current_level+1, $str, $price);
            }else{
                $tmp = explode("(", $category[$current_level][$i]);
                $str .= $tmp[0];
                $price += $tmp[1];
                $result[$str] = $price;
            }
            $str = $tmp_str;
            $price = $tmp_price;
        }
        return $result;
    }

    echo "<br>====================================================<br>";

    $map = [
        [0,1,1,1,0,1,1,0],
        [0,0,0,1,0,0,0,1],
        [0,1,0,1,1,0,1,1],
        [1,1,0,0,0,0,1,0],
        [1,0,0,1,1,0,1,0],
        [1,1,0,0,1,0,1,1],
        [1,1,1,1,1,0,1,0],
        [0,0,1,1,1,1,0,0]
    ];

    $direction = [[0,-1], [1,-1], [1,0], [1,1], [0,1], [-1,1], [-1,0], [-1,-1]];

    $x = 0;
    $y = 0;
    $index = -1;
    $try_index = -1;

    while ($x != 7 || $y != 7){

        $index += 1;
        $try_index += 1;
        if($index > 7) $index = 0;

        $tmp = $direction[$index];
        $tmp_x = $x + $tmp[0];
        $tmp_y = $y + $tmp[1];

        if($tmp_x > -1 && $tmp_y > -1 && $tmp_x < 8 && $tmp_y < 8){
            if($map[$tmp_y][$tmp_x] == 0){
                $x = $tmp_x;
                $y = $tmp_y;
                $map[$y][$x] = 2;
                $index = -1;
                $try_index = -1;
                echo '(' . $y . ',' , $x . ')';
                echo '<br>';
            }
        }

        if($try_index > 7) {
            $index_reserve = $index;
            $map[$y][$x] = 3;
            while (1) {

                $index_reserve -= 1;
                if ($index_reserve < 0) $index_reserve = 7;

                $tmp = $direction[$index_reserve];
                $tmp_x = $x + $tmp[0];
                $tmp_y = $y + $tmp[1];

                if ($tmp_x > -1 && $tmp_y > -1 && $tmp_x < 8 && $tmp_y < 8) {
                    if ($map[$tmp_y][$tmp_x] == 2) {
                        $x = $tmp_x;
                        $y = $tmp_y;
                        $try_index = -1;
                        break;
                    }
                }
            }
        }


    }



    echo "<br>====================================================<br>";

    $str = '{(){}}[]';
    $result = [];

    for($i = 0; $i<strlen($str); $i++){
       $tmp = substr($str,$i,1);
       if($tmp != ')' && $tmp != ']' && $tmp != '}'){
           array_push($result, $tmp);
       }else{
           $index = count($result);
           if(($index-1) < 0) $index = 1;

           switch ($tmp){
               case ")":
                   if($result[$index-1] == "(")
                       array_pop($result);
                   else
                       array_push($result, $tmp);
                   break;
               case "]":
                   if($result[$index-1] == "[")
                       array_pop($result);
                   else
                       array_push($result, $tmp);
                   break;
               case "}":
                   if($result[$index-1] == "{")
                       array_pop($result);
                   else
                       array_push($result, $tmp);
                   break;

           }
       }
    }

    if(count($result) > 0)
        echo "N";
    else
        echo "Y";

?>