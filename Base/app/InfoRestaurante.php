<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class InfoRestaurante extends Model
{
    protected $fillable = [
        'idrestaurante','direccion','horario','contacto',
    ];
}
