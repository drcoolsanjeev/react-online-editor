import 'filepond/dist/filepond.min.css';
import { FontSizes, FontWeights, getTheme, mergeStyleSets, Modal } from 'office-ui-fabric-react';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import React, { Component } from 'react';
import { FilePond } from 'react-filepond';
import './toolbar.css';
import 'ace-builds/src-min-noconflict/ext-searchbox';
//icons for fabric ui
initializeIcons();

const theme = getTheme();
const contentStyles = mergeStyleSets({
    container: {
      display: 'flex',
      flexFlow: 'column nowrap',
      alignItems: 'stretch'
    },
    header: [
      theme.fonts.xLargePlus,
      {
        flex: '1 1 auto',
        borderTop: `4px solid ${theme.palette.themePrimary}`,
        color: theme.palette.neutralPrimary,
        display: 'flex',
        fontSize: FontSizes.xLarge,
        alignItems: 'center',
        fontWeight: FontWeights.semibold,
        padding: '12px 12px 14px 24px'
      }
    ],
    body: {
      flex: '4 4 auto',
      padding: '0 24px 24px 24px',
      overflowY: 'hidden',
      selectors: {
        p: {
          margin: '14px 0'
        },
        'p:first-child': {
          marginTop: 0
        },
        'p:last-child': {
          marginBottom: 0
        }
      }
    }
  });
  

export default class Toolbar extends Component {
    state = {
		newModal: false,
        isModalOpen: false,
        fileUploaded: false,
        files: [],
        fileCount: 0,
		op: 0,
		redic: '',
    }

    handleUpload = () => {
        this.setState({isModalOpen: true})
    }
    closeModal = () => {
        this.setState({isModalOpen: false})
    }
	
	items = [
			{
				key: 'file',
				text: 'File',
				iconProps: { iconName: "Page" },
				subMenuProps: {
					items: [
						{
							key: 'upload',
							text: 'Open',
							iconProps: { iconName: 'Folder' },
							onClick: this.handleUpload,
						},
						{
							key: 'download',
							text: 'Download',
							iconProps: { iconName: 'Download' },
							onClick: () => this.props.onFileDownload()
						},
						{
							key: 'new',
							text: 'Change file name',
							iconProps: { iconName: 'Add' },
							onClick: () => {console.log("X");let name = window.prompt("Enter the file name:", "new.txt"); if(name === null || name === ""){}else{this.props.make(name)};},
						},
					]
				}
			},
			{
				key: 'edit',
				text: 'Edit',
				iconProps: { iconName: 'Edit' },
				subMenuProps: {
					items: [
						{
							key: 'tidy',
							text: 'Tidy code',
							subMenuProps: {
								items: [
									{
										key: 'tidyjs',
										text: 'Javascript',
										onClick: () => {console.log("?"); this.props.functidy()},
									},
								]
							}
						},
						{
							key: 'mode',
							text: 'Mode',
							subMenuProps: {
								items: [
									{
										key: 'mhtml',
										text: 'Html',
										onClick: () => this.props.setMode('html'),
									},
									{
										key: 'mcss',
										text: 'Css',
										onClick: () => this.props.setMode('css'),
									},
									{
										key: 'mjs',
										text: 'Javascript',
										onClick: () => this.props.setMode('javascript'),
									},
								]
							}
						},
					]
				}
			},
			{
				key: 'help',
				text: 'Help',
				iconProps: { iconName: 'Help' },
				subMenuProps: {
					items: [
						{
							key: 'html',
							text: 'HTML',
							onClick: ()=> window.open("https://www.w3schools.com/html/default.asp", "_blank"),
						},
						{
							key: 'css',
							text: 'CSS',
							onClick: ()=> window.open("https://www.w3schools.com/css/default.asp", "_blank"),
						},
						{
							key: 'javascript',
							text: 'JAVASCRIPT',
							onClick: ()=> window.open("https://www.w3schools.com/js/default.asp", "_blank"),
						},
						{
							key: 'react',
							text: 'REACT.JS',
							onClick: ()=> window.open("https://reactjs.org/tutorial/tutorial.html", "_blank"),
						},
						{
							key: 'react reference',
							text: 'React Reference',
							onClick: ()=> window.open("https://www.npmjs.com","_blank"),
						}
					]
				}
			},
	];
	
    farItems = [
        {
          key: 'info',
          text: 'Info',
          // This needs an ariaL    abel since it's icon-only
          ariaLabel: 'Info',
          iconOnly: true,
          iconProps: { iconName: 'Info' },
          onClick: () => console.log('Info')
        }
    ];
    
    render() {
        const { fileCount, isModalOpen, files } = this.state;

        return (
            <div>
			<div> {this.state.redic} </div>
            <CommandBar
                items={this.items}
                overflowItems={this._overflowItems}
                overflowButtonProps={this.overflowProps}
                farItems={this.farItems}
                ariaLabel="Use left and right arrow keys to navigate between commands"
            />
            <Modal
                isOpen={isModalOpen}
                isBlocking={false}
                onDismiss={this.closeModal}
            >
                <div className={contentStyles.header}>
                    <span>Upload a file to edit</span>
                </div>
                <FilePond 
                    required={true} 
                    allowBrowse={true} 
                    allowMultiple={false} 
                    allowPaste={true} 
                    allowDrop={true} 
                    dropOnPage={true}
                    maxFiles={1}
                    ref={ref => this.pond = ref}
                    files={files}
                    className="fileUploadBox"
                    onupdatefiles={fileItems => {
                        this.setState({
                          files: fileItems.map(fileItem => fileItem.file)
                        });
                        if(fileItems.length > 0) {
                            this.props.onFileUpload(fileItems[0].file)
                            if(fileCount === 0) {
                                this.setState({isModalOpen: false})
                                this.setState({fileCount: 1})
                            }
                        }
                      }}    
                    />
            </Modal>
            </div>
        );
    }
};
