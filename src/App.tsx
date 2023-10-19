import React, { useState } from "react";

import { createGlobalStyle } from "styled-components";
import TodoTemplate from "./components/TodoTemplate";
import TodoHead from "./components/TodoHead";
import TodoList from "./components/TodoList";
import TodoCreate from "./components/TodoCreate";
import styled from "styled-components";
import {
  useTodoState,
  TodoProvider,
  useTodoDispatch,
} from "./components/TodoContext";

interface Props {
  isDark: boolean;
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
}

function InnerApp(props: Props) {
  const { isDark, setIsDark } = props;

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

  return (
    <>
      <Global />
      <TodoTemplate isDark={isDark}>
        <TodoHead isDark={isDark} />
        <TodoList isDark={isDark} />
        <TodoCreate isDark={isDark} />
      </TodoTemplate>
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

// 1. Promise
// 2. async await

// axios로 todo api 호출을 해서 응답결과를 컴포넌트에 띄워보기!
// pop Up  app.tsx 하위에 catPopUp 컴포넌트 만들기
// https://api.thecatapi.com/v1/images/search 이 api 써서 구현해보기.

// 1. axios 를 전역 객체로 만들어라.
// 2. axios 에다가 host 를 박아서 만들어라.
// const instance = axios.create({
//   baseURL: 'https://some-domain.com/api/',
//   headers: { 'X-Custom-Header': 'foobar' },
//   timeout: 1000,
// });

// [
// {
// id: "ddf",
// url: "https://cdn2.thecatapi.com/images/ddf.jpg",
// width: 637,
// height: 639
// }
// ]
// interface Cat{
//   id: string;
//   url: string;
//   width: number;
//   height: number;
// }
// function getCats = instance.get("/pets").then(function (response) {
//     // handle success
//     response
//   })

function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <TodoProvider>
      <InnerApp isDark={isDark} setIsDark={setIsDark} />
    </TodoProvider>
  );
}

export default App;
