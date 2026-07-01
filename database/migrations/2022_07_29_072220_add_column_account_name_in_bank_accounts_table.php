<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnAccountNameInBankAccountsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // ponytail: skip if bank_accounts table doesn't exist (legacy module removed)
        if (!Schema::hasTable('bank_accounts')) {
            return;
        }
        if (!Schema::hasColumn('bank_accounts', 'account_name')) {
            Schema::table('bank_accounts', function (Blueprint $table) {
                $table->string('account_name')->after('account_number');
            });
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('bank_accounts', function (Blueprint $table) {
            //
        });
    }
}
