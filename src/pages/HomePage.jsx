import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function HomePage() {
  const [itensList, setItensList] = useState('');
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [status, setStatus] = useState(undefined);

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
  }, []);

  if (status) {
    return (
      <HomeContainer>
        <Header>
          <h1 data-test='user-name'>Olá, {user.name}</h1>
          <BiExit onClick={logout} data-test='logout'/>
        </Header>

        <TransactionsContainer>
          <ul>
            <ListItemContainer>
              <div>
                <span>30/11</span>
                <strong data-test='registry-name'>Almoço mãe</strong>
              </div>
              <Value data-test='registry-amount' color={"negativo"}>120,00</Value>
            </ListItemContainer>

            <ListItemContainer>
              <div>
                <span>15/11</span>
                <strong>Salário</strong>
              </div>
              <Value color={"positivo"}>3000,00</Value>
            </ListItemContainer>

          </ul>

          <article>
            <strong>Saldo</strong>
            <Value data-test='total-amount' color={"positivo"}>2880,00</Value>
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
    display: flex;
    justify-content: space-between;   
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