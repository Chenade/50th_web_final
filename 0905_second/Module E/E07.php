<!doctype HTML5>
<html>

<head>
    <style>

    </style>
</head>

<body>

<div style="display:flex; flex-direction:row">
    <form action="E07.php" method="POST">
        <textarea name="xml" style="width:300px; height:300px;"></textarea>
        <textarea name="json" style="width:300px; height:300px;"> <?php echo @$_GET['json']; ?> </textarea>
        <input type="hidden" name="sent">

        <input type="submit" value="convert">
    </form>
</div>


</body>

</html>

<?php

    if( @$_POST['sent'] ){

        echo '<script>alert("123");</script>';

        $xml = simplexml_load_string($_POST['xml']);
        $json = json_encode($xml);
        header('location:E07.php?json=' . $json);

    }



?>