'use client';

import TableComponent from "@/components/layout/tableComponent";
import Button from "@/components/ui/button";
import Clock from "@/components/ui/clock";
import { useState } from "react";
import styled from "styled-components";
import MotoboyTable from "../ui/motoboyTable";
import Image from "next/image";
import { FaUser } from "react-icons/fa";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  backgroundColor: #EDE8E8; 
  background-size: cover;
  background-repeat: no-repeat;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const LoginBox = styled.div`
  background: linear-gradient(135deg, #ffffff, #f0f0f0);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  padding: 30px;
  border-radius: 10px;
  text-align: center;
  width: 100%;
  max-width: 850px;
  height: 500px;
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
  justify-content: center;
  flex-direction: column;
  width: 100%;
  gap: 25px;
  background: linear-gradient(135deg, #ffffff, #f0f0f0);
  overflow: visible;
`;

const FormContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 20px;
  background: linear-gradient(135deg, #ffffff, #f0f0f0); 
  
`
const InputGroup = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    flex-direction: row;
    gap: 10px;
    background: linear-gradient(135deg, #ffffff, #f0f0f0); 
`;

const InputOwn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  background-color: #e6e6e6;
  border-radius: 5px;
  padding: 10px;
  border: 1px solid #ccc; /* Borda padrão */
  transition: box-shadow 0.3s ease, border-color 0.3s ease;
    
  
  &:hover {
    border: 1px solid #0070f3; /* Adiciona uma borda azul */
    box-shadow: 0 2px 8px rgba(0, 112, 243, 0.2); /* Sombra mais suave */
  }

  &:focus-within {
    border: 1px solid #005bb5; /* Borda azul mais escura ao focar */
    box-shadow: 0 3px 8px rgba(0, 91, 181, 0.3); /* Sombra mais intensa ao focar */
  }
`;

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

const Sair = styled.div`
  text-align: center;
  width: 100px;
  position: fixed;
  left: 0;
  bottom: 0;
  margin: 24px; 
  overflow: visible;
`;

const Logo = styled.div`
    position: fixed;
    justify-content: center;
    background: transparent;
    padding: 10px;

    img { 
        background: transparent;
        height: auto;
        width: 150px;
        
    }
`;

export default function CadastroMotoboyForm() {
  const [cpfCaracter, setCpfCaracter] = useState("");
  const [cnhCaracter, setCnhCaracter] = useState("");
  const [motoboys, setMotoboys] = useState<any[]>([]);


  // Função para remover um motoboy da lista
  const handleRemove = async (index: number) => {
    const motoboyToRemove = motoboys[index];

    const res = await fetch("/api/cadastroMotoboy", {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cpf: motoboyToRemove.cpf }),
    });

    if (res.ok) {
      setMotoboys(motoboys => motoboys.filter((_, i) => i !== index));
    } else {
      const data = await res.json();
      alert(data.message || "Erro ao remover Motoboy");
    }
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Intercepta o envio do formulário
    const username = (document.getElementById("username") as HTMLInputElement).value;
    const cpf = (document.getElementById("cpf") as HTMLInputElement).value;
    const placa = (document.getElementById("placa") as HTMLInputElement).value;
    const tipo = (document.getElementById("tipo") as HTMLInputElement).value;
    const cnh = (document.getElementById("cnh") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;


    // Validação da API 
    const res = await fetch("/api/cadastroMotoboy", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, cpf, placa, tipo, cnh, email }),
    });

    if (res.ok) {
      const data = await res.json();
      setMotoboys(prev => [
        ...prev,
        data.motoboy
      ]);
    } else {
      let data = {};
      try {
        data = await res.json();
      } catch { }
      alert((data as any).message || "Erro ao cadastrar Motoboy");
    }
  };

  //Função de formatação para CPF
  function formatCPF(value: string) {
    return value
      .replace(/\D/g, "") // Remove tudo que não é dígito
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }
  //Função de formatação para CPF
  function formatCNH(value: string) {
    return value.replace(/\D/g, "").slice(0, 11); // Limita a CNH a 11 dígitos
  }

  //Logica
  return (
    <Container>
      <LoginBox>
        <Title>Cadastre um Motoboy!</Title>
        <Form onSubmit={handleSubmit}>
          <FormContainer>
            <InputGroup>
              <label htmlFor="username" style={{ color: "#333", backgroundColor: "transparent", overflow: "visible" }}>Nome:</label>
              <InputOwn>
                <Input type="text" placeholder="Username" id="username" />
              </InputOwn>

              <label htmlFor="cpf" style={{ color: "#333", backgroundColor: "transparent", overflow: "visible" }}>CPF:</label>
              <InputOwn>
                <Input
                  type="text"
                  placeholder="CPF"
                  id="cpf"
                  value={cpfCaracter}
                  maxLength={14}
                  onChange={e => setCpfCaracter(formatCPF(e.target.value))}
                />
              </InputOwn>
            </InputGroup>

            <InputGroup>
              <label htmlFor="placa" style={{ color: "#333", backgroundColor: "transparent", overflow: "visible" }}>Placa:</label>
              <InputOwn>
                <Input type="text" placeholder="Placa" id="placa"  onInput={e =>{
                  const input = e.target as HTMLInputElement;
                  input.value = input.value.toUpperCase();
                }} />
              </InputOwn>

              <label htmlFor="tipo" style={{ color: "#333", backgroundColor: "transparent", overflow: "visible" }}>Tipo:</label>
              <InputOwn>
                <select id="tipo" name="tipo" style={{
                  width: "100%",
                  border: "none",
                  background: "none",
                  fontSize: "16px",
                  color: "#333"
                }}>
                  <option value="">Selecione o tipo</option>
                  <option value="MOTO">MOTO</option>
                  <option value="CARRO">CARRO</option>
                </select>
              </InputOwn>
            </InputGroup>

            <InputGroup>
              <label htmlFor="cnh" style={{ color: "#333", backgroundColor: "transparent", overflow: "visible", }}>CNH:</label>
              <InputOwn>
                <Input type="text" placeholder="CNH" id="cnh"
                  value={cnhCaracter} onChange={e => setCnhCaracter(formatCNH(e.target.value))} />
              </InputOwn>

              <label htmlFor="email" style={{ color: "#333", backgroundColor: "transparent", overflow: "visible" }}>Email:</label>
              <InputOwn>
                <Input type="email" placeholder="Email" id="email" />
              </InputOwn>
            </InputGroup>
          </FormContainer>

          <div style={{ width: "300px", overflow: "visible", margin: "0 auto" }}>
            <Button
              label="Cadastrar"
              type="submit"
            />
          </div>
        </Form>
        <MotoboyTable motoboys={motoboys} onRemove={handleRemove} />
      </LoginBox>

    </Container>

  );
}