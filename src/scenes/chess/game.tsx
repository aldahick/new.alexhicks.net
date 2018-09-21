import * as React from "react";
import * as Material from "@material-ui/core";
import axios from "axios";
import * as io from "socket.io-client";
import Chessboard from "../../components/Chessboard";

interface ChessGameState {
    fen?: string;
}

export class ChessGameScene extends React.Component<object, ChessGameState> {
    readonly state: ChessGameState = {
        fen: undefined
    };
    socket: SocketIOClient.Socket;

    async componentDidMount() {
        this.socket = io(axios.defaults.baseURL + "/chess");
        await new Promise(resolve => this.socket.once("connect", resolve));
        this.socket.on("board", this.onReceiveBoard);
        this.socket.on("board:reset", this.onResetBoard);
        this.socket.emit("join", {
            name: "Alex"
        });
    }

    onReceiveBoard = (fen: string) => {
        this.setState({ fen });
    };

    onResetBoard = () => {
        console.log("resetting board");
        this.setState({ fen: this.state.fen + " " });
    };

    onPieceMove = (from: string, to: string) => {
        this.socket.emit("move", { from, to });
    };

    render() {
        return (
            <Material.Grid container justify="center">
                <Material.Grid item xs={12} sm={8} md={6} lg={4}>
                    {this.state.fen !== undefined ? <Chessboard
                        onMove={this.onPieceMove}
                        fen={this.state.fen}
                    /> : "Loading..."}
                </Material.Grid>
            </Material.Grid>
        );
    }
}
