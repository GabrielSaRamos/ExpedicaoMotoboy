"use client";
import { config } from "@fortawesome/fontawesome-svg-core";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/ui/navbar";
import HeaderStatus from "@/components/layout/headerStatus";
import FiltrosPesquisa from "@/components/layout/filtrosPesquisa";
import styled from "styled-components";
import TableComponent, { RowData } from "@/components/layout/tableComponent";
import Clock from "@/components/ui/clock";
import "@fortawesome/fontawesome-svg-core/styles.css"; // Importa os estilos do Font Awesome
config.autoAddCss = false; // Desativa a adição automática de CSS pelo Font Awesome


const Content = styled.div`
  margin-left: 200px;
  padding: 20px;
  width: 100%;
`

const Titulo = styled.h1`
  margin-top: 30px;
  font-size: 24px;
  color: #0070f3;
  font-weight: 800;
`

function normalize(str: string) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

export default function Home() {
  const [search, setSearch] = useState("");
  const [motoboys, setMotoboys] = useState<any[]>([]);
  const [motoboyFiltro, setMotoboyFiltro] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Verifica se o usuário está logado)
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
          veiculo: m.veiculo ?? "",
          placa: m.placa ?? "",
          entregas: m.entregas ?? 0,
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
        <HeaderStatus entregadores={5} loja={1} />
        <FiltrosPesquisa
          search={search}
          setSearch={setSearch}
          motoboyFiltro={motoboyFiltro}
          setMotoboyFiltro={setMotoboyFiltro}
          nomesMotoboys={nomesMotoboys}
        />
        <Titulo>Relatório Mensal: </Titulo>
        <TableComponent
          data={filteredData}
          columns={["colaborador", "entregas", "veiculo", "placa"]} />
        <Clock />
      </Content>
    </main>
  );


}
