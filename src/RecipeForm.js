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
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';

import { PageHeader } from './PageHeader';

function newIngredient() {
    return {
        name: "",
        amount: 1,
        unit: "",
        id: new Date().getTime()
    }
}

function newRecipe() {
    return {
        name: 'My Recipe',
        servings: 1,
        description: '',
        components: [newIngredient()]
    }
}

function makeEditableRecipe(recipe) {
    let editableRecipe = JSON.parse(JSON.stringify(recipe))
    editableRecipe.components = recipe.components.map((ingredient, index) => {
        return {
            name: ingredient.name,
            amount: ingredient.amount,
            unit: ingredient.unit,
            id: index.toString() + new Date().getTime().toString()
        }
    });
    return editableRecipe;
}

const IngredientsEdit = (props) => {

    const handleAddIngredient = () => {
        props.ingredients.push(newIngredient())
        props.onIngredientsChange(props.ingredients)
    }

    const handleRemoveIngredient = (index) => {
        props.ingredients.splice(index, 1)
        props.onIngredientsChange(props.ingredients)
    }

    const handleChangeIngredient = (index, ingredient) => {
        props.ingredients[index] = ingredient
        props.onIngredientsChange(props.ingredients)
    }

    let rows = props.ingredients.map((ingredient, index) => {
        return <IngredientsRowEdit
            key={ingredient.id}
            index={index}
            disabled={props.disabled}
            ingredient={ingredient}
            onRemoveRow={handleRemoveIngredient}
            onRowChange={handleChangeIngredient} />
    });

    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <td>
                            Ingredients
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
            <p />
            <Button
                disabled={props.disabled}
                fullWidth
                variant="outlined"
                value="Add"
                color="primary"
                onClick={handleAddIngredient}>
                Add Ingredient
            </Button>
        </div>
    );
}

const IngredientsRowEdit = (props) => {

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.type === 'number' ? parseFloat(event.target.value) : event.target.value

        props.ingredient[name] = value

        props.onRowChange(props.index, props.ingredient)
    }

    const handleRemove = () => {
        props.onRemoveRow(props.index)
    }

    return (
        <tr>
            <td>
                <TextField
                    disabled={props.disabled}
                    name="amount"
                    id={"standard-amount" + props.index}
                    label="Amount"
                    type="number" 
                    step="0.01"
                    fullWidth
                    defaultValue={props.ingredient.amount}
                    onChange={handleChange}
                />
            </td>
            <td>
                <TextField
                    disabled={props.disabled}                
                    name="unit"
                    id={"standard-unit" + props.index}
                    label="Unit"
                    fullWidth
                    defaultValue={props.ingredient.unit}
                    onChange={handleChange}
                />
            </td>
            <td>
                <TextField
                    disabled={props.disabled}                
                    name="name"
                    id={"standard-name" + props.index}
                    label="Ingredient"
                    fullWidth
                    defaultValue={props.ingredient.name}
                    onChange={handleChange}
                />
            </td>
            <td>
                <IconButton disabled={props.disabled} aria-label="delete" onClick={handleRemove}>
                    <DeleteIcon />
                </IconButton>
            </td>
        </tr>
    );
}

export function RecipeEdit(props) {

    const [editableRecipe] = React.useState(makeEditableRecipe(props.recipe))

    const handleIngredientsChange = (ingredients) => {
        editableRecipe.components = ingredients
        props.onChange(editableRecipe)
    }

    const handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'number' ? parseInt(target.value) : target.value;
        const name = target.name;

        editableRecipe[name] = value

        props.onChange(editableRecipe)

        event.preventDefault()
    }

    return (
        <Box>
            <Box width="50%">
                <TextField
                    disabled={props.disabled}
                    name="name"
                    required id="standard-required"
                    label="Title"
                    fullWidth
                    defaultValue={editableRecipe.name}
                    onChange={handleChange}
                />
            </Box>
            <Box width="50%">
                <TextField
                    disabled={props.disabled}
                    name="servings"
                    id="standard-number"
                    type="number"
                    label="Servings"
                    fullWidth
                    defaultValue={editableRecipe.servings}
                    onChange={handleChange}
                />
            </Box>
            <p />
            <IngredientsEdit
                disabled={props.disabled} 
                ingredients={editableRecipe.components}
                onIngredientsChange={handleIngredientsChange}
            />
            <p />
            <div>
                <TextField
                    disabled={props.disabled}                
                    name="description"
                    id="standard-multiline"
                    label="Description"
                    multiline
                    fullWidth
                    rows={10}
                    defaultValue={editableRecipe.description}
                    variant="outlined"
                    onChange={handleChange}
                />
            </div>
        </Box>);
}

export class RecipeForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            recipe: newRecipe(),
            openDialog: false,
            submitting: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmitStart = () => {
        this.setState({
            openDialog: true,
            submitting: true,
            submitSuccess: true
        });
    };

    handleDialogClose = () => {
        this.setState({
            openDialog: false,
            submitSuccess: true
        });
    };


    handleChange = (recipe) => {
        this.setState({
            recipe: recipe
        });
    }

    handleSubmit = (event) => {
        this.handleSubmitStart();
        fetch('/api/v1/recipes', {
            method: 'post',
            body: JSON.stringify(this.state.recipe)
        })
        .then(response => response.ok ? this.setState({submitSuccess: true}) : this.setState({submitSuccess: false}))
        .then(() => this.props.onRecipesChange())
        .finally(() => this.setState({submitting: false}));        
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <PageHeader pageName="Add Recipe" />

                <RecipeUpdateDialog open={this.state.openDialog} submitSuccess={this.state.submitSuccess} submitting={this.state.submitting} onClose={this.handleDialogClose} />

                <form onSubmit={this.handleSubmit}>
                    <h1>Compose your Recipe</h1>
                    <br />
                    <RecipeEdit recipe={this.state.recipe} onChange={this.handleChange} />
                    <p />
                    <Button fullWidth variant="outlined" type="submit" value="Submit" color="primary">
                        Submit
                    </Button>
                    <p />
                </form>
            </div>
        );
    }
}

export function RecipeUpdateDialog(props) {

    let renderDialogText = () => {
        if (props.submitting) {
            return("Wait until the new Recipe has been submitted!");
        } else if (!props.submitting && props.submitSuccess) {
            return("Recipe has been added successfully!");
        }
        return("Error during submission! Title of recipe might be in use!");        
    }   

    return (
        <div>
            <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                open={props.open}
                aria-labelledby="upload-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="upload-dialog-title">{"Adding New Recipe"}</DialogTitle>
                <DialogContent>
                    {props.submitting && <CircularProgress />}
                    <DialogContentText id="upload-dialog-description">
                        {renderDialogText()}                        
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.onClose} color="primary" disabled={props.submitting}>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}