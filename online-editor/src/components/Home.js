import React, { useState } from 'react';
import './css/home.css';
import AceEditor from "react-ace";
import FileSaver from 'file-saver';

import 'ace-builds/src-min-noconflict/ext-searchbox';
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/mode-xml";
import "ace-builds/src-noconflict/mode-golang";
import "ace-builds/src-noconflict/mode-coffee";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/mode-handlebars";

import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-solarized_light";
import "ace-builds/src-noconflict/theme-terminal";
import "ace-builds/src-noconflict/theme-textmate";

export default function Home() {

    const [file, setfile] = useState("");
    const [actualFile,setAcFile] = useState();
    const [isfile,set_isFile] = useState(false);
    const [fileType,setType] = useState("");
    const [fontSize,setFontSize] = useState(18);

    const onValueChange = value =>{
        setfile(value);
    }
    const setFileType = read =>{
        const type = read.type;
        if(type == "text/html" || type == "text/plain"){
            setType(type.substring(5));
        }
        else{
            setType(type.substring(7));
        }
    }
    const onChange = event =>{
        let read = event.target.files[0];
        console.log(read);
        setAcFile(read);

        const reader = new FileReader();
        reader.onload = function(e){
            let content = reader.result;
            setfile(content);
            set_isFile(true);
            setFileType(read);
        }
        reader.readAsText(read);
    }


    const downloadFile = () => {
        let blob = new Blob([ new TextEncoder().encode(file) ],{type: "text/plain"});
        FileSaver.saveAs(blob,actualFile.name);
    }

    const CustomChange = (type,event) =>{
        if(type == "fontSize"){
            if(event.target.value){
                setFontSize(event.target.value);
                console.log(fontSize);
            }
            
        }
    }
    let Aceditor = React.createRef();
    

    return (
        <div>
            <div className="Main">
                <h1 className="title">Online Text Editor</h1>
                <div className="container tools">
                    <div className="row">
                    <div className="col-sm-6">
                        <form>
                            <label>Upload Your File</label>
                            <input type="file" name="file" onChange={onChange} />
                        </form>
                    </div>

                    <div className="col-sm-3">
                        <label>Font Size:</label>
                        <select onChange={(e) => CustomChange("fontSize",e)} value={fontSize} className="option">
                            <option value="18" className="option">18</option>  
                            <option value="24">24</option>
                            <option value="34">34</option>
                            <option value="52">52</option>
                            <option value="82">82</option>
                            <option value="102">102</option>
                        </select>
                    </div>

                    <div className="col-sm-3">
                        <button disabled={!isfile} onClick={downloadFile}>Download</button>
                    </div>
                    </div>
                </div>

                <div className="editor shadow-lg">
                <AceEditor
                    ref={Aceditor}
                    fontSize={fontSize}
                    height='700px'
                    width='100%'
                    onChange={onValueChange}
                    mode={fileType}
                    theme="monokai"
                    name="id1"
                    value={file}
                    placeholder="Upload a file or Write Your Text Here"
                />
                </div>
            </div>
        </div>
    )
}
