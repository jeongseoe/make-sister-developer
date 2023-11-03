import React, { useState } from "react";

import { createGlobalStyle } from "styled-components";
import TodoTemplate from "./components/TodoTemplate";
import TodoHead from "./components/TodoHead";
import TodoList from "./components/TodoList";
import TodoCreate from "./components/TodoCreate";
import styled from "styled-components";
import { TodoProvider } from "./components/TodoContext";
import CatPopup from "./CatPopup";

function App() {
  const [isDark, setIsDark] = useState(false);
  const [input, setInput] = useState(false);

  // style 변수
  const backgroundDark = String(isDark);
  const buttonDark = `button${backgroundDark}`;
  const stringDark = `string${backgroundDark}`;

  // todos.isDarkMode(false)
  const Global = createGlobalStyle`
  // createGlobalStyle 에만 :root라는 변수를 만들 수 있는 공간이 생김.
  // 그 이후에 var(--{변수명})을 이용해서 반응형으로 변경할 수 있다.

  :root{
    // 바탕색
    --true : #292727;
    --false : #e7e6e6;

    // 버튼색
    --buttontrue: #ffff;
    --buttonfalse: #153c2f;

    // 버튼글씨색
    --stringtrue: #36353599;
    --stringfalse: #ffff;
  }
  body {
    background: var(--${backgroundDark})
  }
`;

  const StyleButton = styled.button`
    padding: 20px 32px;
    color: var(--${stringDark});
    border: none;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    background-color: var(--${buttonDark});

    &:hover {
      color: white;
      background-color: #548854;
    }
  `;
  console.log(input);
  return (
    <>
      <Global />
      <CatPopup input={input} setInput={setInput} />
      <TodoProvider>
        <TodoTemplate isDark={isDark}>
          <TodoHead isDark={isDark} />
          <TodoList isDark={isDark} />
          <TodoCreate isDark={isDark} setInput={setInput} />
        </TodoTemplate>
      </TodoProvider>
      <div
        style={{
          marginTop: "-200px",
          display: "flex",
          justifyContent: "right",
          marginRight: "300px",
        }}
      >
        <StyleButton onClick={() => setIsDark(!isDark)}>Dark Mode</StyleButton>
      </div>
    </>
  );
}

export default App;
