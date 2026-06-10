import { Button, styled, Typography } from '@mui/material';
import React, { useState } from 'react';

const DrageDropFileUpload = ({ title, fileUploadButtonTitle, value, onChange }: { title: string, fileUploadButtonTitle: string, value: Array<any>, onChange: (val: Array<any>) => any }) => {
  const inputRef = React.useRef<any>(null);
  const [dragActive, setDragActive] = useState(false);
  const handleDrag = function (e: any) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = function (e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleChange(e.dataTransfer.files)
    }
  };

  const onButtonClick = () => {
    inputRef.current.click();
  };

  const handleFileInputChange = (e: any) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleChange(e.target.files);
    }
  }

  const handleChange = (files: any) => {
    if (files && files.length) {
      const uploaded: Array<any> = [...value];
      for (let index = 0; index < files.length; index++) {
        const file = files[index];
        if (uploaded.findIndex((f: any) => f.name === file.name) === -1) {
          uploaded.push(file);
        }
      }

      onChange(uploaded);
    }
  }

  return (
    <FileUploadContainer onDragEnter={handleDrag} onSubmit={(e: any) => e.preventDefault()}>
      <input ref={inputRef} type="file" id="input-file-upload" multiple={true} onChange={handleFileInputChange} />
      <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : ""}>
        <div>
          <Typography>{title || 'Drag and drop your file here or'}</Typography>
          <Button className="upload-button" onClick={onButtonClick}>{fileUploadButtonTitle || 'Upload a file'}</Button>
        </div>
      </label>
      {dragActive && <div className="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div>}
    </FileUploadContainer>
  )
}

export default DrageDropFileUpload;

const FileUploadContainer = styled('div')(({ theme }: any) => ({
  height: '16rem',
  // width: '28rem',
  maxWidth: '100%',
  textAlign: 'center',
  position: 'relative',
  '& input[type=file]': {
    display: 'none'
  },
  '& label': {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: '2px',
    borderRadius: '1rem',
    borderStyle: 'dashed',
    borderColor: '#cbd5e1',
    backgroundColor: '#f8fafc'
  },
  '& label.drag-active': {
    backgroundColor: '#ffffff'
  },
  '& .drag-file-element': {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: '1rem',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px'
  }
}));
