import React from "react";
import { useDropzone } from "react-dropzone";
import { MaxFileSize } from "../common/constants";
import {
  StyledContainer,
  StyledDropzone,
  StyledErrorAside,
} from "./Dropzone.styled";

export interface IGetColorProps {
  isFocused: boolean;
  isDragAccept: boolean;
  isDragReject: boolean;
}
function fileSizeValidator(file: File) {
  if (file.size > MaxFileSize) {
    return {
      code: "file-too-large",
      message: `File is larger than ${MaxFileSize / (1024 * 1024)} MB`,
    };
  }

  return null;
}

interface IDropzoneProps {
  onChange: (file: File) => void;
}
export default function Dropzone(props: IDropzoneProps) {
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    acceptedFiles,
    fileRejections,
  } = useDropzone({
    accept: { "text/csv": [] },
    maxFiles: 1,
    validator: fileSizeValidator,
    onDropAccepted: (files: File[], e: any) => props.onChange(files[0]),
  });
  const file = acceptedFiles[0];

  return (
    <div>
      <StyledDropzone>
        <StyledContainer
          {...getRootProps({ isFocused, isDragAccept, isDragReject })}
        >
          <input {...getInputProps()} />
          <p>Drag 'n' drop csv file here, or click to select file</p>
          <p>{file?.name}</p>
        </StyledContainer>
      </StyledDropzone>
      <StyledErrorAside>
        <ul>
          {fileRejections?.map(({ errors }) =>
            errors.map((e) => <li key={e.code}>{e.message}</li>)
          )}
        </ul>
      </StyledErrorAside>
    </div>
  );
}
