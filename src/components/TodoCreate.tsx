import React, { useState } from "react";
import styled, { css } from "styled-components";
import { MdAdd } from "react-icons/md";
import { useTodoDispatch } from "./TodoContext";

const CircleButton = styled.button<{ open: boolean }>`
  //숙제 Todo 바탕화면 다크모드일때 변경될거 변수로 빼기
  background: #38d9a9;
  &:hover {
    background: #63e6be;
  }
  &:active {
    background: #20c997;
  }
  z-index: 5;
  cursor: pointer;
  width: 80px;
  height: 80px;
  display: block;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  position: absolute;
  left: 50%;
  bottom: 0px;
  transform: translate(-50%, 50%);
  color: white;
  border-radius: 50%;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.125s all ease-in;
  ${(props) =>
    props.open &&
    css`
      background: #ff6b6b;
      &:hover {
        background: #ff8787;
      }
      &:active {
        background: #fa5252;
      }
      transform: translate(-50%, 50%) rotate(45deg);
    `}
`;

const InsertFormPositioner = styled.div`
  width: 100%;
  bottom: 0;
  left: 0;
  position: absolute;
`;

const InsertForm = styled.form<{ dark: boolean }>`
  background: #f8f9fa;
  padding-left: 32px;
  padding-top: 32px;
  padding-right: 32px;
  padding-bottom: 72px;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  border-top: 1px solid #e9ecef;
  ${(props) =>
    props.dark &&
    css`
      background: #536a7e;
    `}
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  width: 100%;
  outline: none;
  font-size: 18px;
  box-sizing: border-box;
`;

interface Props {
  dark: boolean;
}

function TodoCreate(props: Props) {
  // 숙제 응집성 키워드 공부하기 a에서 쓰이는 코드는 a에서만 정의해둬도 된다.
  // 만약 여러군데 써야하는 거면 부모에 올려두는게 맞지만, 아니면 혼자만 써도된다.
  const { dark } = props;
  const [open, setOpen] = useState(false);

  const onToggle = () => setOpen(!open);

  const [value, setValue] = useState("");
  const dispatch = useTodoDispatch();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({
      type: "CREATE",
      text: value,
    });
    setValue("");
  };

  return (
    <>
      {open && (
        <InsertFormPositioner>
          <InsertForm dark={dark} onSubmit={onSubmit}>
            <Input
              autoFocus
              placeholder="할 일을 입력 후, Enter 를 누르세요"
              onChange={(e) => setValue(e.target.value)}
              value={value}
            />
          </InsertForm>
        </InsertFormPositioner>
      )}
      <CircleButton onClick={onToggle} open={open}>
        <MdAdd />
      </CircleButton>
    </>
  );
}

export default TodoCreate;
