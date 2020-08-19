<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Restaurante extends Model
{
    protected $table = 'restaurantes';
    protected $primaryKey = 'id';
    
    protected $fillable = [
        'nombre',
    ];
}
