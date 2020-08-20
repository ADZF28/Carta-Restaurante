<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ControlManager extends Model
{
    protected $table = 'control_managers';
    protected $primaryKey = 'id';

    protected $fillable = [
        'idrestaurante','color1','color2','color3',
    ];
    
    public function Rrestaurante()
    {
        return $this->belongsTo('App\Restaurante', 'idrestaurante');
    }
}
