"use client";
import Link from "next/link";
import React from "react";

import styled from "styled-components";

const Botao = styled.button`
  padding: 15px 50px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  background-color: #0070f3;
  color: #fff;
  cursor: pointer;
  transition: 0.3s;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none; /* Remove sublinhado */
  
  &:hover {
    background-color: #005bb5;
    color: #fff;
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const StyledLink = styled(Link)`
  background-color: #0070f3;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-decoration: none; /* Remove sublinhado */
  border: none;
  border-radius: 8px;
  transition: 0.3s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  /* Aplica o mesmo estilo de hover do botão */
  & > button {
    background-color: #005bb5;
    color: #fff;
  }
`;

//Aqui definimos as propriedades do botão, como o texto, a ação ao clicar, o tipo e se está desabilitado ou não.
interface ButtonProps {
  label: string
  type?: "button" | "submit" | "reset";
  icon?: React.ReactNode;
  disabled?: boolean;
  href?: string;
  onClick?: () => void;
}


// Componente do Button
const Button: React.FC<ButtonProps> = ({
  label,
  type = "button",
  disabled = false,
  href,
  icon,
  onClick = () => {},
  }) => {
  if (href) {
    return (
      <StyledLink href={href} passHref>
        <Botao role="button">
          {icon && <span style={{ marginRight: 8, display: "flex", alignItems: "center", backgroundColor: "transparent" }}>{icon}</span>}
          {label}
        </Botao>
      </StyledLink>
    );
  }

  return (
    <Botao type={type} disabled={disabled} onClick={onClick}>
      {icon && <span style={{ marginRight: 8, display: "flex", alignItems: "center" }}>{icon}</span>}
      {label}
    </Botao>
  );
};

export default Button;