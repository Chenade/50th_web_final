
<?php

if(@$_POST['convert'] == 'convert'){

    $xml = simplexml_load_string( '<xml>' . $_POST['xml'] .'</xml>' );
    $json = json_encode($xml);

}

?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>E07</title>
    <style>
        textarea{
            width:300px;
            height:300px;
        }
    </style>
</head>
<body>
<div style="display: flex; flex-direction: row;">

    <form action="E07_2.php" method="post">

        <textarea name="xml"><?php echo @$_POST['xml']; ?></textarea>
        <textarea name="json"><?php echo @$json; ?></textarea>
        <input type="hidden" name="convert" value='convert'>

        <input type="submit">

    </form>

</div>
</body>
</html>
