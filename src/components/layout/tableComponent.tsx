import React, { useState } from "react";
import styled from "styled-components";

type Status = "Disponivel" | "Em rota" | "Indisponivel" | "Pausa";

export interface RowData {
  id: number;
  colaborador: string;
  seq: number;
  status: Status;
  veiculo: string;
  placa: string;
  entregas: number;
  previsaoRetorno: string;
}

interface TableProps {
  data: RowData[];
  columns: Array<keyof RowData>;
}

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  height: auto;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 16px;
  text-align: left;
  border: none;
`;

const TableHeader = styled.th`
  color: #000;
  opacity: 0.5;
  padding: 10px;
`;

const TableRow = styled.tr<{ $selected?: boolean }>`
  & > td {
    background-color: ${(props) =>
    props.$selected ? "rgba(34, 135, 230, 0.1)" : "#fff"};
    transition: background-color 0.3s ease;
  }
  border-radius: 8px;
  &:hover > td {
    background-color: ${(props) =>
    props.$selected ? "rgba(34, 135, 230, 0.15)" : "rgba(34, 135, 230, 0.1)"};
  }
`;


const TableCell = styled.td<{ $status?: Status }>` /* Use $status para evitar passar para o DOM */
  padding: 10px;
  text-align: left;
  color: ${(props) => {
    if (props.$status === "Disponivel") return "#1DEC62";
    if (props.$status === "Em rota") return "goldenrod";
    if (props.$status === "Indisponivel") return "red";
    if (props.$status === "Pausa") return "#FF8C00";
    return "#000";
  }};
  font-weight: ${(props) => {
    if (props.$status === "Disponivel") return "bold"; // Negrito para "Disponível"
    if (props.$status === "Em rota") return "bold"; // Peso intermediário para "Em rota"
    if (props.$status === "Indisponivel") return "bold"; // Normal para "Indisponível"
    if (props.$status === "Pausa") return "bold";
    return "normal";
  }};
`;

const Checkbox = styled.input`
  cursor: pointer;
  width: 20px;
  height: 20px;
  background-color: #fff;
  border-radius: 4px;
  border: 2px solid #6943db;
  appearance: none;
  transition: 0.3s ease;

  &:checked {
    transition: 0.3s ease;
    background-color: #6943db;
    border-color: #6943db;
  }

  &:checked::after {
    content: "✔";
    font-size: 15px;
    width: 14px;
    height: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
  }

  &:not(:checked):hover {
    background-color: rgb(224, 237, 248);
  }
`;

const TableComponent: React.FC<TableProps> = ({ data, columns }) => {
  // Estado para guardar as linhas selecionadas (por seq, id ou outro identificador único)
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const handleCheckboxChange = (id: number) => {
    console.log("ID clicado:", id);
    setSelectedRows(prev =>
      prev.includes(id)
        ? prev.filter(rowId => rowId !== id) // Remove se já estava selecionado
        : [...prev, id] // Adiciona se não estava
    );
  };

  return (
    <TableContainer>
      <StyledTable>
        <thead>
          <tr>
            <TableHeader />{/* Coluna para o checkbox */}
            {columns.map(col => (
              <TableHeader key={col}>{col}</TableHeader>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <TableRow key={row.id} $selected={selectedRows.includes(row.id)}>
              <TableCell>
                <Checkbox
                  type="checkbox"
                  checked={selectedRows.includes(row.id)}
                  onChange={() => handleCheckboxChange(row.id)}
                />
              </TableCell>
              {columns.map(col => (
                <TableCell key={col} $status={col === "status" ? row.status : undefined}>
                  {row[col]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
};

export default TableComponent;