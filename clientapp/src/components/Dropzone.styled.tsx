import styled from "styled-components";
import { IGetColorProps } from "./Dropzone";

const getColor = (props: IGetColorProps) => {
  if (props.isDragAccept) {
    return "#69db7c";
  }
  if (props.isDragReject) {
    return "#f03e3e";
  }
  if (props.isFocused) {
    return "#2196f3";
  }
  return "#eeeeee";
};

export const StyledDropzone = styled.div.attrs({
  className: "container",
})`
  max-height: 34rem;
  background-color: #e7f5ff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledContainer = styled.div`
  font-size: 1.6rem;
  height: 30rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${(props: IGetColorProps) => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
`;

export const StyledErrorAside = styled.aside`
  color: #f03e3e;
  ul {
    list-style: none;
  }
`;
