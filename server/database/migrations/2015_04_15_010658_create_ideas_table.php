<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateIdeasTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('ideas', function(Blueprint $table)
		{
			$table->increments('id');
          	$table->integer('user_id');
			$table->mediumText('problem');
			$table->text('solution');
			$table->integer('up_vote')->default(0);
			$table->integer('down_vote')->default(0);
			$table->integer('views')->default(0);
            $table->timestamps();
            $table->softDeletes();

        });
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('ideas');
	}

}
