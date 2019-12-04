import React, { Component, Fragment } from 'react'
import CustomEditor from '../Components/customEditor/customEditor'
import Toolbar from '../Components/toolbar/toolbar'

export default class Editor extends Component {
    

    
    render() {
        return (
            <Fragment>
                {/* <Toolbar/> */}
                <CustomEditor/>
            </Fragment>
        )
    }
}