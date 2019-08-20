let ciudad = $("#ciudad");
let buscar = $("#buscar");
let ciudadv = $("#ciudadv");
let descripcion = $("#descripcion");
let temperatura = $("#temperatura");
let latlong = $("#latlong");



class Clima {
   private _lat:number;
   private _lng:number;
   private _temperatura:number;
   private _descripcion: string;
    private _nombre:string;

    get hola(){
        return "";
    }

    getLatLng(){
        return "LATITUD: " + this._lat + ", LONGITUD: "+ this._lng;
    }

    constructor(temp:number, latlng:[number,number], nombre:string, descripcion:string) {
        this._temperatura = temp;   
        [this._lat,this._lng] = latlng;
        this._nombre = nombre;
        this._descripcion = descripcion;
    }
    get temperatura(){
        return (this._temperatura - 273.15);
    }

    get descripcion(){
        return "DESCRIPCIÓN: "+this._descripcion+".";
     }

     get nombre(){
         return "CIUDAD: " + this._nombre+".";
     }

    set temperatura(temp: number){
        if (temp < 0)
        console.log( "erro  r ");
        else
        this._temperatura=temp;
    }
}






let buscarClima = ()=>{
    console.log(ciudad.contents.length);
    if (ciudad.val().toString().trim().length ==0){
        alert("Ingrese nombre de la ciudad");
        return;
    }
        
    let http = new XMLHttpRequest();
    let apiKey = '486017f1ff19a775b2ab831ce7f1cb09';

    let url = 'http://api.openweathermap.org/data/2.5/weather?q='
            +ciudad.val() + 
            '&appid=' + apiKey + '&lang=es';
    //console.log(url);
    http.open('GET',url);
    http.onreadystatechange = ()=> {
        if (http.readyState == XMLHttpRequest.DONE && http.status === 200) {
            let datos = JSON.parse(http.responseText);
            
            let clima = new Clima(datos.main.temp,[datos.coord.lat, datos.coord.lon], ciudad.val().toString(), datos.weather[0].description);
            actualizarDatos(clima);
            
            
            
        }
       
    };
    http.send()

};
 
buscar.click(buscarClima);



let actualizarDatos = (clima:Clima)=>{
    
    ciudadv.html(clima.nombre);
    descripcion.html(clima.descripcion);
    temperatura.html("TEMPERATURA: " + clima.temperatura.toFixed(2) + " c.");
    latlong.html(clima.getLatLng());
};
