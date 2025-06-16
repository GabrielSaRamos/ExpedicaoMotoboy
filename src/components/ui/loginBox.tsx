'use client';

import styled from "styled-components";
import { FaUser, FaLock } from "react-icons/fa"; // Importa ícones do React Icons
import Button from "@/components/ui/button";
import Link from "next/link";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);  
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const LoginContainer = styled.div`
  background: linear-gradient(135deg, #ffffff, #f0f0f0);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  padding: 30px;
  border-radius: 10px;
  text-align: center;
  width: 100%;
  max-width: 500px;
  height: 350px;
`;

const Title = styled.h1`
  color: #1e1e1e;
  font-size: 24px;
  margin-bottom: 20px;
  background: linear-gradient(135deg, #ffffff, #f0f0f0);
  -webkit-background-clip: text;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 25px;
  background: linear-gradient(135deg, #ffffff, #f0f0f0);
  overflow: visible;
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  background-color: #e6e6e6;
  border-radius: 5px;
  padding: 10px;
  border: 1px solid #ccc; /* Borda padrão */
  gap: 10px;
  transition: box-shadow 0.3s ease, border-color 0.3s ease;

  &:hover {
    border: 1px solid #0070f3; /* Adiciona uma borda azul */
    box-shadow: 0 2px 8px rgba(0, 112, 243, 0.2); /* Sombra mais suave */
  }

  &:focus-within {
    border: 1px solid #005bb5; /* Borda azul mais escura ao focar */
    box-shadow: 0 3px 8px rgba(0, 91, 181, 0.3); /* Sombra mais intensa ao focar */
  }
`;;

const Input = styled.input`
  border: none;
  background: none;
  outline: none;
  flex: 1;
  font-size: 16px;
  color: #333;

  &::placeholder {
    color: #999;
  }
      /* Remove autofill background no Chrome/Safari */
  &:-webkit-autofill,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 1000px #e6e6e6 inset !important;
    box-shadow: 0 0 0 1000px #e6e6e6 inset !important;
    -webkit-text-fill-color: #333 !important;
    color: #333 !important;
    transition: background-color 5000s ease-in-out 0s;
  
`;

const ForgotPassword = styled(Link)`
  font-size: 14px;
  color: #0070f3;
  text-decoration: none;
  align-self: flex-end;
  margin-top: -10px;
  background: linear-gradient(135deg, #ffffff, #f0f0f0);
  
  webkit-background-clip: text;

  &:hover {
    text-decoration: underline;
  }
`;


export default function LoginBox() {

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const password = (document.querySelector('input[type="password"]') as HTMLInputElement).value;

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem('username', username); // Armazena o username no localStorage
      alert('Login realizado!');
      window.location.href = "/";
    } else {
      const data = await res.json();
      alert(data.error || 'Erro ao logar');
    }
  };

  return (
    <Container>
      <LoginContainer>
        <Title>Faça seu login!</Title>
        <Form onSubmit={handleLogin}>
          <InputGroup>
            <FaUser color="#666" style={{background: "transparent"}}/>
            <Input type="text" placeholder="Username" id="username"/>
          </InputGroup>

          <InputGroup>
            <FaLock color="#666" style={{background: "transparent"}}/>
            <Input type="password" placeholder="Senha" />
          </InputGroup>

          <ForgotPassword href="/cadastro">Esqueci minha senha</ForgotPassword>

          <Button
            label="Entrar"
            type="submit"
          />
        </Form>
      </LoginContainer>
    </Container>
  );
}