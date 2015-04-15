<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToIdeaCategoriesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('idea_categories', function(Blueprint $table)
		{
			$table->foreign('category_id', 'fk_category_idea')->references('id')->on('categories')->onUpdate('NO ACTION')->onDelete('NO ACTION');
			$table->foreign('idea_id', 'fk_idea_category')->references('id')->on('ideas')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('idea_categories', function(Blueprint $table)
		{
			$table->dropForeign('fk_category_idea');
			$table->dropForeign('fk_idea_category');
		});
	}

}
