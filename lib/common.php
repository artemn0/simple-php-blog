<?php

function generatePasswordHash($password) {
    $symbols = "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v q x y ".
        "z 0 1 2 3 4 5 6 7 8 9";
    $array = explode(" ", $symbols);
    $salt = "";
    for($i = 0; $i < 31; $i++) {
        shuffle($array);
        $salt .= $array[0];
    }
    return "$salt$".substr(hash("sha256", $salt.$password), 0, 32);
}

function checkPasswordHash($userInput, $hash) {
    $data = explode("$", $hash);
    return (substr(hash("sha256", $data[0].$userInput), 0, 32) == $data[1]);
}

function generateToken() {
    $symbols = "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v q x y ".
        "z 0 1 2 3 4 5 6 7 8 9";
    $array = explode(" ", $symbols);
    $token = "";
    for($i = 0; $i < 32; $i++) {
        shuffle($array);
        $token .= $array[0];
    }
    return $token;
}

function mixedMark($string){
    global $script;

    $patterns = array(
        '`\[b\](.+?)\[/b\]`is',
        '`\[i\](.+?)\[/i\]`is',
        '`\[u\](.+?)\[/u\]`is',
        '`\[s\](.+?)\[/s\]`is',
        '`\[img\](.+?)\[/img\]`is',
        '`\[url\](.+?)\[/url\]`is'
        );
    $replaces =  array(
        '<b>\\1</b>',
        '<i>\\1</i>',
        '<span style="border-bottom: 1px solid">\\1</span>',
        '<strike>\\1</strike>',
        '<img src="\\1" alt="image" class="user-image"  />',
        '<a class="link w3-text-theme" href="\\1">\\1</a>'
    );

    $string = preg_replace($patterns, $replaces , htmlspecialchars($string));
    return $string;
}

function formatResult($result) {
    $keys = ['posts', 'newPosts', 'popularPosts'];
    foreach($keys as $key) {
        if(isset($result[$key])) {
            foreach($result[$key] as $k=>$v) {
                $result[$key][$k]['text'] = mixedMark($v['text']);
            }
        }
    }
    return $result;
}
