# WebAugmentedExtension
## TPFinal OO2

Teniendo en cuenta que se trata de diferentes buscadores, se decidió implementar el patron de diseño Template Method, basándonos en la existencia de varios tipos de buscadores web.
La clase padre SearchEngine compila los métodos y atributos comunes a todos los diferentes buscadores que son representados como clases hijas.

## Algunos métodos implementados en la case SearchEngine
## (privado) <<abstracto>> createResultFrom(anHTMLElement:HTMLElement):Result
	crea un objeto Result a partir de un resultado obtenido del DOM.
	Este método es abstracto porque cada subclase tiene una forma diferente de obtener el texto y el target URL.

## createIconsDiv()
	al lado de cada resultado de la búsqueda crea un div al que posteriormente se le agrega las burbujas correspondiente para cada buscador y su número de posición.

## showUI()
	mostrar la imagen/burbuja propia del buscador y además agregar sus propios resultados al  mashup en la posición correcta.

## isMyEngine():Boolean
	devuelve true or false. Envalúa si la búsqueda actual se está haciendo en el buscador que corresponde a su atributo hostName. 

## retrieveNews(aDiv:HTMLElement, aButton:HTMLElement)
	este método se encarga de agregarle el número de posición a cada imagen o burbuja, por cada resultado. Se reemplazaron los comandos que obtenían el número de posición con un método. 

## getResultNumber(aCollection:HTMLElement[], targetURL:String):Number
	Este método obtiene los elementos HTML que fueron seleccionados por el nombre de clase, y se busca si alguno coincide con el targetURL, de esta forma se puede decir que el targetURL está en la lista y además la posición, ésta última es devuelta.

## getQueryString():String
	Devuelve lo que el usuario consultó en el buscador. Este método se utiliza en el armado del mashup, reemplazando el comando se hizo más fácil y entendible realizar la consulta para cada objeto buscador.
	
## Diferencias entre addToMashup y addOwnMashup
El método addToMashUp es usado por el objeto correspondiente al buscador actual, y va a agregar al mashup los resultados que están ya se encuentran cargados.
En contraste, addOwnMashup es un método que utilizan los buscadores alternativos, usando el string que devuelve getQueryString para obtener sus propios resultados y agregarlos al mashup en la posición correspondiente. 

# Habilitando los tests
Se pueden incluir los archivos javascript en el directorio 'tests' al manifest, correspondientes a los tests de cada clase, recordando que el archivo 'SearchEngine.js' correspondiente a la clase SearchEngine debe ser referenciado primero.
Los resultados de los tests son imprimidos en la consola del explorador.