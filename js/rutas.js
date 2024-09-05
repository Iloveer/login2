
function rutas(ruta){
    let path=window.location.hash.substring(1);
    console.log(path);
    if(path=='/admin'){

    }
    if(path=='/inicio'){
        console.log("/inicio");
        renderInicio()
    }
    if(path=='/usuario'){
        console.log("/usuario");
        renderUsuario()
    }
    if(path=='/docente'){
        console.log("/docente");
    }
    if(path=='/roles'){
        console.log("/roles");
    }
}
window.addEventListener('hashchange',(e)=>{
    rutas(e)
})
$(document).ready(()=>{
    rutas('')
})