import { useFormik } from "formik";
import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { object, string } from "yup";
import { CheckLocationResponse } from "../common/types";
import ResultTable from "../components/ResultTable";

const locationsSchema = object().shape({
  addresses: string().required(),
});
export const CheckLocationsPage = () => {
  const [checkLocationResults, setCheckLocationResults] = useState<
    CheckLocationResponse[] | undefined
  >();
  const formik = useFormik({
    initialValues: {
      addresses: "",
    },
    // onReset: () => {
    //   // setCheckLocationResults(undefined);
    // },
    onSubmit: async (values, formikHelpers) => {
      const addresses = values.addresses
        .split(/\r?\n/)
        .map((s) => s.trim())
        .filter(Boolean);

      try {
        const response = await fetch("/api/check-locations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ addresses: addresses }),
        });
        const checkResults = await response.json();
        setCheckLocationResults(checkResults);
      } catch (error) {}
    },
    validationSchema: locationsSchema,
  });
  return (
    <Container>
      <Row>
        <Col>
          <Form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Input Addresses:</Form.Label>
                  <Form.Control
                    name="addresses"
                    value={formik.values.addresses}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    as="textarea"
                    rows={10}
                  />
                </Form.Group>
                <div className="d-flex justify-content-end">
                  <Button size="lg" type="submit">
                    Check
                  </Button>
                  <Button
                    size="lg"
                    onClick={() => {
                      formik.resetForm();
                      setCheckLocationResults(undefined);
                    }}
                    variant="secondary"
                    type="button"
                    className="ms-4"
                  >
                    Clear
                  </Button>
                </div>
              </Col>

              <Col className="mt-4" md={6}>
                {checkLocationResults && (
                  <ResultTable
                    checkLocationResults={checkLocationResults}
                  ></ResultTable>
                )}
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
