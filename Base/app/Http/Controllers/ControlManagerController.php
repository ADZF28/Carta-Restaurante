<?php

namespace App\Http\Controllers;

use App\ControlManager;
use Illuminate\Http\Request;

class ControlManagerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $coment=new ControlManager();
        $coment->idrestaurante=$request->idrestaurante;
        $coment->color1=$request->color1;
        $coment->color2=$request->color2;
        $coment->color3=$request->color3;
        $coment->save();
        return response()->json(['result'=>"Datos guardados", 'code'=>'201']);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\ControlManager  $controlManager
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $datos=ControlManager::where('idrestaurante', $id)->get();  
        return response()->json(['result'=>$datos]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\ControlManager  $controlManager
     * @return \Illuminate\Http\Response
     */
    public function edit(ControlManager $controlManager)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\ControlManager  $controlManager
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $coment=ControlManager::find($request->id);
        $coment->idrestaurante=$request->idrestaurante;
        $coment->color1=$request->color1;
        $coment->color2=$request->color2;
        $coment->color3=$request->color3;
        $coment->update();
        return response()->json(['result'=>"Datos actualizados", 'code'=>'201']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\ControlManager  $controlManager
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $datos=ControlManager::where('idrestaurante', $id)->get()->first();  
        if($datos != null){
            $datos->delete();
            return response()->json(['result'=>"Dato Eliminado", 'code'=>'201']);
        }else
        return response()->json(['result'=>"No se encuentra dato", 'code'=>'201']);
        
    }
}
