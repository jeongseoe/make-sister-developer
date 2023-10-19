import React from "react";
import styled, { css } from "styled-components";
import { MdDone, MdDelete } from "react-icons/md";
import { useTodoDispatch } from "./TodoContext";

const Remove = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: #ff6b6b;
  }
  display: none;
`;

const TodoItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  &:hover {
    ${Remove} {
      display: initial;
    }
  }
`;

// styled 에 props를 사용할 때도 타입을 지정해야한다.
const CheckCircle = styled.div<{ isDone: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  border: 1px solid #ced4da;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  ${(props) =>
    props.isDone &&
    css`
      border: 1px solid #38d9a9;
      color: #38d9a9;
    `}
`;

const Text = styled.div<{ isDone: boolean; isDark: boolean }>`
  flex: 1;
  font-size: 21px;
  color: #495057;

  ${(props) =>
    props.isDark === props.isDone &&
    css`
      color: #475858;
    `}

  ${(props) =>
    props.isDark !== props.isDone &&
    css`
      color: #c7c9cb;
    `}
`;

interface Props {
  isDark: boolean;
  isDone: boolean;
  text: string;
  id: number;
}

function TodoItem(props: Props) {
  const { isDone, text, id, isDark } = props;

  const dispatch = useTodoDispatch();

  const toggleTodo = () => dispatch({ type: "TOGGLE", id });
  const removeToggle = () => dispatch({ type: "REMOVE", id });

  // Todo에 action을 부여하기 위한 dispatch와 eventHandler
  return (
    <TodoItemBlock>
      <CheckCircle isDone={isDone} onClick={toggleTodo}>
        {isDone && <MdDone />}
      </CheckCircle>
      <Text isDark={isDark} isDone={isDone}>
        {text}
      </Text>
      <Remove onClick={removeToggle}>
        <MdDelete />
      </Remove>
    </TodoItemBlock>
  );
}

export default TodoItem;
