<?php


$factory('BuildNigeria\User', [
    //'id' => $faker->randomDigit,
    'email' => $faker->email,
    'name' => $faker->name,
    'fb_id' => $faker->randomNumber(),
    'fb_token' => $faker->text(),
    'avatar' => $faker->url,
    'password' => ''
]);