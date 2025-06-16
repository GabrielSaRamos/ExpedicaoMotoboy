"use client";

import styled from "styled-components";
import { useState } from "react";
import SearchBar from "../ui/searchBar";

const FiltrosContainer = styled.div`
  display: flex;
  align-items: center;
  overflow: visible;
  flex-direction: row;
`;

const ListaNomes = styled.ul<{ $visible: boolean }>`
  margin: 0;
  margin-left: 0;
  padding: 12px 0;
  width: 220px;
  max-height: ${({ $visible }) => ($visible ? "220px" : "0")};
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  overflow-y: auto;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(37, 117, 252, 0.15), 0 1.5px 6px rgba(0,0,0,0.07);
  border: 2px solid;
  border-image: linear-gradient(120deg, #2575fc 40%, #6a11cb 100%);
  border-image-slice: 1;
  list-style: none;
  transition: max-height 0.3s ease, opacity 0.3s ease, box-shadow 0.3s;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
`;

const ItemNome = styled.li`
  padding: 12px 24px;
  font-size: 18px;
  color: #222;
  cursor: pointer;
  border-bottom: none;
  border-radius: 8px;
  margin: 2px 8px;
  transition: background 0.2s, color 0.2s;
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background-color: #f0f6ff;
    color: #2575fc;
  }
`;

const ItemTodos = styled.li`
  padding: 14px 24px 12px 24px;
  font-size: 20px;
  color: #2575fc;
  font-weight: 700;
  cursor: pointer;
  border-bottom: none;
  border-radius: 8px;
  margin: 2px 8px 10px 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  transition: background 0.2s, color 0.2s;
  &:hover {
    background-color: transparent;
    color: #6a11cb;
  }
`;


const ButtonFiltros = styled.button`
  display: flex;
  background-color: rgba(234, 234, 234, 0.6);
  border: 1px solid #EAEAEA;
  height: 40px;
  width: 90px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-weight: 700;
  font-size: 16px;
  color: #0070f3;
  transition: 0.3s ease;
  margin-bottom: 0;
  
  &:hover {
    
    background-color: rgba(234, 234, 234, 1);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

interface FiltrosPesquisaProps {
  search: string;
  setSearch: (value: string) => void;
  motoboyFiltro: string | null;
  setMotoboyFiltro: (value: string | null) => void;
  nomesMotoboys: string[]
}


export default function FiltrosPesquisa({
  search,
  setSearch,
  setMotoboyFiltro,
  nomesMotoboys,
}: FiltrosPesquisaProps) {
  const [showLista, setShowLista] = useState(false);

  return (
    <FiltrosContainer>
      <SearchBar value={search} onChange={e => setSearch(e.target.value)} />

      <ListaNomes $visible={showLista}>
        <ItemTodos
          onClick={() => {
            setMotoboyFiltro(null);
            setShowLista(false);
          }}
        >
          <span style={{ fontSize: 18, marginRight: 4 }}>👥</span> Todos
        </ItemTodos>
        {nomesMotoboys.map(nome => (
          <ItemNome
            key={nome}
            onClick={() => {
              setMotoboyFiltro(nome);
              setShowLista(false);
            }}
          >
            {nome}
          </ItemNome>
        ))}
      </ListaNomes>
      {!showLista && (
        <ButtonFiltros onClick={() => setShowLista(true)}>
          Todos
        </ButtonFiltros>
      )}

    </FiltrosContainer>
  );
}