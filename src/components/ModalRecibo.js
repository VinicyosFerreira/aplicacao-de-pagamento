import Modal from 'react-modal'

function ModalRecibo (props) {
    return (
        <Modal
            isOpen={props.isOpenReceipt} 
            ariaHideApp= {false}
            onrequestClose={props.CloseModalReceipt} 
            contentLabel = "Messagem-do-recibo"
            className = 'modal-receipt'
         >
            <div>
                <button className="close-modal" onClick={props.CloseModalReceipt}>X</button>
                    {props.errorMessage ? (
                        <>
                            <p className='receipt'>Recibo de pagamento</p>
                            <p className="message">O pagamento <span style={{fontWeight : 'bold'}}>{props.errorMessage}</span> foi concluido com sucesso</p>
                        </>
                    ) : (
                        <>
                            <p className='receipt'>Recibo de pagamento</p>
                            <p className="message">O pagamento foi concluido com sucesso</p>
                        </>
                    )} 
            </div>  
        </Modal>
    )
}

export default ModalRecibo