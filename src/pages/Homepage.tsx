import { useEffect, useState } from "react"
import Cabecalho from "../components/Cabecalho";
import { Link } from "react-router";

function Homepage(){
    const [user, setUser] = useState({_id: "", nome: "", email:""});

    useEffect(() => {
        const localUser = localStorage.getItem("usuario");
        try{
            if(localUser){
                const jsonUser = JSON.parse(localUser);
                setUser(jsonUser.usuario);
            }else{
                setUser({_id: "invalido", nome: "usuario", email: "email@exemplo.com"});
            }
        }catch(erro){
            console.error(erro)
        }
    }, [

    ]);
    return(
        <>
            <Cabecalho></Cabecalho>
            <h1>Seja bem-vindo(a) {user.nome}!</h1>
            <Link to={"/"}>Criar assinatura</Link>
        </>
    )
}

export default Homepage