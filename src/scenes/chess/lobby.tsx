import * as React from "react";
import * as ReactRouter from "react-router-dom";
import * as Material from "@material-ui/core";
import axios from "axios";

interface ChessLobbyState {
    games: string[];
}

export class ChessLobbyScene extends React.Component<object, ChessLobbyState> {
    updateTimer: NodeJS.Timer;
    readonly state: ChessLobbyState = {
        games: []
    };

    componentDidMount() {
        this.updateGames().catch(console.error);
        this.updateTimer = setInterval(this.updateGames, 5000);
    }

    componentWillUnmount() {
        clearInterval(this.updateTimer);
    }

    updateGames = async () => {
        this.setState({
            games: await axios.get("/chess/games")
                .then(r => r.data.games)
        });
    };

    render() {
        return (
            <Material.Grid container justify="center">
                <Material.Grid item xs={12} sm={8} md={6} lg={4}>
                    <Material.Typography variant="display1">
                        Chess Lobby
                    </Material.Typography>
                    <Material.Grid container direction="column">
                        {this.state.games.map(gameId =>
                            <Material.Grid key={gameId}>
                                <ReactRouter.NavLink to={"/chess/game/" + gameId} style={{ textDecoration: "none" }}>
                                    <Material.Typography variant="title">
                                        Game {gameId}
                                    </Material.Typography>
                                </ReactRouter.NavLink>
                            </Material.Grid>
                        )}
                    </Material.Grid>
                </Material.Grid>
            </Material.Grid>
        );
    }
}
