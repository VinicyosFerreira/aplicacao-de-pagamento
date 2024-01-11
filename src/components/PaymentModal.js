import Modal from 'react-modal'
import {useState} from 'react'
import { valueValidate , mask } from './Mask';

function PaymentModal (props) {

    const [valor , setValor] = useState();
    const [selected , setSelected] = useState(1);

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
      

    const handleSubmit = (event) => {
        event.preventDefault();
        props.CloseModal();

        const DataSubmit = {
            cardNumber : cards[selected].card_number , 
            cvv : cards[selected].cvv , 
            expiry_date : cards[selected].expiry_date ,
            moneyValue : valor , 
            destination_userId: props.idUser
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
                props.setErrorMessage('')
                props.OpenModalReceipt()
            } else {
                props.setErrorMessage('não')
                props.OpenModalReceipt()
            }
        })

        .catch(err => {
            console.log(err)
        })
    } 
    
    
   
    return (
    <Modal
        isOpen={props.isOpen} 
        ariaHideApp= {false}
        onrequestClose={props.CloseModal} 
        contentLabel = "Modal de pagamento"
        className = 'payment-modal'
    >
    <button className='close-modal' onClick={props.CloseModal}>X</button>
        <form 
            methdod="post" 
            action="https://run.mocky.io/v3/533cd5d7-63d3-4488-bf8d-4bb8c751c989"
            onSubmit = {handleSubmit}
        >
            <div className='user-name'>
                <span>Pagamento para <span style={{color : '#d1da59'}}>{props.ClickUsuarioName}</span></span>
            </div>
            <input
                type="text"
                placeholder="R$0,00"
                name="nomeUsusario"
                required
                onKeyUp={mask}
                onKeyDown={valueValidate}
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
  )
}

export default PaymentModal