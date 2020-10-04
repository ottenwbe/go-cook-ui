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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';

import { RecipeEdit } from './RecipeForm';

export class RecipeDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            recipe: JSON.parse(JSON.stringify(props.recipe)) //copy of original recipe
        };
    }

    setRecipe = (recipe) => {
        this.setState({recipe: recipe});
    }

    handleChangedRecipe = (changedRecipe) => {
        this.setRecipe(changedRecipe);
    }

    submitRecipe = () => {
        this.setState({loading: true})
        fetch('/api/v1/recipes/r/' + this.state.recipe.id, {
            method: 'put',
            body: JSON.stringify(this.state.recipe)
        })
        .then(() => this.props.onClose())
        .finally(() => this.setState({loading: false}));
    }

    render() {
        return (
            <FormControl>
            <Dialog open={this.props.open} onClose={this.props.onClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="recpie-form-dialog-title">Edit Recipe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To edit the recipe, change the content and then submit the changes.
                    </DialogContentText>
                    <RecipeEdit disabled={this.state.loading} recipe={this.state.recipe} onChange={this.handleChangedRecipe} />
                </DialogContent>
                <DialogActions>                                        
                    <Button disabled={this.state.loading} onClick={this.props.onClose} color="primary">
                        Cancel
                    </Button>
                    {this.state.loading && <CircularProgress size={25} />}
                    <Button disabled={this.state.loading} onClick={this.submitRecipe} color="primary">
                        Submit
                    </Button>                    
                </DialogActions>
            </Dialog>
            </FormControl>
        );
    }
}