<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateVotesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
        Schema::create('votes', function(Blueprint $table)
        {
            $table->increments('id');
            $table->integer('item_id')->unsigned();
            $table->enum('item_type', ['issue', 'solution']);
            $table->enum('vote_type', ['up_vote', 'down_vote']);
            $table->integer('user_id')->unsigned();
            $table->unique(['user_id', 'item_id', 'item_type']);
            $table->timestamps();
        });
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		//
	}

}
