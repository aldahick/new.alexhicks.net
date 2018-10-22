import * as React from "react";
import * as ReactRouter from "react-router-dom";
import * as Material from "@material-ui/core";
import ItemsTable from "components/ItemsTable";

type ItemListProps<Item> = {
    fetch(): Promise<Item[]>;
    create(): Promise<Item>;
    link(item: Item): string;
    sort(a: Item, b: Item): number;
    columns(item: Item): {[key: string]: React.ReactNode};
};

type ItemListState<Item> = {
    items: Item[];
    created: Item;
};

export default class ItemList<Item extends { id: number; }> extends React.Component<ItemListProps<Item>, ItemListState<Item>> {
    readonly state: ItemListState<Item> = {
        items: [],
        created: undefined
    };

    async componentDidMount() {
        this.setState({
            items: await this.props.fetch()
        });
    }

    onCreate = async () => {
        const item = await this.props.create();
        this.setState({
            created: item,
            items: this.state.items.concat([item])
        });
    };

    render() {
        if (this.state.created !== undefined) {
            return (
                <ReactRouter.Redirect to={this.props.link(this.state.created)} />
            );
        }
        return (
            <Material.Grid container justify="center">
                <Material.Grid item xs={12} sm={8} md={6} lg={4}>
                    <Material.Button onClick={this.onCreate}>
                        <Material.Typography>Create</Material.Typography>
                    </Material.Button>
                    <ItemsTable
                        items={this.state.items.sort(this.props.sort).map(item => ({
                            "ID": <ReactRouter.NavLink to={this.props.link(item)}>
                                {item.id.toString()}
                            </ReactRouter.NavLink>,
                            ...this.props.columns(item)
                        }))}
                    />
                </Material.Grid>
            </Material.Grid>
        );
    }
}
