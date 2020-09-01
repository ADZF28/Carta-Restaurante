<?php

namespace App\Http\Controllers;

use App\Restaurante;
use Illuminate\Http\Request;

class RestauranteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $datos=Restaurante::all();  
        return response()->json(['result'=>$datos]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $datos=Restaurante::all();  
        return response()->json(['result'=>$datos]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {   
        $recuperar=Restaurante::where('nombre', $request->nombre)->get()->first();
        if($recuperar!=null){
            return response()->json(['resul'=>'Este correo ya se encuentra registrado','code'=>'201']);
        }else{
            $Dato=new Restaurante();
            $Dato->nombre=$request->nombre;
            $Dato->save();
            return response()->json(['mensaje'=>"Dato Guardado.", 'code'=>'200']);
        }

            

            
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Restaurante  $restaurante
     * @return \Illuminate\Http\Response
     */
    public function show($nombre)
    {
        $datos=Restaurante::where('nombre',$nombre)->get()->first();  
        return response()->json(['result'=>$datos]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Restaurante  $restaurante
     * @return \Illuminate\Http\Response
     */
    public function edit(Restaurante $restaurante)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Restaurante  $restaurante
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $Dato=Restaurante::find($request->id);
        $Dato->nombre=$request->nombre;
        $Dato->update();

        return response()->json(['mensaje'=>"Datos actualizados", 'code'=>'201']);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Restaurante  $restaurante
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $datos=Restaurante::find($id);
        $datos->delete();

        
        return response()->json(['mensaje'=>"Dato Eliminado.", 'code'=>'201']);
    }
}
