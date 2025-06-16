'use client';

import CadastroMotoboyForm from "@/components/layout/cadastroMotoboyForm";
import Button from "@/components/ui/button";
import { FaUser } from "react-icons/fa";
import styled from "styled-components";
import Image from "next/image";
import Clock from "@/components/ui/clock"; // ajuste o import se necessário

const Container = styled.main`
  background-color: #EDE8E8;
  min-height: 100vh;
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

const Sair = styled.div`
  text-align: center;
  width: 100px;
  position: fixed;
  left: 0;
  bottom: 0;
  margin: 24px;
  overflow: visible;
  z-index: 10;
`;

const Consultar = styled.div`
  text-align: center;
  width: 150px;
  position: fixed;
  right: 0;
  bottom: 0;
  margin: 24px;
  overflow: visible;
  z-index: 10;
`

export default function CadastroMotoboy() {
  return (
    <Container>
      <Clock />
      <Logo>
        <Image
          src="/Logo.png"
          alt="Logo da Expedição Motoboy"
          width={120}
          height={60}
          priority
        />
      </Logo>
      <Sair>
        <Button
          label="Voltar"
          href="/"
          icon={<FaUser color="#fff" style={{ backgroundColor: "transparent" }} />}
        />
      </Sair>
      <Consultar>
        <Button
          label="Consultar"
          href="/motoboys/consultar"
          icon={<FaUser color="#fff" style={{ backgroundColor: "transparent" }} />}
        />
      </Consultar>
      <CadastroMotoboyForm />
    </Container>
  );
}