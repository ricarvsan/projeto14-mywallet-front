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

    axios.post(`${import.meta.env.VITE_API_URL}/`, {email, password})
      .then(resp => {
        console.log(resp.data)
        let newUser = resp.data;
        setToken(resp.data.token);
        setUser(newUser)
        
        navigate('/home')
      })
      .catch(error => alert(error.response.data));
  }

  return (
    <SingInContainer>
      <form onSubmit={signIn}> 
        <MyWalletLogo />
        <input data-test='email' value={email} onChange={e => setEmail(e.target.value)} placeholder="E-mail" type="email" required/>
        <input data-test='password' value={password} onChange={e => setPassword(e.target.value)} placeholder="Senha" type="password" autoComplete="new-password" required/>
        <button data-test='sign-in-submit' type="submit">Entrar</button>
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
