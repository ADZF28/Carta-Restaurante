<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('productos', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('idrestaurante');
            $table->unsignedBigInteger('idcategoria');
            $table->unsignedBigInteger('idturno');
            $table->string('nombre');
            $table->float('precio');
            $table->string('descripcion');
            $table->timestamps();
            $table->foreign('idrestaurante')->references('id')->on('restaurantes'); 
            $table->foreign('idcategoria')->references('id')->on('categorias'); 
            $table->foreign('idturno')->references('id')->on('turnos'); 
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('productos');
    }
}
