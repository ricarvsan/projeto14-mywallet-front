import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function HomePage() {
  const [itensList, setItensList] = useState(undefined);
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [status, setStatus] = useState(undefined);
  const [soma, setSoma] = useState(0);

  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  }

  function logout() {
    axios.post(`${import.meta.env.VITE_API_URL}/logout`, {}, config)
      .then(() => {
        navigate('/')
      })
      .catch(err => console.log(err.response.data))
  }

  function add() {
    navigate('/nova-transacao/entrada');
  }

  function sub() {
    navigate('/nova-transacao/saida');
  }

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/logged`, config)
      .then(r => setStatus(true))
      .catch(() => navigate('/'));


    axios.get(`${import.meta.env.VITE_API_URL}/transacoes`, config)
      .then(resp => {
        setItensList(resp.data);
        console.log(resp.data)
        let newSoma = 0;
        resp.data.forEach(item => {
          (item.type === 'entrada') ? newSoma+= Number(item.value) : newSoma-= Number(item.value)
        })
        setSoma(newSoma.toFixed(2))        
      })
      .catch(() => navigate('/'));

  }, []);

  if (itensList) {
    return (
      <HomeContainer>
        <Header>
          <h1 data-test='user-name'>Olá, {user.name}</h1>
          <BiExit onClick={logout} data-test='logout' />
        </Header>

        <TransactionsContainer>
          <ul>
            {itensList.map(item => (
              <Item key={item._id} date={item.date} value={item.value} description={item.description} type={item.type}/>
            ))}
          </ul>

          <article>
            <strong>Saldo</strong>
            <Value data-test='total-amount' color={soma >= 0 ? 'positivo' : 'negativo'}>{soma}</Value>
          </article>
        </TransactionsContainer>


        <ButtonsContainer>
          <button data-test='new-income' onClick={add}>
            <AiOutlinePlusCircle />
            <p>Nova <br /> entrada</p>
          </button>
          <button data-test='new-expense' onClick={sub}>
            <AiOutlineMinusCircle />
            <p>Nova <br />saída</p>
          </button>
        </ButtonsContainer>

      </HomeContainer>
    )
  } else {
    return (
      <>
        Não autorizado!
      </>
    )
  }
}

function Item({date, value, description, type}) {
  
  return (
      <ListItemContainer>
          <div>
              <span>{date}</span>
              <strong data-test='registry-name'>{description}</strong>
          </div>
          <Value data-test='registry-amount' color={(type === 'entrada') ? 'positivo' : 'negativo'}>{value.replace('.', ',')}</Value>
      </ListItemContainer>
  );
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: scroll;

  article {
    position: sticky;
    display: flex;
    justify-content: space-between;
    bottom: 0%;
    height: 20%;
    background-color: white;
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`