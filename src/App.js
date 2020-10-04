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
import './App.css';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import Badge from '@material-ui/core/Badge';
import {
    Route,
    NavLink,
    HashRouter,
} from "react-router-dom";
import { Recipes, RandomRecipe } from './Recipes';
import { Home } from './Home';
import { Footer } from './Footer';
import { Sources } from './Sources';
import { RecipeForm } from './RecipeForm';

const { REACT_APP_APP_NAME } = process.env;

class RecipesRouter extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            numRecipes: 0,
        };
    }

    updateRecipes = () => {
        fetch('/api/v1/recipes/num')
            .then(response => response.json())
            .then(responseText => this.setState({ numRecipes: responseText }))
            .catch(error => console.log(error));
    }

    handleRecipeCountChange = () => {
        this.updateRecipes()
    }

    componentDidMount() {
        this.updateRecipes()
    }

    render() {
        return (<HashRouter>
            <RecipesRouterMenu numRecipes={this.state.numRecipes}/>
            <RecipesRouterBody onRecipeCountChange={this.handleRecipeCountChange}/>
        </HashRouter>);
    }
}

function RecipesRouterMenu(props) {
    return (
        <div>
            <AppBar className="RecipeMenu" position="fixed" style={{ backgroundColor: "#2196f3" }}>
                <Toolbar>
                    <IconButton className="menu-icon" color="inherit" aria-label="Menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit">
                        { REACT_APP_APP_NAME }
                    </Typography>
                    <NavLink to="/"><Button><HomeIcon />Overview</Button></NavLink>
                    <NavLink to="/recipes">
                        <Badge badgeContent={props.numRecipes} color="secondary">
                            <Button>Recipes</Button>
                        </Badge>
                    </NavLink>
                    <NavLink to="/add"><Button>Add Recipe</Button></NavLink>
                    <NavLink to="/rand"><Button>Random Recipe</Button></NavLink>
                    <NavLink to="/src"><Button>Recipe Sources</Button></NavLink>
                    <NavLink to="/login"><Button>Login</Button></NavLink>
                </Toolbar>
            </AppBar>
        </div>
    );
}

function RecipesRouterBody(props) {

    const handleRecipeChange = () => {
        props.onRecipeCountChange()
    }

    return (<div className="GoCookUIContent" style={{ align: 'center', paddingRight: 50, paddingLeft: 50 }}>
        <div className="GoCookUIRoutes">
            <Route exact path="/" component={Home} />
            <Route path="/recipes" render={(props) => (<Recipes {...props} onRecipesChange={handleRecipeChange} />)} />
            <Route path="/add" render={(props) => (<RecipeForm {...props} onRecipesChange={handleRecipeChange} />)} />
            <Route path="/rand" component={RandomRecipe} />
            <Route path="/src" component={Sources} />
            <Route path="/login" component={Home} />
        </div>
        <Footer />
    </div>);
}

function App() {
    return (
        <div className="GoCookUIApp">
            <RecipesRouter />
        </div>
    );
}

export default App;
