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

$factory('BuildNigeria\Issue', [
    //'id' => $faker->randomDigit,
    'user_id' => 'factory:BuildNigeria\User',
    'detail' => $faker->paragraphs(),
]);

$factory('BuildNigeria\Category', [
    //'id' => $faker->randomDigit,
    'category' => $faker->word
]);