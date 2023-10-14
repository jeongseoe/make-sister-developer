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

function InnerApp() {
  const dispatch = useTodoDispatch();
  const todos = useTodoState();
  const dark = todos.isDarkMode;

  // style 변수
  const backgroundDark = String(todos.isDarkMode);
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

  const darkMode = () =>
    dispatch({ type: "COLOR", isDarkMode: !todos.isDarkMode });

  return (
    <>
      <Global />
      <TodoTemplate dark={dark}>
        <TodoHead dark={dark} />
        <TodoList dark={dark} />
        <TodoCreate dark={dark} />
      </TodoTemplate>
      <div
        style={{
          marginTop: "-200px",
          display: "flex",
          justifyContent: "right",
          marginRight: "300px",
        }}
      >
        <StyleButton onClick={darkMode}>Dark Mode</StyleButton>
      </div>
    </>
  );
}

function App() {
  return (
    <TodoProvider>
      <InnerApp />
    </TodoProvider>
  );
}

export default App;
