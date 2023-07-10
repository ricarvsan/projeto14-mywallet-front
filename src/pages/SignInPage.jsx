import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";


export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const {setUser} = useContext(UserContext);
  const navigate = useNavigate();

  function signIn(e) {
    e.preventDefault();

    axios.post('http://localhost:5000/', {email, password})
      .then(resp => {console.log(resp)
        let token = resp.data
        setToken(token);
        setUser({token})
        localStorage.setItem('token', resp.data);
        
        navigate('/home')
      })
      .catch(error => alert(error.response.data));
  }

  return (
    <SingInContainer>
      <form onSubmit={signIn}> 
        <MyWalletLogo />
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="E-mail" type="email" required/>
        <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Senha" type="password" autoComplete="new-password" required/>
        <button type="submit">Entrar</button>
      </form>

      <Link to='/cadastro'>
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
