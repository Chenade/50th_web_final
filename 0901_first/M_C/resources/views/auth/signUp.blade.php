<!DOCTYPE HTML5>

<html>


<body>

    <div align="center">

        <h1>{{$title}}</h1>

        <form action="http://127.0.0.1:8000/api/login" method="post">
            <p><input type="text" name="email" id="acc"></p>
            <p><input type="text" name="pwd" id="pwd"></p>

            <p><input type="submit" value="LOGIN"></p>

        </form>

    </div>

</body>

</html>
