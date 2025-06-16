'use client';

import styled from "styled-components";
import { FaUser, FaLock } from "react-icons/fa"; // Importa ícones do React Icons
import Button from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

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

const LoginBox = styled.div`
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

export default function CadastroBox() {
    const router = useRouter();

    useEffect(() => {
        // Verifica se o usuário está logado
        const username = localStorage.getItem("username");
        if (!username) {
            router.replace("/cadastro");
        }
    }, [router]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault(); // Impede o recarregamento da página
        const username = (document.getElementById("username") as HTMLInputElement).value;
        const password = (document.querySelector('input[type="password"]') as HTMLInputElement).value;


        const res = await fetch("/api/cadastro", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        if (res.ok) {
            alert("Usuário cadastrado com sucesso!");
            router.push("/login");  // Redireciona para a página de login
        } else {
            const data = await res.json();
            alert(data.message || "Erro ao cadastrar usuário");
        }
    };

    // Função para lidar com o envio do formulário
    return (
        <Container>
            <LoginBox>
                <Title>Faça seu Cadastro!</Title>
                <Form onSubmit={handleSubmit}>
                    <InputGroup>
                        <FaUser color="#666" style={{ background: "transparent" }} />
                        <Input id="username" type="text" placeholder="Username" />
                    </InputGroup>

                    <InputGroup>
                        <FaLock color="#666" style={{ background: "transparent" }} />
                        <Input type="password" placeholder="Senha" />
                    </InputGroup>

                    <ForgotPassword href="/login">Já possui uma senha? Fazer Login!</ForgotPassword>

                    <Button
                        label="Cadastrar"
                        type="submit"
                    />
                </Form>
            </LoginBox>
        </Container>
    );
}