"use client";

import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react"

const SearchContainer = styled.div`
    postion: relative;
    display: inline-block;
    overflow: visible;
`;

const Input = styled.input`
    padding: 10px 400px 10px 10px;
    border-radius: 9px;
    border: 1px solid #ccc;
    font-size: 16px;
    color: #333;
    background-color: #f9f9f9;
    transition: 0.3s ease;
    
    &:hover {
        border-color:rgb(140, 176, 218);}
        box shadow: 0 0 5px rgba(161, 196, 236, 0.5);

    &:focus {
        outline: none;
        border-color: #0070f3;
        box-shadow: 0 0 5px rgba(0, 112, 243, 0.5);
    }
`;

const Icon = styled(FontAwesomeIcon)`
    padding-left: 20px;
    color: #0070f3;
    font-size: 30px;
    cursor: pointer;
    transition: background 0.3s ease, transform 0.25s ease, box-shadow 0.3s ease, font-size 0.3s ease;
    background: transparent;

    &:hover {
      transform: translateY(-2px) scale(1.2);
      font-size: 30px;

    }
`;

interface SearchBarProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
    //É uma forma de criar uma referência direta para um elemento do DOM (como um <input>
    const inputRef = useRef<HTMLInputElement>(null);

    const handleIconClick = () => {
        inputRef.current?.focus(); // Foca no input quando o ícone é clicado
    };

    return (
        <SearchContainer>
            <Input
                ref={inputRef}
                placeholder="Pesquisar"
                value={value}
                onChange={onChange}
                alt="Pesquisar"
            />
            <Icon icon={faSearch} onClick={handleIconClick}/>
        </SearchContainer>
    )
}