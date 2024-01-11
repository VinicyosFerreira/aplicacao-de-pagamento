const valueValidate = (e) => {
    if (
             '0123456789'.indexOf(e.key) === -1 &&
              e.key !== 'Backspace' &&
              e.key !== 'Alt' &&
              e.key !== 'Ctrl'
    ) {
             e.preventDefault()
    }

}
    
const mask = (e) => {
         var valor = e.target.value.replace(/\D/g , '');
         valor = (valor / 100).toFixed(2) + ''; 
         valor = valor.replace('.' , ',');
         valor = valor.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
         e.target.value = 'R$ ' + valor;
 }

 export {valueValidate , mask}