<?php

namespace App\Http\Controllers;

use App\Image;
use Illuminate\Http\Request;

class ImageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //$datos=Image::all();  
        //return response()->json(['result'=>$datos]);
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
        $Dato=new Image();
        $Dato->ruta=$request->ruta;
        $Dato->modelo=$request->modelo;
        $Dato->idmodelo=$request->idmodelo;
        $Dato->save();

        return response()->json(['mensaje'=>"Datos Guardados.", 'code'=>'201']);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Image  $image
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Image  $image
     * @return \Illuminate\Http\Response
     */
    public function edit(Image $image)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Image  $image
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
       $Dato=Image::find($request->id);
        $Dato->ruta=$request->ruta;
        $Dato->modelo=$request->modelo;
        $Dato->idmodelo=$request->idmodelo;
        $Dato->update();

        return response()->json(['mensaje'=>"Datos Actualizados.", 'code'=>'201']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Image  $image
     * @return \Illuminate\Http\Response
     */
    public function destroy(Image $image)
    {
        $datos=Image::find($id);
        $datos->delete();

        
        return response()->json(['mensaje'=>"Datos Eliminados.", 'code'=>'201']);
    }

    public function BuscarImagen($id, $modelo)
    {
        $datos=Image::where('modelo', $modelo)->where('idmodelo', $id)->get();  
        return response()->json(['result'=>$datos]);
    }
}
