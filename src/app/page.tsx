"use client";
import "@fortawesome/fontawesome-svg-core/styles.css"; // Importa os estilos do Font Awesome
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; // Desativa a adição automática de CSS pelo Font Awesome
import { Navbar } from "@/components/ui/navbar";
import HeaderStatus from "@/components/layout/headerStatus";
import FiltrosPesquisa from "@/components/layout/filtrosPesquisa";
import TableComponent, { RowData } from "@/components/layout/tableComponent";
import Clock from "@/components/ui/clock";
import styled from "styled-components";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";


const Content = styled.div`
  margin-left: 200px;
  padding: 20px;
  width: 100%;
`

const Titulo = styled.h1`
  font-size: 24px;
  color: #0070f3;
  font-weight: 800;
  margin-top: 30px;
`

function normalize(str: string) {
  return (str || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}


export default function Home() {
  const [search, setSearch] = useState("");
  const [motoboyFiltro, setMotoboyFiltro] = useState<string | null>(null);
  const [motoboys, setMotoboys] = useState<RowData[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Verifica se o usuário está logado
    const username = localStorage.getItem("username");
    if (!username) {
      router.replace("/login");
    }

    // Busca os motoboys do backend
    fetch("/api/cadastroMotoboy")
      .then(res => res.json())
      .then(data => {
        // Mapeia os campos do backend para o formato esperado pela tabela
        const motoboysMapeados = data.motoboys.map((m: any) => ({
          id: m.id,
          colaborador: m.username ?? "",
          seq: m.seq ?? 0,
          status: m.status ?? "",
          veiculo: m.veiculo ?? "",
          placa: m.placa ?? "",
          entregas: m.entregas ?? 0,
          previsaoRetorno: m.previsaoRetorno ?? "",
        }));
        setMotoboys(motoboysMapeados);
      })
  }, [router]);

  const filteredData = motoboys.filter(row =>
    (motoboyFiltro ? row.colaborador === motoboyFiltro : true) &&
    normalize(row.colaborador).includes(normalize(search))
  );

  // Aqui você extrai os nomes únicos dos motoboys já carregados
  const nomesMotoboys = Array.from(new Set(motoboys.map(m => m.colaborador)));

  return (
    <main style={{ display: "flex" }}>
      <Navbar />
      <Content>
        <HeaderStatus entregadores={7} loja={12} />
        <FiltrosPesquisa
          search={search}
          setSearch={setSearch}
          motoboyFiltro={motoboyFiltro}
          setMotoboyFiltro={setMotoboyFiltro}
          nomesMotoboys={nomesMotoboys}
        />
        <Titulo>Expedição Motoboy: </Titulo>
        <TableComponent
          data={filteredData}
          columns={["colaborador", "seq", "status", "veiculo", "placa", "entregas", "previsaoRetorno"]}
        />
        <Clock />
      </Content>
    </main>
  )
};