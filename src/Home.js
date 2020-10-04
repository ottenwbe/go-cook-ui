/* 
 *  MIT License
 *  
 *  Copyright (c) 2020 Beate Ottenwälder
 *  
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *  
 *  The above copyright notice and this permission notice shall be included in all
 *  copies or substantial portions of the Software.
 *  
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *  SOFTWARE.
 */

import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { PageHeader } from './PageHeader';


const { REACT_APP_WELCOME_TEXT, REACT_APP_WELCOME_SUB_TEXT } = process.env;

export class Home extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            value: '',
            portions: 1
         };
    }

    render() {
        return (<div>
            <PageHeader pageName="Recipe News" />
            <Card style={{ align: 'center' }}>
                <CardHeader title={REACT_APP_WELCOME_TEXT} subheader={REACT_APP_WELCOME_SUB_TEXT} style={{ textAlign: 'center', backgroundColor: "#2196f3" }} />
                <CardContent>
                    <Paper />

                        Look at all our recipes at:

                        <p>
                            <li><a href="#!/recipes">Recipes</a></li>
                        </p>

                        Or get a random Recipe at:

                        <p>
                            <li><a href="#!/rand">Random Recipe</a></li>
                        </p>
                </CardContent>
            </Card>
        </div>);
    }
}
