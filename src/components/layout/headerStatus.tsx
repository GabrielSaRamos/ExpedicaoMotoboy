"use client";
import styled from "styled-components";



const Header = styled.header`
    display: flex;
    justify-content: space-evenly;
    gap: 70px;
`

const Card = styled.div`
    text-align: center;
    margin-top: 20px;
    height: 150px;
    width: 110px;

     p{
       margin-top: 10px;
    }
`;

const CardNumber = styled.div`
    display: flex;
    background-color: rgba(15, 14, 14, 0.1);
    height: 100px;
    align-items: center;
    justify-content: center;
    border-radius: 50%;

    h1{
        margin: 0; 
        background-color: transparent; 
    }

`;


interface HeaderStatusProps {
    entregadores: number;
    loja: number;
}

export default function HeaderStatus({ entregadores, loja }: HeaderStatusProps) {
    return (
        <Header>
            <Card>
                <CardNumber>
                    <h1 style={{ fontSize: "4rem", color: "#1d4ed8" }}>{entregadores}</h1>
                </CardNumber>

                <p style={{ color: "#000000", fontWeight: 700 }}>Entregadores</p>
            </Card>

            <Card>
                <CardNumber>
                    <h1 style={{ fontSize: "4rem", color: "#1d4ed8" }}>{loja}</h1>
                </CardNumber>

                <p style={{ color: "#000000", fontWeight: 700 }}>Loja</p>
            </Card>

            
        </Header>
    );
}