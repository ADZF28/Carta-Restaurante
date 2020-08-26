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
            $table->foreign('idrestaurante')->references('id')->on('restaurantes')->onDelete('cascade'); 
            $table->foreign('idcategoria')->references('id')->on('categorias')->onDelete('cascade'); 
            $table->foreign('idturno')->references('id')->on('turnos')->onDelete('cascade'); 
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
