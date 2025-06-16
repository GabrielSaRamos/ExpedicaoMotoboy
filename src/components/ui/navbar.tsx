"use client";

import React, { use, useEffect, useState } from "react";
import styled from "styled-components";
import Button from "./button";
import Image from 'next/image';
import { FaChartLine, FaUsers, FaUser, FaUserPlus, FaSignOutAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";



const NavbarContainer = styled.nav`
  background-color: #EDE8E8;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* empurra o botão "Sair" pro fim */
  align-items: center;
  border-radius: 0px 30px 30px 0px;
  height: 100vh;
  width: 200px;
  position: fixed;
  top: 0;
  left: 0;
  padding: 20px 0;
`;

const Logo = styled.div`
    display: flex;
    justify-content: center;
    background-color: #EDE8E8;
    border-bottom: 1px solid #ccc;

    img { 
        background-color: #EDE8E8;
        height: auto;
        width: 150px;
        
    }
`;

const Perfil = styled.div`
    display: flex;
    justify-content: center;
    text-align: center;
    width: 100%;
    height: auto;
    background-color: #EDE8E8;
    margin-top: 10px;
      h2 {
        background-color: #EDE8E8;
        color: #000;
        font-size: 20px;
      }

`;

const NavbarMenu = styled.div`
    width: 100%;
    background-color: #EDE8E8;
    padding: 10px 20px;
    margin-top: 100px;
    gap: 20px;
    display: flex;
    flex-direction: column;
    list-style: none;
    text-align: center;

`;

const NavbarSair = styled.div`
     text-align: center;
     background-color: #EDE8E8;
     width: 100%;
     padding: 10px 30px;
`;


function capitalize(str: string | null) {
  if (str === null) return null;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}


export const Navbar = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUsername(localStorage.getItem("username"));
    }
  }, []);


  return (
    <NavbarContainer>
      <>
        <div style={{ backgroundColor: "#EDE8E8", width: "100%", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
          <Logo>
            <Image
              src="/Logo.png"
              alt="Logo da Expedição Motoboy"
              width={120}
              height={60}
              priority
            />
          </Logo>
          <Perfil>
            <h2>Seja Bem vindo{username ? `, ${capitalize(username)}` : ""}!</h2>

            <p></p>
          </Perfil>
          <NavbarMenu>
            <Button
              label="Geral"
              href="/"
              icon={<FaChartLine color="#fff" style={{ backgroundColor: "transparent" }} />}
            />
            <Button
              label="User"
              href="/users"
              icon={<FaUser color="#fff" style={{ backgroundColor: "transparent" }} />}
            />

            <Button
              label="Cadastro"
              href="/motoboys"
              icon={<FaUserPlus color="#fff" style={{ backgroundColor: "transparent" }} />}
            />
          </NavbarMenu>
        </div>

        <NavbarSair>
          <Button
            label="Sair"
            icon={<FaSignOutAlt color="#fff" style={{ backgroundColor: "transparent", fontSize:"50px" }} />}
            onClick={async () => {
              await fetch("/api/logout", { method: "POST" });
              localStorage.removeItem("username");
              window.location.href = "/login";
            }}
          />
        </NavbarSair>
      </>
    </NavbarContainer>
  );
};