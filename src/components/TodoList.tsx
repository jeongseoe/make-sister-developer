import React, { useState } from "react";
import styled from "styled-components";
import TodoItem from "./TodoItem";
import { useTodoState } from "./TodoContext";

const TodoListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 290px;
  overflow: scroll;
`;

const SearchBox = styled.div`
  dispaly: flex;
`;

const SearchInput = styled.input`
  outline: none;
  padding: 10px;
  border: 1px solid lightGray;
  border-radius: 3px;
  margin-left: 10px;
`;

interface Props {
  isDark: boolean;
}

function TodoList(props: Props) {
  const { isDark } = props;
  const todos = useTodoState();
  const [search, setSearch] = useState("");

  const 카테고리 = todos.map((a) => a.category);
  const 중복제거 = 카테고리.filter((v, i) => 카테고리.indexOf(v) === i);

  const 검색 = todos.filter((v) => v.text.includes(search));
  const 검색카테고리 = 검색.map((a) => a.category);
  const 검색중복제거 = 검색카테고리.filter(
    (v, i) => 검색카테고리.indexOf(v) === i
  );

  // 쓰로틀링 디바운싱 알아보기(적용하는것도 좋을 듯)

  return (
    <TodoListBlock>
      <SearchBox>
        검색 : <SearchInput onChange={(e) => setSearch(e.target.value)} />
      </SearchBox>

      {search.length //검색한게 있다면?
        ? 검색중복제거.map((title) => {
            return (
              <>
                <div style={{ paddingBottom: "20px", paddingTop: "10px" }}>
                  {title}
                </div>
                {todos.map((item) => {
                  if (
                    item.text.includes(`${search}`) &&
                    item.category === `${title}`
                  ) {
                    return (
                      <TodoItem
                        isDark={isDark}
                        key={item.id}
                        id={item.id}
                        text={item.text}
                        isDone={item.isDone}
                      />
                    );
                  } else if (
                    !item.text.includes(`${search}`) &&
                    item.category === `${title}`
                  ) {
                    return;
                  }
                })}
              </>
            );
          })
        : 중복제거.map((title) => {
            return (
              <>
                <div style={{ paddingBottom: "20px", paddingTop: "10px" }}>
                  {title}
                </div>
                {todos.map((item) => {
                  if (item.category === `${title}`) {
                    return (
                      <TodoItem
                        isDark={isDark}
                        key={item.id}
                        id={item.id}
                        text={item.text}
                        isDone={item.isDone}
                      />
                    );
                  }
                })}
              </>
            );
          })}
    </TodoListBlock>
  );
}

export default TodoList;
