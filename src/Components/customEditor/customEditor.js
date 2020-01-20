import React, { Component, Fragment } from 'react';
import AceEditor from 'react-ace';
import "ace-builds/src-min-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/snippets/javascript";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/snippets/html";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/snippets/css";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-emmet";
import './editor.css';
import Toolbar from '../toolbar/toolbar';
import FileSaver from 'file-saver';

export default class CustomEditor extends Component {
	bS = (a) => {
		return {
			height: "30vh",
			width: "2vw",
			top: ""+(a*30)+"vh",
			position: "absolute", "zIndex": -1,
		}
	}
	styl(a, b){
		return{
			height: ""+b+"vh",
			width: ""+(a-1)+"vw",
			padding: "0",
			margin: "0",
			border: "0px solid black",
			backgroundColor: "#888888",
			borderLeftWidth: "1vw",
			borderTopWidth: "1vh",
			textAlign: "left",
		}
	}
    aceRef = null
    reff = []
	width= ['60vw','38vw','38vw','38vw']
	height= ['86vh','26vh','26vh','26vh']
    constructor() {
        super()
        this.state = {
            isModalOpen: false,
            fileName: ["new.txt","new.txt","new.txt","new.txt"],
            fileType: ['text/javascript','text/javascript','text/javascript','text/javascript'],
			mode: ["javascript","javascript","javascript","javascript"],
			value: ["","","",""],
        }
		this.reff = [React.createRef(),React.createRef(),React.createRef(),React.createRef()]
    }

    componentDidMount() {
        
    }

    onFileUpload = (file) => {
        let fileName = this.state.fileName.slice(); fileName[0] = file.name;
        const fileType = this.state.fileType.slice(); fileType[0] = file.type;
        this.setState({ fileName, fileType });
        const reader = new FileReader();

        reader.onload = (e) => {
			let value = this.state.value;
			value[0] = e.target.result
            this.setState({value});
        }

        reader.readAsText(file, "UTF-8");
    }

    onFileDownload = () => {
        const file = new File([this.state.value], this.state.fileName[0], {type: this.state.fileType[0]+";charset=utf-8"});
        FileSaver.saveAs(file);
    }
	
	swape(ax,ay){
		let fileName = this.state.fileName.slice(); [fileName[ax],fileName[ay]]=[fileName[ay],fileName[ax]];
		let fileType = this.state.fileType.slice(); [fileType[ax],fileType[ay]]=[fileType[ay],fileType[ax]];
		let value = this.state.value.slice(); [value[ax],value[ay]]=[value[ay],value[ax]];
		let mode = this.state.mode.slice(); [mode[ax],mode[ay]]=[mode[ay],mode[ax]];
		this.setState({fileName,fileType,mode,value});
	}
	
	onChange(x){
		return ((newValue)=>{let value = this.state.value.slice(); value[x] = newValue; this.setState({value});})
	}
	
	functidy = () => {
		alert("Not completed yet");
		/*
		let q = [], val, re = '', spec = false;
		let value = this.state.value.slice();
		let code = value[0];
		for(let i = 0; i < code.length; i++){
			console.log('\''+code[i]+'\'');
		}
		for(let i = 0; i < code.length; i++){
			if(spec === true && code[i] !== '\n' && code[i] !== ''){
				re += '\n';
				for(let x = 0; x < val; x++){
					re += '\t';
				}
			}
			re += code[i];
			if(code[i] === '\n'){
				for(let x = 0; x < val; x++){
					re += '\t';
				}
			}
			if(code[i] === '{' ||code[i] === '['){
				q.push(code[i]);
				val++;
				spec = true;
			}else if(code[i] === '}'){
				while (q.length > 0 && q[q.length-1] !== '{'){
					val--;
				}
				spec = false;
			}else if(code[i] === ']'){
				while (q.length > 0 && q[q.length-1] !== '['){
					val--;
				}
				spec = false;
			}else{
				spec = false;
			}
			
		}
		console.log(re);
		//value[0] = re;
		//this.setState({value});
		*/
	}
	
