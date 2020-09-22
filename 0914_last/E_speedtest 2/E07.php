<?php

if(@$_POST['convert'] == 'convert'){
    $xml = simplexml_load_string($_POST['xml']);
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
            width: 300px;
            height: 300px;
        }
    </style>
</head>
<body>

<div style="display: flex; flex-direction: row"></div>

<form action="E07_3.php" method="post">
    <textarea name="xml"><?php echo @$_POST['xml'];?></textarea>
    <textarea name="json"><?php echo @$json;?></textarea>
    <input type="hidden" name="convert" value="convert">

    <input type="submit">
</form>
</body>
</html>