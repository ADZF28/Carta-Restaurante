<?php

namespace App\Http\Controllers;

use App\InfoRestaurante;
use Illuminate\Http\Request;

class InfoRestauranteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $datos=InfoRestaurante::all();  
        return response()->json(['result'=>$datos]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        
            $Dato=new InfoRestaurante();
            $Dato->idrestaurante=$request->idrestaurante;
            $Dato->direccion=$request->direccion;
            $Dato->horario=$request->horario;
            $Dato->contacto=$request->contacto;
            $Dato->save();

            return response()->json(['mensaje'=>"Datos Guardados.", 'code'=>'201']);
            

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\InfoRestaurante  $infoRestaurante
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $datos=InfoRestaurante::where('idrestaurante', $id)->get(); ;  
        return response()->json(['result'=>$datos]);
    }

    
    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\InfoRestaurante  $infoRestaurante
     * @return \Illuminate\Http\Response
     */
    public function edit(InfoRestaurante $infoRestaurante)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\InfoRestaurante  $infoRestaurante
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $Dato=InfoRestaurante::find($request->id);
        $Dato->idrestaurante=$request->idrestaurante;
        $Dato->direccion=$request->direccion;
        $Dato->horario=$request->horario;
        $Dato->contacto=$request->contacto;
        $Dato->update();

        
        return response()->json(['mensaje'=>"Dato Actualizado.", 'code'=>'201']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\InfoRestaurante  $infoRestaurante
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $datos=InfoRestaurante::where('id', $id)->get()->first();
        $datos->delete();

        
        return response()->json(['mensaje'=>"Dato Eliminado.", 'code'=>'201']);
    }
}
