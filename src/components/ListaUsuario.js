import {useState , useEffect} from 'react'
import {Container , Usuario , Imagem , Dados , Botao} from '../styles/EstiloUsuario'
import Modal from 'react-modal'
import '../styles/modais.css'

function ListaUsuario () {

    let cards = [
        //valid card
        {
          card_number: '1111111111111111',
          cvv: 789,
          expiry_date: '01/18',
        },
        // invalid card
        {
          card_number: '4111111111111234',
          cvv: 123,
          expiry_date: '01/20',
    }]
      
    const [listaUser , setListaUser] = useState([]);
    const [valor , setValor] = useState();
    const [selected , setSelected] = useState(1);
    const [isOpen , setIsOpen] = useState(false);
    const [ClickUsuarioName , setClickUsuarioName] = useState();
    const [idUser , setIdUser] = useState();
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

    function OpenModal (usuario) {
        setIsOpen(true);
        setClickUsuarioName(usuario.name);
        setIdUser(usuario.id);
    }

    function CloseModal () {
        setIsOpen(false);
    }

    function OpenModalReceipt(){
        setOpenReceipt(true);
    }

    function CloseModalReceipt(){
        setOpenReceipt(false);
    }


    function handleSubmit (event) {
        event.preventDefault();
        CloseModal();

        const DataSubmit = {
            cardNumber : cards[selected].card_number , 
            cvv : cards[selected].cvv , 
            expiry_date : cards[selected].expiry_date ,
            moneyValue : valor , 
            destination_userId: idUser
        };
       

        fetch ('https://run.mocky.io/v3/533cd5d7-63d3-4488-bf8d-4bb8c751c989' , {
            method : 'POST',
            headers : {
                "Content-Type": "application/json"
            } , 
            body: JSON.stringify(DataSubmit)
        })

        .then(res => {
            return res.json()
         })

        .then(DataSubmit => {
            if (cards[selected].card_number === '1111111111111111') {
                setErrorMessage('')
                OpenModalReceipt()
            } else {
                setErrorMessage('não')
                OpenModalReceipt()
            }
        })

        .catch(err => {
            console.log(err)
        })
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
                      <Botao onClick={() => {OpenModal(usuario)}}>
                        Pagar
                     </Botao>
                   </Usuario>
                   )
               })}
             <Modal 
                isOpen={isOpen} 
                ariaHideApp= {false}
                onrequestClose={CloseModal} 
                contentLabel = "Modal de pagamento"
                className = 'modal-pagamento'>
                    <button className='close-modal' onClick={CloseModal}>X</button>
                        <form 
                            methdod="post" 
                            action="https://run.mocky.io/v3/533cd5d7-63d3-4488-bf8d-4bb8c751c989"
                            onSubmit={handleSubmit}
                        >
                            <div className='user-name'>
                                <span>Pagamento para <span style={{color : '#d1da59'}}>{ClickUsuarioName}</span></span>
                            </div>
                            <input
                            
                            type="text"
                            placeholder="R$0,00"
                            name="nomeUsusario"
                            onChange={(e) => 
                               setValor(e.target.value)
                            }
                            />
                            <select name='cartaoSelecionado' 
                            required 
                            defaultValue={selected}
                            onChange={(e) => setSelected(e.target.value)
                            }>
                                <option value={1}>Cartão com final 1234</option>
                                <option value={0}>Cartão com final 1111</option>
                            </select>
                            <button type="submit" className='modal-pay'>Pagar</button>
                        </form>
                </Modal>

                <Modal
                 isOpen={isOpenReceipt} 
                 ariaHideApp= {false}
                 onrequestClose={CloseModalReceipt} 
                 contentLabel = "Messagem-do-recibo"
                 className = 'modal-receipt'
                >
                <div>
                    <button className="close-modal" onClick={CloseModalReceipt}>X</button>
                   
                        {errorMessage ? (
                            <>
                                <p className='receipt'>Recibo de pagamento</p>
                                <p className="message">O pagamento <span style={{fontWeight : 'bold'}}>{errorMessage}</span> foi concluido com sucesso</p>
                            </>
                        ) : (
                            <>
                                <p className='receipt'>Recibo de pagamento</p>
                                <p className="message">O pagamento foi concluido com sucesso</p>
                            </>
                        )} 
                </div>  

                </Modal>
            </Container>
        </>
    )
}

export default ListaUsuario