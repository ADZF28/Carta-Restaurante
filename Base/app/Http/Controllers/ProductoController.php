<?php

namespace App\Http\Controllers;

use App\Producto;
use Illuminate\Http\Request;

class ProductoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $datos=Producto::all();  
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
        $datos=new Producto();
        $datos->nombre=$request->nombre;
        $datos->precio=$request->precio;
        $datos->descripcion=$request->descripcion;
        $datos->idrestaurante=$request->idrestaurante;
        $datos->idcategoria=$request->idcategoria;
        $datos->idturno=$request->idturno;
        $datos->save();
        return response()->json(['result'=>"Datos guardados", 'code'=>'201']);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Producto  $producto
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $datos=Producto::where('idrestaurante', $id)->get();  
        return response()->json(['result'=>$datos]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Producto  $producto
     * @return \Illuminate\Http\Response
     */
    public function edit(Producto $producto)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Producto  $producto
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {

        $datos=Producto::where('id', $id)->get()->first(); 
        $datos->nombre=$request->nombre;
        $datos->precio=$request->precio;
        $datos->descripcion=$request->descripcion;
        $datos->idrestaurante=$request->idrestaurante;
        $datos->idcategoria=$request->idcategoria;
        $datos->idturno=$request->idturno;
        $datos->update();
        
        return response()->json(['mensaje'=>"Dato Actualizado.", 'code'=>'201']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Producto  $producto
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $datos=Producto::where('id', $id)->get()->first();  
        if($datos != null){
            $datos->delete();
            return response()->json(['result'=>"Dato Eliminado", 'code'=>'201']);
        }else
        return response()->json(['result'=>"No se encuentran datos", 'code'=>'202']);
    }



}
