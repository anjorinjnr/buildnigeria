<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateIdeaCategoriesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('idea_categories', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('idea_id')->unsigned()->index('fk_idea_category_idx');
			$table->integer('category_id')->unsigned()->index('fk_category_idea_idx');
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
		Schema::drop('idea_categories');
	}

}
