import * as React from "react";
import * as ReactRouter from "react-router-dom";
import * as Material from "@material-ui/core";
import axios from "axios";
import * as io from "socket.io-client";
import * as chess from "components/chess";
import Chessboard from "components/Chessboard";
import UserState from "components/auth/UserState";

type ChessGameProps = ReactRouter.RouteComponentProps<{ id?: string }>;

interface ChessGameState {
    fen?: string;
    currentTurn: chess.PieceColor;
}

export class ChessGameScene extends React.Component<ChessGameProps, ChessGameState> {
    readonly state: ChessGameState = {
        fen: undefined,
        currentTurn: chess.PieceColor.White
    };
    socket: SocketIOClient.Socket;

    async componentDidMount() {
        this.socket = io(axios.defaults.baseURL + "/chess");
        await new Promise(resolve => this.socket.once("connect", resolve));
        this.socket.on("board", this.onReceiveBoard);
        this.socket.on("board:reset", this.onResetBoard);
        this.socket.emit("join", {
            gameId: this.props.match.params.id,
            token: UserState.token
        });
    }

    onReceiveBoard = (evt: {
        fen: string;
        currentTurn: "b" | "w";
    }) => {
        this.setState({
            fen: evt.fen,
            currentTurn: chess.getColorFromAPI(evt.currentTurn)
        });
    };

    onResetBoard = () => {
        this.setState({ fen: this.state.fen + "." });
    };

    onPieceMove = (from: string, to: string) => {
        this.socket.emit("move", { from, to });
    };

    render() {
        return (
            <Material.Grid container justify="center">
                <Material.Grid item xs={12} sm={8} md={6} lg={4}>
                    <div>
                        Current turn: {chess.PieceColor[this.state.currentTurn]}
                    </div>
                    <div>
                        {this.state.fen !== undefined ? <Chessboard
                            onMove={this.onPieceMove}
                            fen={this.state.fen}
                        /> : "Loading..."}
                    </div>
                </Material.Grid>
            </Material.Grid>
        );
    }
}
