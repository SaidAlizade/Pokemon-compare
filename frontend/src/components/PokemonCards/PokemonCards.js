import React, { useState } from "react";
import { useStyles } from "./styles";
import { Grid, Button, Paper, Typography } from "@material-ui/core";
import PokemonCard from "./PokemonCard/PokemonCard";
import { fetchRandomPokemon } from "../../api/index";

const PokemonCards = () => {
    const classes = useStyles();
    const [buttonState, setButtonState] = useState({ started: false, next: false });
    const [pokemon, setPokemon] = useState({
        pokemon1: {
            id: Number,
            name: "",
            image: "",
            description: "",
            base: {
            },
            won: false,
        },
        pokemon2: {
            id: Number,
            name: "",
            image: "",
            description: "",
            base: {
            },
            won: false,
        }
    })
    function handleClick() {
        if (!buttonState.started) {
            fetchRandomPokemon()
                .then((res) => {
                    const data = res.data;
                    setPokemon((prevValue) => {
                        return ({
                            ...prevValue, pokemon1: {id: data.id, name: data.name.english, image: data.thumbnail, description: data.description, base: data.base},
                        })
                    })
                })
            fetchRandomPokemon()
                .then((res) => {
                    const data = res.data;
                    setPokemon((prevValue) => {
                        return ({
                            ...prevValue, pokemon2: {id: data.id, name: data.name.english, image: data.thumbnail, description: data.description, base: data.base},
                        })
                    })
                })
            .catch((err)=>console.log(err))
            setButtonState({ started: true, next: false });
        }
        else if (buttonState.next) {
            setButtonState({ started: true, next: false })
            fetchRandomPokemon()
                .then((res) => {
                    const data = res.data;
                    var pokeToKeep = "pokemon1";
                    if (pokemon.pokemon1.won === true) {
                        pokeToKeep = "pokemon1";
                    }
                    else {
                        pokeToKeep = "pokemon2";
                    }
                    setPokemon((prevValue) => {
                        return({pokemon1: {id: data.id, name: data.name.english, image: data.thumbnail, description: data.description, base: data.base, won: false , upVotes:0, downVotes: 0},pokemon2: {
                            ...prevValue[pokeToKeep], won:false, upVotes:0, downVotes: 0
                        }})
                    })
                })
        }
    }
    return (
        <div>
            <Button onClick={() => handleClick("","")} color="primary" variant="contained" className={classes.btn}>{buttonState.started ? "Next" : "Start"}</Button>
            <Grid container justifyContent="center">
                {buttonState.started ?
                <>
                    <Grid item xs={3}>
                        <PokemonCard pokemon={pokemon.pokemon1} otherPokemon={pokemon.pokemon2} next={buttonState.next} setButtonState={setButtonState} setPokemon={setPokemon}/>
                    </Grid>
                    <Grid item xs={3}>
                        <PokemonCard pokemon={pokemon.pokemon2} otherPokemon={pokemon.pokemon1} next={buttonState.next} setButtonState={setButtonState} setPokemon={setPokemon}/>
                    </Grid>
                </>
                :
                <Paper className={classes.Paper}>
                    <Typography className={classes.text}>Poke 50/50</Typography>
                        <Typography className={classes.text}>How to play:</Typography>
                        <ol className={classes.text}>
                            <li>Click start then compare the two pokemon you are given</li>
                            <li>Once you decide which you like better click on its image</li>
                            <li>You will be shown how many users passed and liked each pokemon</li>
                            <li>Click next for you next set and ENJOY!!</li>
                        </ol>
                </Paper>
                }   
            </Grid> 
        </div>
     );
}
 
export default PokemonCards;