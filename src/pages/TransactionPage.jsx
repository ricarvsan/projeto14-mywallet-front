import axios from "axios";
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components"
import { UserContext } from "../contexts/UserContext";

export default function TransactionsPage() {

  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');
  const {user} = useContext(UserContext);
  const [status, setStatus] = useState(false)
  const navigate = useNavigate();
  const params = useParams();

  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  }

  function addTransaction(e) {
    e.preventDefault();
    let floatValue = Number(value).toFixed(2);
    
    axios.post(`${import.meta.env.VITE_API_URL}/nova-transacao`, {type: params.tipo, value: floatValue, description}, config)
      .then(() => navigate('/home'))
      .catch(error => alert(error.response.data));
  }

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/logged`, config)
      .then(r => setStatus(true))
      .catch(() => navigate('/'));

    
  }, []);

  if(status) {
    return (
      <TransactionsContainer>
        <h1>Nova TRANSAÇÃO</h1>
        <form onSubmit={addTransaction}>
          <input data-test='registry-amount-input' value={value} onChange={e => setValue(e.target.value)} placeholder="Valor" type="number" min='0.01' step='0.01' required/>
          <input data-test='registry-name-input' value={description} onChange={e => setDescription(e.target.value)} placeholder="Descrição" type="text" required/>
          <button data-test='registry-save' type="submit">Salvar TRANSAÇÃO</button>
        </form>
      </TransactionsContainer>
    )
  } else {
    return (
      <>
        Não autorizado!
      </>
    )
  }

  
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
