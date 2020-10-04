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
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { PageHeader } from './PageHeader';
import CircularProgress from '@material-ui/core/CircularProgress';

export class Sources extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sources: null,
        };
    }
    componentDidMount() {
        fetch('/api/v1/sources')
            .then(response => response.json())
            .then(responseJSON => this.setState({ sources: responseJSON }));
    }

    render() {
        return (<div>
            <PageHeader pageName="Recipe Sources" />
            {this.state.sources != null ? Object.values(this.state.sources).map((val, index) => <Source key={index} source={val} />) : "No Sources Found"}
        </div>);
    }
}

function Source (props) {

    const [loading, setLoading] = React.useState(false);

    const onConnectClick = () => {
        fetch('/api/v1/sources/' + props.source.id + '/connect')
            .then(response => response.json())
            .then(responseJSON => window.location.href = responseJSON.oAuthURL)
            .catch(err => console.error(err));
    };
    
    const onSyncClick = () => {
        setLoading(true)
        fetch('/api/v1/sources/' + props.source.id + '/recipes', {
            method: 'PATCH'
        }).catch(err => console.error(err))
        .finally(() => setLoading(false));
    };
    
    return (<div>
        <Card style={{ align: 'center' }}>
            <CardHeader title={props.source.name} style={{ textAlign: 'center', backgroundColor: "#2196f3" }} />
            <CardContent>
                <Button variant="contained" disabled={loading} color="primary" onClick={onConnectClick}>Connect</Button>
                <Button variant="contained" disabled={!props.source.connected || loading} onClick={onSyncClick} color="primary">Synchronize</Button>
                {loading && <CircularProgress size={45} />}                
            </CardContent>
        </Card>
    </div>);
    
}
