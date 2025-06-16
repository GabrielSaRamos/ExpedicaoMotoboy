'use client';

import ConsultarMotoboys from "@/components/layout/consultarMotoboy";
import Button from "@/components/ui/button";
import { use } from "react";
import { FaUser } from "react-icons/fa";
import styled from "styled-components";

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

export default function consulta() {
    return (
        <>
            <ConsultarMotoboys />
            <Sair>
                <Button
                    label="Voltar"
                    href="/motoboys"
                    icon={<FaUser color="#fff" style={{ backgroundColor: "transparent" }} />}
                />
            </Sair>
        </>
    );

}    