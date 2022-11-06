import { useState } from "react";
import { Col, Container, Row, Toast, ToastContainer } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
import Dropzone from "../components/Dropzone";
import { OverlaySpinner } from "../components/OverlaySpinner";
import { BiError } from "react-icons/bi";
import { GrStatusGood } from "react-icons/gr";

export const UploadFilePage = () => {
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  // const navigate = useNavigate();
  const handleFileSubmission = (selectedFile: File) => {
    if (!selectedFile) return;

    setLoading(true);
    const formData = new FormData();

    formData.append("csvFile", selectedFile!);

    fetch("/api/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          setIsSuccess(true);
        } else {
          setIsError(true);
        }
      })
      .catch((error) => {
        setIsError(true);
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Row className="position-relative">
        <ToastContainer position="top-end">
          <Toast
            bg="success"
            onClose={() => setIsSuccess(false)}
            show={isSuccess}
            delay={3000}
            autohide
          >
            <Toast.Header closeButton={true} style={{ gap: "0.4rem" }}>
              <GrStatusGood className="mr-2"></GrStatusGood>
              <strong className="me-auto">Success</strong>
            </Toast.Header>
            <Toast.Body>Thành công</Toast.Body>
          </Toast>
          <Toast
            bg="danger"
            onClose={() => setIsError(false)}
            show={isError}
            delay={3000}
            autohide
          >
            <Toast.Header closeButton={true} style={{ gap: "0.4rem" }}>
              <BiError></BiError>
              <strong className="me-auto">Error</strong>
            </Toast.Header>
            <Toast.Body>Có gì đó sai sai</Toast.Body>
          </Toast>
        </ToastContainer>
      </Row>

      <Row>
        {loading && <OverlaySpinner></OverlaySpinner>}

        <Col xs="12">
          <Container>
            <Dropzone onChange={handleFileSubmission}></Dropzone>
          </Container>
        </Col>
      </Row>
    </>
  );
};
