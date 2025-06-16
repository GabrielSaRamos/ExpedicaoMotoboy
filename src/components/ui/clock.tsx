'use client';
import React, { useEffect, useState } from "react";
import styled from "styled-components";


const ClockWrapper = styled.div`
  position: fixed;
  top: 16px;
  right: 24px;
  background: #fff;
  color: #222;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 18px;
  box-shadow: 2px 4px 8px rgba(0,0,0,0.08);
  z-index: 1000;
  font-weight: bold;
`;


export default function Clock() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }
    );
     if (!time) return null;

    return (
        <ClockWrapper>
          {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </ClockWrapper>
    );
}