'use client';

import { useEffect, useState } from "react";
import styled from "styled-components";

type Motoboy = {
  id: number
  username: string;
  cpf: string;
  placa: string;
  veiculo: string;
  cnh: string;
  email: string;
  data: Date;
};

const Table = styled.table`
  color: #000;
  width: 100%;
  border-collapse: collapse;
  margin-top: 24px;
`;

const Th = styled.th`
  border-bottom: 1px solid #ccc;
  padding: 8px;
  background: #f5f5f5;
`;

const Td = styled.td`
  padding: 8px;
  text-align: center;
`;

const RemoveButton = styled.button`
    background: transparent;
    cursor: pointer;
    border: none;
    margin-right: 8px;
    transition: background 0.2s ease;
    padding: 4px;
    border-radius: 50%;
    &:hover {
       box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
       background: rgba(255, 0, 0, 0.1);
    }
`
const ModalOverlay = styled.div`
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(2px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`
export const ModalBox = styled.div`
  background: #ffffff;
  padding: 40px 32px;
  border-radius: 20px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.25);
  width: 100%;
  max-width: 420px;
  text-align: center;
  animation: fadeIn 0.25s ease-in-out;

  p {
    font-size: 1.1rem;
    color: #333;
    margin-bottom: 32px;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-8px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

export const ModalButton = styled.button`
  padding: 12px 26px;
  margin: 0 10px;
  border: none;
  border-radius: 10px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.25s ease;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);

  &:not([data-cancel]) {
    background-color: #d32f2f;
    color: white;

    &:hover {
      background-color: #b71c1c;
      transform: translateY(-2px);
    }
  }

  &[data-cancel] {
    background-color: #e0e0e0;
    color: #333;

    &:hover {
      background-color: #c2c2c2;
      transform: translateY(-2px);
    }
  }
`;


export default function ConsultarMotoboys() {
  const [motoboys, setMotoboys] = useState<Motoboy[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [removeIndex, setRemoveIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/cadastroMotoboy")
      .then(res => res.json())
      .then(data => {
        setMotoboys(data.motoboys || []);
        setLoading(false);
      });
  }, []);

  const askRemove = (index: number) => {
    setRemoveIndex(index);
    setShowModal(true);
  };

  const confirmRemove = async () => {
    if (removeIndex !== null) {
      const cpf = motoboys[removeIndex].cpf;
      const res = await fetch("/api/cadastroMotoboy", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cpf }),
      });
      if (res.ok) {
        setMotoboys(motoboys => motoboys.filter((_, i) => i !== removeIndex));
      } else {
        alert("Erro ao remover motoboy");
      }
    }
    setShowModal(false);
    setRemoveIndex(null);
  };

  const cancelRemove = () => {
    setShowModal(false);
    setRemoveIndex(null);
  };

  return (
    <main style={{ padding: 32 }}>
      <h1 style={{ color: "#000" }}>Motoboys cadastrados</h1>
      {loading ? (
        <p style={{ color: "#000" }}>Carregando...</p>
      ) : motoboys.length === 0 ? (
        <p style={{ color: "#000" }}>Nenhum motoboy cadastrado.</p>
      ) : (
        <Table>
          <thead>
            <tr>
              <Th></Th>
              <Th>Nome</Th>
              <Th>CPF</Th>
              <Th>Placa</Th>
              <Th>Tipo</Th>
              <Th>CNH</Th>
              <Th>Email</Th>
              <Th>Criado Em</Th>
            </tr>
          </thead>
          <tbody>
            {motoboys.map((m, i) => (
              <tr key={m.id}>
                <Td>
                  <RemoveButton onClick={() => askRemove(i)} title="Remover motoboy">❌</RemoveButton>
                </Td>
                <Td>{m.username}</Td>
                <Td>{m.cpf}</Td>
                <Td>{m.placa}</Td>
                <Td>{m.veiculo}</Td>
                <Td>{m.cnh}</Td>
                <Td>{m.email}</Td>
                <Td>{m.data instanceof Date ? m.data.toLocaleDateString() : new Date(m.data).toLocaleDateString()}</Td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      {showModal && (
        <ModalOverlay>
          <ModalBox>
            <p style={{marginBottom: "20px" }}>Deseja realmente excluir este motoboy?</p>
            <ModalButton onClick={confirmRemove}>Sim</ModalButton>
            <ModalButton data-cancel onClick={cancelRemove}>Cancelar</ModalButton>
          </ModalBox>
        </ModalOverlay>
      )}
    </main>
  );
}