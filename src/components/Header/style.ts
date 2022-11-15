import styled from "styled-components";

interface IHeaderTagProps {
  color?: string;
}

export const HeaderTag = styled.header<IHeaderTagProps>`
  padding: 20px;
  border: 1px solid ${(props) => props.color || "blue"};

  &:hover {
    background: yellow;
  }

  @media (min-width: 500px) {
    background: gray;
  }
`;
