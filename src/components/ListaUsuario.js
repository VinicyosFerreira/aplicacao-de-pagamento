import {useState , useEffect} from 'react'
import {Container , Usuario , Imagem , Dados} from '../styles/EstiloUsuario'
import { Botao } from '../styles/EstiloUsuario'
import '../styles/modais.css'
import ModalPagamento from './ModalPagamento'
import ModalRecibo from './ModalRecibo'

function ListaUsuario () {

    const [listaUser , setListaUser] = useState([]);
    const [idUser , setIdUser] = useState();
    const [isOpen , setIsOpen] = useState(false);
    const [ClickUsuarioName , setClickUsuarioName] = useState();
    const [isOpenReceipt , setOpenReceipt] = useState(false);
    const [errorMessage , setErrorMessage] = useState('');

    useEffect (() => {
        obterDados();
    } , [])

    async function obterDados() {
        const api = 'https://www.mocky.io/v2/5d531c4f2e0000620081ddce'
        const resposta = await fetch (api);
        const converterResposta = await resposta.json();
        setListaUser(converterResposta);
    }

    const openModal = (usuario) => {
        setIsOpen(true);
        setClickUsuarioName(usuario.name);
        setIdUser(usuario.id);
    }

    const CloseModal = () =>{
        setIsOpen(false);
    }
   
    const OpenModalReceipt = () => {
         setOpenReceipt(true);
    }

    const CloseModalReceipt = () => {
        setOpenReceipt(false);
    }

  
    return(
     <>
        <Container>
               {listaUser.map((usuario , index) => {
                   return (
                   <Usuario key={'Usuário-' + index}>
                      <Imagem src={usuario.img}></Imagem>
                        <Dados>
                            <div>Nome do Usuario: {usuario.name}</div>
                            <span>ID: {usuario.id} - </span>
                            <span>Username: {usuario.username}</span>
                        </Dados>
                      <Botao onClick = {() => openModal(usuario)}>
                            Pagar
                     </Botao>
                   </Usuario>
                   )
            })}
                <ModalPagamento
                    isOpen = {isOpen}
                    openModal = {openModal}
                    ClickUsuarioName = {ClickUsuarioName}
                    CloseModal = {CloseModal}
                    idUser = {idUser}
                    setErrorMessage = {setErrorMessage}
                    OpenModalReceipt = {OpenModalReceipt}
                />

                <ModalRecibo
                    isOpenReceipt = {isOpenReceipt}
                    CloseModalReceipt = {CloseModalReceipt}
                    errorMessage = {errorMessage}
                />
            </Container>
        </>
    )
}

export default ListaUsuario