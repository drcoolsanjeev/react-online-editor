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
    const [isChanged,set_isChange] = useState(false);
    const [fileType,setType] = useState("");
    const [fontSize,setFontSize] = useState(18);
    const [theme,setTheme] = useState("monokai");

    const onValueChange = value =>{
        set_isChange(value ? true : false)
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
            set_isChange(true);
            setFileType(read);
        }
        reader.readAsText(read);
    }

    const downloadFile = () => {
        let blob = new Blob([ new TextEncoder().encode(file) ],{type: "text/plain"});   
        actualFile ? FileSaver.saveAs(blob,actualFile.name) : FileSaver.saveAs(blob,"sample." + fileType);
    }

    const modeChange = e =>{
        setType(e.target.value);
    }
    const themeChange = e =>{
        setTheme(e.target.value);
    }
    const sizeChange = e =>{
        setFontSize(e.target.value);
    }
    let Aceditor = React.createRef();
    

    return (
        <div>
            <div className="Main">
                <h1 className="title">Online Text Editor</h1>
                <div className="tools">
                    <div className="row">
                    <div className="col-sm-3">
                        <input type="file" name="file" className="upload" onChange={onChange} />
                        <button disabled={!isChanged} onClick={downloadFile} className="download"></button>
                        
                    </div>
                    <div className="col-sm-3"></div>
                    <div className="col-sm-3"></div>
                    <div className="col-sm-3">

                    <select onChange={modeChange} value={fileType} className="mode">
                            <option value="txt" className="mode-option">Text</option>
                            <option value="java" className="mode-option">java</option>
                            <option value="python" className="mode-option">python</option>
                            <option value="html" className="mode-option">html</option>
                    </select>

                    <select onChange={themeChange} value={theme} className="mode">
                            <option value="monokai" className="mode-option">monokai</option>
                            <option value="github" className="mode-option">github</option>
                            <option value="terminal" className="mode-option">terminal</option>
                    </select>

                    <select onChange={sizeChange} value={fontSize} className="mode">
                        <option value={19} className="mode-option">18</option>  
                        <option value={24} className="mode-option">24</option>
                        <option value={34} className="mode-option">34</option>     
                        <option value={54} className="mode-option">54</option>
                    </select>
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
                    theme={theme}
                    name="id1"
                    value={file}
                    placeholder="Upload a file By Clicking on The Upload Icon or Write Your Text Here"
                />
                </div>
            </div>
        </div>
    );
}
