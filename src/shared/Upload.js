import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../elements";
import { storage } from "./firebase";

import { actionCreators as imageActions } from "../redux/modules/image";

const Upload = (props) => {
    const dispatch = useDispatch();
    const uploading = useSelector((state) => state.image.uploading);
    const fileInput = React.useRef();

    const selectFile = (e) => {
        console.log(e.target.files);
        console.log(e.target.files[0]);
        console.log(fileInput.current.files[0]);
    };

    const uploadFB = () => {
        if (!fileInput.current || fileInput.current.files.length === 0) {
        window.alert("파일을 선택해주세요!");
        return;
        }
    
        dispatch(imageActions.uploadImageFB(fileInput.current.files[0]));
    };
    
    return (
        <React.Fragment>
        <input
            type="file"
            ref={fileInput}
            onChange={selectFile}
            disabled={uploading}
        />
        <Button _onClick={uploadFB}>업로드하기</Button>
        </React.Fragment>
    );
    };
    
    export default Upload;