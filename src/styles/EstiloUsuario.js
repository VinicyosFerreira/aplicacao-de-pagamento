import styled  from 'styled-components'

export const Container = styled.div`
     display : flex;
     flex-direction : column;
     height : 100%;
     margin : 0px;
     padding : 0px;
`
export const Usuario = styled.div `
     display : flex;
     border-bottom : 1px solid white;
     align-items : center;
     background-color: #343754;
     height : 140px;
`
export const Imagem = styled.img `
     border-radius : 40px;
     width : 80px;
     height : 80px;
     margin-left : 30px;
     margin-right : 10px;
`
export const Dados = styled.div `
     display : column;
     width : 83%;
     color : white;
     font-weight : 500;
`

export const Botao = styled.button `
     font-size : 1.4em;
     padding : 5px;
`
