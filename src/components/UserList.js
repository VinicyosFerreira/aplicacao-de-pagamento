import {useState , useEffect} from 'react'
import {Container , User , Image , Data} from '../styles/StyleUsers'
import { Button } from '../styles/StyleUsers'
import '../styles/modais.css'
import PaymentModal from './PaymentModal'
import ReceiptModal from './ReceiptModal'

function UserList () {

    const [userList , setUserList] = useState([]);
    const [idUser , setIdUser] = useState();
    const [isOpen , setIsOpen] = useState(false);
    const [ClickUsuarioName , setClickUsuarioName] = useState();
    const [isOpenReceipt , setOpenReceipt] = useState(false);
    const [errorMessage , setErrorMessage] = useState('');

    useEffect (() => {
        fetchData();
    } , [])

    async function fetchData() {
        const api = 'https://www.mocky.io/v2/5d531c4f2e0000620081ddce'
        const response = await fetch (api);
        const responseToJson = await response.json();
        setUserList(responseToJson);
    }

    const openModal = (user) => {
        setIsOpen(true);
        setClickUsuarioName(user.name);
        setIdUser(user.id);
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
               {userList.map((user , index) => {
                   return (
                   <User key={'Usuário-' + index}>
                      <Image src={user.img}></Image>
                        <Data>
                            <div>Nome do Usuario: {user.name}</div>
                            <span>ID: {user.id} - </span>
                            <span>Username: {user.username}</span>
                        </Data>
                      <Button onClick = {() => openModal(user)}>
                            Pagar
                     </Button>
                   </User>
                   )
            })}
                <PaymentModal
                    isOpen = {isOpen}
                    openModal = {openModal}
                    ClickUsuarioName = {ClickUsuarioName}
                    CloseModal = {CloseModal}
                    idUser = {idUser}
                    setErrorMessage = {setErrorMessage}
                    OpenModalReceipt = {OpenModalReceipt}
                />

                <ReceiptModal
                    isOpenReceipt = {isOpenReceipt}
                    CloseModalReceipt = {CloseModalReceipt}
                    errorMessage = {errorMessage}
                />
            </Container>
        </>
    )
}

export default UserList