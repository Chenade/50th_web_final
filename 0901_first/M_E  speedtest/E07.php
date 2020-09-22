<!doctype HTML5>

<html>


<head>
    <style>
        .text{
            display:flex;
            flex-direction:row;
        }
    </style>
</head>

<body>

<form action="E07.php" method="POST">
    <div class="text">
        <textarea name="xml" style="width:300px;height:300px;"></textarea>
        <textarea name="json" style="width:300px;height:300px;"><?php echo @$_GET['json'];?></textarea>
    </div>
    <input type="hidden" name="convert" value="CONVERT">
    <input type="submit" value="CONVERT!">
</form>

</div>
</body>

</html>

<?php

if( @$_POST['convert']){
    $xml_array = simplexml_load_string('<xml>'.$_POST['xml'].'</xml>');
    $json = json_encode($xml_array);
    echo $json;
    header('location:E07.php?json='.$json);
}

?>
