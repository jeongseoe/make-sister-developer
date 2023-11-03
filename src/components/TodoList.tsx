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

  const 카테고리s = todos.map((todo) => todo.category);
  const uniqueCategories = 카테고리s.filter(
    (category, i) => 카테고리s.indexOf(category) === i
  );

  const searchIncludedTodos = todos.filter((todo) =>
    todo.text.includes(search)
  );
  const searchIncludedTodosCategories = searchIncludedTodos.map(
    (todo) => todo.category
  );
  const searchUniqueCategories = searchIncludedTodosCategories.filter(
    (category, i) => searchIncludedTodosCategories.indexOf(category) === i
  );

  // 쓰로틀링 디바운싱 알아보기(적용하는것도 좋을 듯)

  return (
    <TodoListBlock>
      <SearchBox>
        검색 : <SearchInput onChange={(e) => setSearch(e.target.value)} />
      </SearchBox>

      {search.length //검색한게 있다면?
        ? searchUniqueCategories.map((category) => {
            return (
              <>
                <div style={{ paddingBottom: "20px", paddingTop: "10px" }}>
                  {category}
                </div>
                {todos.map((todo) => {
                  if (
                    todo.text.includes(search) &&
                    todo.category === category
                  ) {
                    return (
                      <TodoItem
                        isDark={isDark}
                        key={todo.id}
                        id={todo.id}
                        text={todo.text}
                        isDone={todo.isDone}
                      />
                    );
                  }
                })}
              </>
            );
          })
        : uniqueCategories.map((category) => {
            return (
              <>
                <div style={{ paddingBottom: "20px", paddingTop: "10px" }}>
                  {category}
                </div>
                {todos.map((todo) => {
                  if (todo.category === `${category}`) {
                    return (
                      <TodoItem
                        isDark={isDark}
                        key={todo.id}
                        id={todo.id}
                        text={todo.text}
                        isDone={todo.isDone}
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
