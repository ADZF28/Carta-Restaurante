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
        $target_dir=public_path().'/Imagenes/';
        $target_file=$target_dir . basename($_FILES["file"]["name"]);
        $uploadOk= 1;
        $imageFileType=pathinfo($target_file,PATHINFO_EXTENSION);
        $check=getimagesize($_FILES["file"]["tmp_name"]);

        if($check !== false){
            $uploadOk= 1;
            if(move_uploaded_file($_FILES["file"]["tmp_name"],$target_file)){

                $Dato=new Image();
                $Dato->ruta=basename( $_FILES["file"]["name"]);
                $Dato->modelo=$request->modelo;
                $Dato->idmodelo=$request->idmodelo;
                $Dato->save();

                return response()->json(['mensaje'=>"Imagen guardada.", 'code'=>'201']);
            }else{

                return response()->json(['mensaje'=>"Error al subir imagen.", 'code'=>'201']);
                $uploadOk= 0;
            }
        }
                

        
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Image  $image
     * @return \Illuminate\Http\Response
     */
    public function show($id ,$modelo)
    {
        $datos=Image::where('idmodelo',$id)->where('modelo',$modelo)->get()->first();  
        return response()->json(['result'=>$datos]);
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
    public function destroy($id)
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
