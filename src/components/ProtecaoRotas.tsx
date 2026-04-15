import { Navigate } from "react-router";

function ProtecaoRotas({children}: any){
    const objeto = localStorage.getItem("usuario");
    if(objeto){
        try{
            const usuario = JSON.parse(objeto);
            if(usuario.token && usuario.token !== ""){
                return children;
            }
        }catch(erro){
            console.error("Erro ao acessar o localStorage: ", erro);
        }
    }
    return <Navigate to="/login"/>
}

export default ProtecaoRotas