    render() {
        return (
            <Fragment>
                <Toolbar onFileDownload={this.onFileDownload} onFileUpload={this.onFileUpload} make={(a)=>{let fileName = this.state.fileName.slice(); fileName[0] = a; this.setState({fileName});}} setMode = {(a) => {let mode = this.state.mode.slice(); mode[0] = a; this.setState({mode}); console.log(mode, this.state.mode);}} functidy = {this.functidy}/>
				<div style = {{position: "absolute", "zIndex": -2, left: "0vw", top: "48px"}}>
				<p style = {this.styl(60,3)}>{this.state.fileName[0]}</p>
                <AceEditor
                ref={this.reff[0]}
                placeholder="Start writing magic!"
                mode={this.state.mode[0]}
                theme="monokai"
                name="mainEditor"
                width={this.width[0]}
                height={this.height[0]}
                onLoad={this.onLoad}
                onChange={this.onChange(0)}
                fontSize={12}
                showPrintMargin={false}
                showGutter={true}
                highlightActiveLine={true}
                value={this.state.value[0]}
                setOptions={{
                enableBasicAutocompletion: true,
                enableEmmet: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,   
                showLineNumbers: true,
                tabSize: 4,
                }}
				/*
                commands={[
                    {   //custom commands for saving and opening files
                        name: 'saveFile', 
                        bindKey: {win: 'Ctrl-s', mac: 'Command-s'}, //key combination used for the command.
                        exec: () => { this.onFileDownload()}  //function to execute when keys are pressed.
                    }
                ]}
				*/
                />
				</div>
				<div style = {{position: "absolute", "zIndex": -1, left: "62vw", top: "48px"}}>
				<p style = {this.styl(38,3)}>{this.state.fileName[1]}</p>
				<AceEditor
                ref={this.reff[1]}
                placeholder="Start writing magic!"
                mode={this.state.mode[1]}
                theme="monokai"
                name="mainEditor"
                width={this.width[1]}
                height={this.height[1]}
                onLoad={this.onLoad}
                onChange={this.onChange(1)}
                fontSize={12}
                showPrintMargin={false}
                showGutter={true}
                highlightActiveLine={true}
                value={this.state.value[1]}
                setOptions={{
                enableBasicAutocompletion: true,
                enableEmmet: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,   
                showLineNumbers: true,
                tabSize: 2,
                }}
				/*
                commands={[
                    {   //custom commands for saving and opening files
                        name: 'saveFile', 
                        bindKey: {win: 'Ctrl-s', mac: 'Command-s'}, //key combination used for the command.
                        exec: () => { this.onFileDownload()}  //function to execute when keys are pressed.
                    }
                ]}
				*/
                />
				<p style = {this.styl(38,3)}>{this.state.fileName[2]}</p>
				<AceEditor
                ref={this.reff[2]}
                placeholder="Start writing magic!"
                mode={this.state.mode[2]}
                theme="monokai"
                name="mainEditor"
                width={this.width[2]}
                height={this.height[2]}
                onLoad={this.onLoad}
                onChange={this.onChange(2)}
                fontSize={12}
                showPrintMargin={false}
                showGutter={true}
                highlightActiveLine={true}
                value={this.state.value[2]}
                setOptions={{
                enableBasicAutocompletion: true,
                enableEmmet: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,   
                showLineNumbers: true,
                tabSize: 2,
                }}
				/*
                commands={[
                    {   //custom commands for saving and opening files
                        name: 'saveFile', 
                        bindKey: {win: 'Ctrl-s', mac: 'Command-s'}, //key combination used for the command.
                        exec: () => { this.onFileDownload()}  //function to execute when keys are pressed.
                    }
                ]}
				*/
                />
				<p style = {this.styl(38,3)}>{this.state.fileName[3]}</p>
				<AceEditor
                ref={this.reff[3]}
                placeholder="Start writing magic!"
                mode={this.state.mode[3]}
                theme="monokai"
                name="mainEditor"
                width={this.width[3]}
                height={this.height[3]}
                onLoad={this.onLoad}
                onChange={this.onChange(3)}
                fontSize={12}
                showPrintMargin={false}
                showGutter={true}
                highlightActiveLine={true}
                value={this.state.value[3]}
                setOptions={{
                enableBasicAutocompletion: true,
                enableEmmet: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,   
                showLineNumbers: true,
                tabSize: 2,
                }}
				/*
                commands={[
                    {   //custom commands for saving and opening files
                        name: 'saveFile', 
                        bindKey: {win: 'Ctrl-s', mac: 'Command-s'}, //key combination used for the command.
                        exec: () => { this.onFileDownload()}  //function to execute when keys are pressed.
                    }
                ]}
				*/
                />
				</div>
				<div style = {{position: "absolute", "zIndex": -1, left: "60vw", top: "48px"}}>
					<button style = {this.bS(0)} onClick = {()=>{this.swape(0,1)}}>{"<"}</button>
					<button style = {this.bS(1)} onClick = {()=>{this.swape(0,2)}}>{"<"}</button>
					<button style = {this.bS(2)} onClick = {()=>{this.swape(0,3)}}>{"<"}</button>
				</div>
            </Fragment>      
        )
    }

}