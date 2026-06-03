import { useState, useRef } from "react"
import { Button, Modal, Form } from "react-bootstrap"
import { Cropper, type ReactCropperElement } from "react-cropper"
import type CropperJS from "cropperjs"
import "cropperjs/dist/cropper.css"
import type { Dispatch, SetStateAction } from "react"
import type IInformacoes from "../interfaces/IInformacoes"

interface Props {
    informacoes: IInformacoes;
    setInformacoes: Dispatch<SetStateAction<IInformacoes>>;
}

function ModalCropper({ informacoes, setInformacoes }: Props) {
    const [show, setShow] = useState(false)
    const [imagemSrc, setImagemSrc] = useState("")
    const [cropper, setCropper] = useState<CropperJS>()
    const cropperRef = useRef<ReactCropperElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            if (imagemSrc) URL.revokeObjectURL(imagemSrc)
            setImagemSrc(URL.createObjectURL(file))
            setShow(true)
        }
    }

    const handleConfirm = () => {
        if (cropper) {
            const recortada = cropper.getCroppedCanvas().toDataURL()
            setInformacoes((anterior) => ({ ...anterior, foto: recortada }))
        }
        if (imagemSrc) URL.revokeObjectURL(imagemSrc)
        setShow(false)
        if (inputRef.current) inputRef.current.value = ""
    }

    const handleRemover = () => {
        setInformacoes((anterior) => ({ ...anterior, foto: "" }))
        if (imagemSrc) URL.revokeObjectURL(imagemSrc)
        setImagemSrc("")
        setShow(false)
        if (inputRef.current) inputRef.current.value = ""
    }

    return (
        <>
            <Form.Control ref={inputRef} type="file" accept="image/*" onChange={handleFileChange} />
            <Button className="my-2" variant="outline-secondary" onClick={handleRemover}>
                Remover foto
            </Button>

            <Modal show={show} onHide={() => setShow(false)} size="lg" centered backdrop="static" keyboard={false}>
                <Modal.Header>
                    <Modal.Title>Recortar imagem</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {imagemSrc && (
                        <Cropper
                            ref={cropperRef}
                            src={imagemSrc}
                            style={{ height: "400px", width: "100%" }}
                            aspectRatio={1}
                            initialAspectRatio={1}
                            viewMode={1}
                            background={false}
                            responsive
                            autoCropArea={1}
                            guides
                            onInitialized={(instance) => setCropper(instance)}
                        />
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>Cancelar</Button>
                    <Button variant="success" onClick={handleConfirm}>Confirmar</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalCropper
