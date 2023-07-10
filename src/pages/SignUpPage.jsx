import { Link } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react"
import axios from "axios"

export default function SignUpPage() {
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  function signUp(e) {
    e.preventDefault();

    if(password === passwordConfirm) {
      axios.post('http://localhost:5000/cadastro', {name, email, password})
        .then(resp =>  console.log(resp))
        .catch(error => alert(error.response.data));
    } else {
      alert('As senhas precisam ser iguais!')
    }   
  }

  return (
    <SingUpContainer>
      <form onSubmit={signUp}>
        <MyWalletLogo />
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Nome" type="text" required/>
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="E-mail" type="email" required/>
        <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Senha" type="password" autoComplete="new-password" required/>
        <input value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} placeholder="Confirme a senha" type="password" autoComplete="new-password" required/>
        <button type="submit">Cadastrar</button>
      </form>

      <Link to='/'>
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
