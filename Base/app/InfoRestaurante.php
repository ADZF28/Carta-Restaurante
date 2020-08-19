<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class InfoRestaurante extends Model
{
    protected $table = 'info_restaurantes';
    protected $primaryKey = 'id';

    protected $fillable = [
        'idrestaurante','direccion','horario','contacto',
    ];
    public function Rrestaurante()
    {
        return $this->belongsTo('App\Restaurante', 'idrestaurante');
    }

}
