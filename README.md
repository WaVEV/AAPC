# AAPC
The AAPC web page


# Para desarrollar.

Si necesitan hacer migraciones me avisan, creo que los modelos son lo suficientemente expresivos para que no se necesite esto (salvo por dos que tengo en mente agregar). 
Las migraciones son faciles de hacer, pero quiero ver si no es algo que ya se ha realizado.
Para crearlas se puede utilizar el siguiente comando (con docker compose)
```sh
docker compose run web python ./manage.py makemigrations
```

## levantar el backend

Pasos:
Levantar el servidor backend: Para esto hay dos opciones

## utilizando docker compose

`docker compose up`

Si queres poner ipdb debugger se logra corriendo el compose de la siguiete manera
```sh
docker compose run --service-ports web
```
 
 ## Utilizando virtualenv 

 - Crear el virtualenv con python3.8
 - instalar los requirements con pip que estan en requirements.txt `pip install -r requirements.txt`
 - [opcional] Configurar la base de datos (Si no están seteadas las variables de entorno se utilizará sqlite)
 - correr `python manage.py runserver`

## Levantar el frontend

Se requiere tener nodejs y npm instalado.
Ingresar en el directorio de cp_ui y correr:
 - [ ] `npm install`
 - [ ] `npm run`

## Información de los directorios.
El front end está estructurado de la siguiente manera: en `src/components` se encuentran las views de la pagina (No se si es el mejor lugar para que vayan esas cosas, soy un desarrollador backend que se anima a escribir front-end)
Ahí tenemos componentes comunes como footer, header, el hero, misc y nabvar; luego hay los componentes views de la app, que son: home, icpcarg, tap y tcarg.
El unico que está parcialmente implementado es tcarg, el home solo realiza una redireccion para tcargs, la idea detras de esto es que el sitio en algun momento maneje todo lo relativo a esas views, digamos icpc, tap, torneo argentino y en el home que es la AAPC.
Habiendo dicho lo anterior podemos decir que el codigo de interes para cambiar está hubicado en el directorio: `src/components/tcarg` donde cuenta con el archivo main `TcArg.js` 

Esta aplicación utiliza react redux y react-router.  Y no se si instalé algo ademas de eso :grimacing:.

## deployar.

Para deployar se necesita tener instalado `make`  y logearse en la pagina: `https://www.pythonanywhere.com/`
Primero hay que crear el zip para que se deploye. Esto se realiza de la siguiente manera.

 1. En el directorio principal correr: `make build-prod`
 2. subir ese zip a pythonanywhere
 3. abrir una consola en pythonanywhere
 4. correr `make deploy-prod BUILD_NAME=<zip file>`
 5. recargar la pagina en: `https://www.pythonanywhere.com/user/WaVEV/webapps/#tab_id_www_pc-arg_com`


