// Imports
import React, { useState } from 'react';
import './css/home.css';
import AceEditor from "react-ace";
import FileSaver from 'file-saver';

// Modes
import 'ace-builds/src-min-noconflict/ext-searchbox';
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/mode-xml";
import "ace-builds/src-noconflict/mode-golang";
import "ace-builds/src-noconflict/mode-css";

// Themes
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-terminal";

export default function Home() {

    // State
    const [fileContent, setFileContent] = useState("");
    const [file,setFile] = useState();
    const [isChanged,set_isChange] = useState(false);
    const [fileType,setType] = useState("");
    const [fontSize,setFontSize] = useState("18px");
    const [theme,setTheme] = useState("monokai");

    // On Changing the value in the editor
    const onValueChange = value =>{
        set_isChange(value ? true : false)
        setFileContent(value);
    }

    // Set File type
    const setFileType = type =>{

        // Remove the prefix
        if(type == "text/html" || type == "text/plain"){
            setType(type.substring(5));
        }
        // .py .java files have type written like this "text/-xjava"
        else{
            setType(type.substring(7));
        }
    }

    // On File Upload
    const onFileUpload = event =>{

        // Get the file
        let read = event.target.files[0];
        setFile(read);

        // Initiate File Reader
        const reader = new FileReader();

        // On Load, set state fileContent to the content in the file
        reader.onload = function(e){
            let content = reader.result;
            setFileContent(content);
            set_isChange(true);
            setFileType(read.type);
        }

        // Read content in the file as text
        reader.readAsText(read);
    }

    // On Clicking Download
    const downloadFile = () => {

        // Encode the content into text
        let blob = new Blob([ new TextEncoder().encode(fileContent) ],{type: "text/plain"});

        // Different Downloads for File which is created from editor and file which is uploaded
        file ? FileSaver.saveAs(blob,file.name) : FileSaver.saveAs(blob,"sample." + fileType);
    }

    // Customizations for editor
    const modeChange = e =>{
        setType(e.target.value);
    }
    const themeChange = e =>{
        setTheme(e.target.value);
    }
    const sizeChange = e =>{
        setFontSize(e.target.value);
    }

    // Data for customizations
    const modes = ['txt','java','javascript','python','html','markdown','xml','golang','css'];
    const themes = ['monokai','github','terminal'];
    const sizes = ['18px','24px','28px','32px','40px'];

    return (
        <div>
            <div className="Main">
                
                <div className="tools">
                    <div className="row">
                    <div className="col-sm-3">
                        <input type="file" name="file" className="upload" onChange={onFileUpload} />
                        <button disabled={!isChanged} onClick={downloadFile} className="download"></button>
                        
                    </div>
                    <div className="col-sm-6">
                    <h1 className="title">Online Text Editor</h1>
                    </div>
                    <div className="col-sm-3 customize">

                        <select onChange={modeChange} value={fileType} className="mode">
                        {
                            modes.map(value => {
                            return <option value={value} className="mode-option">{value}</option>
                            })
                        }
                        </select>

                        <select onChange={themeChange} value={theme} className="mode">
                        {
                            themes.map(theme => {
                                return <option value={theme} className="mode-option">{theme}</option>
                            })
                        }
                        </select>

                        <select onChange={sizeChange} value={fontSize} className="mode">
                        {
                            sizes.map(size => {
                                return <option value={size} className="mode-option">{size}</option>
                            })
                        }
                        </select>
                    </div>

                    </div>
                    
                </div>

                <div className="editor shadow-lg">
                <AceEditor
                    fontSize={fontSize}
                    height='800px'
                    width='100%'
                    onChange={onValueChange}
                    mode={fileType}
                    theme={theme}
                    name="editor"
                    value={fileContent}
                    placeholder="Upload a file By Clicking on The Upload Icon or Write Your Text Here"
                />
                </div>
            </div>
        </div>
    );
}
