<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToSolutionsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('solutions', function(Blueprint $table)
		{
			$table->foreign('user_id', 'fk_solution_user')->references('id')->on('users')->onUpdate('NO ACTION')->onDelete('NO ACTION');
			$table->foreign('id', 'fk_solution_issue')->references('id')->on('issues')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('solutions', function(Blueprint $table)
		{
			$table->dropForeign('fk_solution_user');
			$table->dropForeign('fk_solution_issue');
		});
	}

}
