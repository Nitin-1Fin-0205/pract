<?php
$url = "http://demo.casinocontroller.com/hylosoft/engine/EmbedGame/EmbedGame.php?gameid=1405&playerid=clv5s5guj000muzcrttb54gc0&sessionid=dwkuvw64qqutt1sb683k&returnUrl=%2F&lang=en&mode=embedded";

$options = [
    'http' => [
        'method' => "GET",
        'header' => "X-Brand-ID: 461\r\n" .
                    "X-Signature: ZHgjHjtQt3j6WpvP4Tldgcy4XhY3GQ4v\r\n" .
                    "X-API-Version: 3\r\n"
    ]
];

$context = stream_context_create($options);
$response = file_get_contents($url, false, $context);

echo $response;
?>