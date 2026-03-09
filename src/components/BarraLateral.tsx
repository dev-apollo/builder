import type { Dispatch, SetStateAction } from "react"
import "../assets/css/BarraLateral.css"
import type IInformacoes from "../interfaces/IInformacoes"
import FormInformacoes from "./FormInformacoes"
import FormCustomizacoes from "./FormCustomizacoes"
import type ICustomizacoes from "../interfaces/ICustomizacoes"

interface BarraLateralProps {
    informacoes: IInformacoes
    setInformacoes: Dispatch<SetStateAction<IInformacoes>>
    customizacoes: ICustomizacoes
    setCustomizacoes: Dispatch<SetStateAction<ICustomizacoes>>
}

function BarraLateral({ informacoes, setInformacoes, customizacoes, setCustomizacoes }: BarraLateralProps) {
    return (
            <>
                <FormInformacoes informacoes={informacoes} setInformacoes={setInformacoes}/>
                <FormCustomizacoes customizacoes={customizacoes} setCustomizacoes={setCustomizacoes}/>
            </>
    )
}

export default BarraLateral