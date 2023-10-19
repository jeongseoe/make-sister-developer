import React from "react";
import styled, { css } from "styled-components";

const TodoTemplateBlock = styled.div<{ isDark: boolean }>`
  width: 512px;
  height: 768px;

  position: relative; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
  background: white;
  border-radius: 16px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);

  margin: 0 auto; /* 페이지 중앙에 나타나도록 설정 */

  margin-top: 96px;
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
  ${(props) =>
    props.isDark &&
    css`
      background: #2c4359;
    `}
`;

// 타입스크립트에서는 프롭스로 사용하는 것도 인터페이스로 타입을 지정해줘야 사용할 수 있다.
interface Props {
  children: React.ReactNode;
  isDark: boolean;
}

function TodoTemplate(props: Props) {
  const { children, isDark } = props;

  return <TodoTemplateBlock isDark={isDark}>{children}</TodoTemplateBlock>;
}

export default TodoTemplate;
