 export function NumerosaLetras(cantidad) {

    var numero = 0;
    cantidad = parseFloat(cantidad);

    if (cantidad === "0.00" || cantidad === "0") {
        return "CERO con 00/100 ";
    } else {
        var ent = cantidad.toString().split(".");
        var arreglo = separar_split(ent[0]);
        var longitud = arreglo.length;

        switch (longitud) {
            case 1:
                numero = unidades(arreglo[0]);
                break;
            case 2:
                numero = decenas(arreglo[0], arreglo[1]);
                break;
            case 3:
                numero = centenas(arreglo[0], arreglo[1], arreglo[2]);
                break;
            case 4:
                numero = unidadesdemillar(arreglo[0], arreglo[1], arreglo[2], arreglo[3]);
                break;
            case 5:
                numero = decenasdemillar(arreglo[0], arreglo[1], arreglo[2], arreglo[3], arreglo[4]);
                break;
            case 6:
                numero = centenasdemillar(arreglo[0], arreglo[1], arreglo[2], arreglo[3], arreglo[4], arreglo[5]);
                break;
        }

        ent[1] = isNaN(ent[1]) ? '00' : ent[1];

        return numero + " con " + ent[1] + "/100";
    }
}

 function unidades(unidad) {
    var unidades = Array('UN ','DOS ','TRES ' ,'CUATRO ','CINCO ','SEIS ','SIETE ','OCHO ','NUEVE ');
   

    return unidades[unidad - 1];
}

 function decenas(decena, unidad) {
    var diez = Array('ONCE ','DOCE ','TRECE ','CATORCE ','QUINCE' ,'DIECISEIS ','DIECISIETE ','DIECIOCHO ','DIECINUEVE ');
    var decenas = Array('DIEZ ','VEINTE ','TREINTA ','CUARENTA ','CINCUENTA ','SESENTA ','SETENTA ','OCHENTA ','NOVENTA ');
    var veinte ="";

    if (decena ===0 && unidad === 0) {
        return "";
    }

    if (decena === 0 && unidad > 0) {
        return unidades(unidad);
    }

    if (decena === 1) {
        if (unidad === 0) {
            return decenas[decena -1];
        } else {
            return diez[unidad -1];
        }
    } else if (decena === 2) {
        if (unidad === 0) {
            return decenas[decena -1];
        }
        else if (unidad === 1) {
            return veinte = "VEINTI" + "UNO";
        } 
        else {
            return veinte = "VEINTI" + unidades(unidad);
        }
    } else {

        if (unidad === 0) {
            return decenas[decena -1] + " ";
        }
        if (unidad === 1) {
            return decenas[decena -1] + " Y " + "UNO";
        }

        return decenas[decena -1] + " Y " + unidades(unidad);
    }
}

 function centenas(centena, decena, unidad) {
    var centenas = Array( "CIENTO ", "DOSCIENTOS ", "TRESCIENTOS ", "CUATROCIENTOS ","QUINIENTOS ","SEISCIENTOS ","SETECIENTOS ", "OCHOCIENTOS ","NOVECIENTOS ");

    if (centena === 0 && decena === 0 && unidad === 0) {
        return "";
    }
    if (centena === 1 && decena === 0 && unidad === 0) {
        return "CIEN ";
    }

    if (centena === 0 && decena === 0 && unidad > 0) {
        return unidades(unidad);
    }

    if (decena === 0 && unidad === 0) {
        return centenas[centena - 1]  +  "" ;
    }

    if (decena === 0) {
        var numero = centenas[centena - 1] + "" + decenas(decena, unidad);
        return numero.replace(" Y ", " ");
    }
    if (centena === 0) {

        return  decenas(decena, unidad);
    }
     
    return centenas[centena - 1]  +  "" + decenas(decena, unidad);
    
}

 function unidadesdemillar(unimill, centena, decena, unidad) {
    var numero = unidades(unimill) + " MIL " + centenas(centena, decena, unidad);
    numero = numero.replace("UN  MIL ", "MIL " );
    if (unidad === 0) {
        return numero.replace(" Y ", " ");
    } else {
        return numero;
    }
}

function decenasdemillar(decemill, unimill, centena, decena, unidad) {
    var numero = decenas(decemill, unimill) + " MIL " + centenas(centena, decena, unidad);
    return numero;
}

function centenasdemillar(centenamill,decemill, unimill, centena, decena, unidad) {

    var numero = 0;
    numero = centenas(centenamill,decemill, unimill) + " MIL " + centenas(centena, decena, unidad);
    
    return numero;
}

function separar_split(texto){
    var contenido = new Array();
    for (var i = 0; i < texto.length; i++) {
        contenido[i] = texto.substr(i,1);
    }
    return contenido;
}

export function zfill(number, width) {

    if (number!=undefined){

    
    var numberOutput = Math.abs(number); /* Valor absoluto del número */
    var length = number.toString().length; /* Largo del número */ 
    var zero = "0"; /* String de cero */  
    
    if (width <= length) {
        if (number < 0) {
             return ("-" + numberOutput.toString()); 
        } else {
             return numberOutput.toString(); 
        }
    } else {
        if (number < 0) {
            return ("-" + (zero.repeat(width - length)) + numberOutput.toString()); 
        } else {
            return ((zero.repeat(width - length)) + numberOutput.toString()); 
        }
    }
    } 
}

export function mathRound2 (num, decimales = 2) {
    //Respuesta de Rubén modificada por mí para el caso general y números negativos
    var exponente = Math.pow(10, decimales);
    return (num >= 0 || -1) * Math.round(Math.abs(num) * exponente) / exponente;
  }


  export function sortByPrice(data, sortval) {
    if (sortval !== "lh" && sortval !== "hl") return data;

    let items = [...data];

    if (sortval === "lh") {
      items.sort((a, b) => a.precio - b.precio);
    } else {
      items.sort((a, b) => b.precio - a.precio);
    }

    return items;
  }