import { useEffect, useState } from "react";
import styled from "styled-components";

type Motoboy = {
    username: string;
    cpf: string;
    placa: string;
    tipo: string;
    cnh: string;
    email: string;
    data: Date;
};

interface MotoboyTableProps {
    motoboys: Motoboy[];
}

const TableContainer = styled.div`
    background: linear-gradient(135deg, #ffffff, #f0f0f0);
    display: flex;
    flex-direction: column;
    margin-top: 32px;
    width: 100%;

`

const TableScrollWrapper = styled.div`
    max-height: 150px; 
    overflow-y: auto;
    width: 100%;
    background: transparent;
`;

const StyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin: 10px 0;
    border: none;
    text-align: center;
    background: transparent;
    
`

const TableHeader = styled.th`
    color: #000;
    opacity: 0.5;
    border-bottom: 12px solid transparent;
    background: transparent;
`

const TableRow = styled.tr`
    background: transparent;
`
const TableCell = styled.td`
    color: #000;
    background: transparent;
    padding: 10px;
`

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

export default function MotoboyTable({ motoboys, onRemove }: MotoboyTableProps & { onRemove: (index: number) => void }) {
    const [showModal, setShowModal] = useState(false);
    const [removeIndex, setRemoveIndex] = useState<number | null>(null);

    const columns = ["Motoboy:", "CPF:", "Placa:", "Tipo:", "CNH:", "Email:"];

    if (motoboys.length === 0) return null;

    const askRemove = (index: number) => {
        setRemoveIndex(index);
        setShowModal(true);
    };

    const confirmRemove = () => {
        if (removeIndex !== null) {
            onRemove(removeIndex);
        }
        setShowModal(false);
        setRemoveIndex(null);
    };

    const cancelRemove = () => {
        setShowModal(false);
        setRemoveIndex(null);
    };

    return (
        <TableContainer>
            <h3 style={{ color: "#000", background: "transparent" }}>Motoboys cadastrados:</h3>
            <TableScrollWrapper>
                <StyledTable>
                    <thead style={{ background: "transparent" }}>
                        <TableRow>
                            <TableHeader></TableHeader>
                            {columns.map(col => (
                                <TableHeader key={col}>{col}</TableHeader>
                            ))}
                        </TableRow>
                    </thead>
                    <tbody style={{ background: "transparent" }}>
                        {motoboys.map((m, i) => (
                            <TableRow key={i}>
                                <TableCell>
                                    <RemoveButton onClick={() => askRemove(i)} title="Remover motoboy">
                                        ❌
                                    </RemoveButton>
                                </TableCell>
                                <TableCell>{m.username}</TableCell>
                                <TableCell>{m.cpf}</TableCell>
                                <TableCell>{m.placa}</TableCell>
                                <TableCell>{m.tipo}</TableCell>
                                <TableCell>{m.cnh}</TableCell>
                                <TableCell>{m.email}</TableCell>

                            </TableRow>
                        ))}
                    </tbody>
                </StyledTable>
            </TableScrollWrapper>
            {showModal && (
                <ModalOverlay>
                    <ModalBox>
                        <p style={{ marginBottom: "20px" }}>Deseja realmente excluir este motoboy?</p>
                        <ModalButton onClick={confirmRemove}>Sim</ModalButton>
                        <ModalButton data-cancel onClick={cancelRemove}>Cancelar</ModalButton>
                    </ModalBox>
                </ModalOverlay>
            )}
        </TableContainer>
    );
}