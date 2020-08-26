<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    protected $table = 'productos';
    protected $primaryKey = 'id';

    protected $fillable = [
        'nombre','precio','descripcion','idrestaurante','idcategoria','idturno',
    ];

    public function Rrestaurante()
    {
        return $this->belongsTo('App\Restaurante', 'idrestaurante');
    }
    public function Rcategoria()
    {
        return $this->belongsTo('App\Categoria', 'idcategoria');
    }
    public function Rturno()
    {
        return $this->belongsTo('App\Turno', 'idturno');
    }
}
