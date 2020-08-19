<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInfoRestaurantesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('info_restaurantes', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('idrestaurante');
            $table->string('direccion');
            $table->string('contacto');
            $table->string('horario');
            $table->timestamps();
            $table->foreign('idrestaurante')->references('id')->on('restaurantes')->onDelete('cascade'); 
           
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('info_restaurantes');
    }
}
