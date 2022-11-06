import { useRef } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { CheckLocationResponse } from "../common/types";
import { selectElementContents } from "../utils/copyElementToClipboard";

interface IProps {
  checkLocationResults: CheckLocationResponse[];
}
function ResultTable({ checkLocationResults }: IProps) {
  const tableRef = useRef<HTMLTableElement>(null);
  return (
    <>
      <div>
        <Button
          onClick={(e: React.MouseEvent<HTMLElement>) => {
            selectElementContents(tableRef.current as HTMLElement);
          }}
        >
          Copy to clipboard
        </Button>
      </div>
      <Table striped bordered hover ref={tableRef}>
        <thead>
          <tr>
            <th>#</th>
            <th>Address</th>
            <th>Deliverable?</th>
            <th>Valid City</th>
            <th>Valid Area</th>
          </tr>
        </thead>
        <tbody>
          {checkLocationResults.map((result, index) => (
            <>
              {(!result.isDeliverable ||
                result.validLocations!.length === 1) && (
                <tr
                  className={
                    result.isDeliverable ? "table-success" : "table-danger"
                  }
                >
                  {result.isDeliverable && result.validLocations!.length === 1 && (
                    <>
                      <td>
                        <b>{index + 1}</b>
                      </td>
                      <td>{result.address}</td>
                      <td style={{ verticalAlign: "middle" }}>
                        <b>YES</b>
                      </td>
                      <td>{result.validLocations![0].city}</td>
                      <td>{result.validLocations![0].area}</td>
                    </>
                  )}

                  {!result.isDeliverable && (
                    <>
                      <td>
                        <b>{index + 1}</b>
                      </td>
                      <td>{result.address}</td>
                      <td style={{ verticalAlign: "middle" }}>
                        <b>NO</b>
                      </td>
                      <td></td>
                      <td></td>
                    </>
                  )}
                </tr>
              )}

              {result.isDeliverable && result.validLocations!.length > 1 && (
                <>
                  <tr className="table-success">
                    <td rowSpan={result.validLocations?.length}>{index + 1}</td>
                    <td rowSpan={result.validLocations?.length}>
                      {result.address}
                    </td>
                    <td
                      style={{ verticalAlign: "middle" }}
                      rowSpan={result.validLocations?.length}
                    >
                      <b>YES</b>
                    </td>
                    <td>{result.validLocations![0].city}</td>
                    <td>{result.validLocations![0].area}</td>
                  </tr>

                  <tr className="table-success">
                    {result.validLocations?.slice(1).map((location) => (
                      <>
                        <td>{location.city}</td>
                        <td>{location.area}</td>
                      </>
                    ))}
                  </tr>
                </>
              )}
            </>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default ResultTable;
