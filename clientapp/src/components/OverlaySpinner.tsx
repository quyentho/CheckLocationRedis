import { Button, Modal, Spinner } from "react-bootstrap";
import {
  StyledModal,
  StyledTransparentModelContent,
} from "./OverlaySpinner.styled";

export const OverlaySpinner = () => {
  return (
    <StyledModal show={true} backdrop="static" centered keyboard={false}>
      <Spinner variant="light" animation={"border"}></Spinner>
    </StyledModal>
  );
};
