<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>http://kurs.lavrik.web-verstka.local</title>
    <style>
        html, body{
            margin: 0;
            background: #5c5c5c;
        }
        img {
            max-width: 100%;
            height: auto;
        }
        h3 {
            margin: 10px 10px 10px 10px;
        }
        .wrapper {
            padding: 15px;
        }
        .row {
            border: 1px solid #000;
        }
        .relation {
            position: relative;
        }
        .relation__offset{
            padding-top: 56.25%; /* 9:16 */
            height: 0;
        }
        .relation__content {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
        }
        .big {
            background: #333;
        }
        .item-1 {
            background: #d48013;
        }
        .item-2 {
            background: #d22007;
        }
        .item-3 {
            background: #0b8b97;
        }
        .item-4 {
            background: #710678;
        }

        /* flex 02-07-01 */
        .relation__content {
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
        }
        .big {
            flex-basis: 100%;
            width: 40%;
        }
        .small {
            flex-basis: 50%;
            width: 30%;
        }
        .item-1, .item-2 {
            order: -1;
        }
        @media screen and (max-width: 900px) {
            .relation__offset {
                padding-top: 100%;
            }
            .relation__content {

            }
            .small {
                flex-basis: 25%;
                order: 1;
            }
            .big {
                width: 70%;
            }
        }
        @media screen and (max-width: 500px) {
            .relation__content {
                display: block;
                position: static;
                top: 0;
            }
            .relation__offset {
                display: none;
            }
            .small {
                width: auto;
            }
            .big {
                width: auto;
            }
        }

        /* пропорции */
        /*
        .small {
            width: 31%;
            flex: 0 1 40%;
        }
        .big {
            flex-basis: 80%;
            width: 38%;
        }
        .relation__offset{
            padding-top: 56.25%;
        }
        */

    </style>
</head>
<body>
    <h3>02-05-06-07</h3>

    <section>
        <div class="wrapper">
            <div class="row relation">
                <div class="relation__offset"></div>
                <div class="relation__content">
                    <div class="big">0</div>
                    <div class="small item-1">1</div>
                    <div class="small item-2">2</div>
                    <div class="small item-3">3</div>
                    <div class="small item-4">4</div>
                </div>
            </div>
        </div>
    </section>

</body>
</html>