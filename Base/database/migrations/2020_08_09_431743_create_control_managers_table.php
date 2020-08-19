<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateControlManagersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('control_managers', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('idrestaurante');
            $table->string('color1');
            $table->string('color2');
            $table->string('color3');
            $table->timestamps();
            $table->foreign('idrestaurante')->references('id')->on('restaurantes'); 
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('control_managers');
    }
}
