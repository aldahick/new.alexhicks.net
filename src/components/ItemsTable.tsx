import * as React from "react";
import * as Material from "@material-ui/core";

interface ItemsTableProps {
    items: {[key: string]: React.ReactNode}[];
}

export default class ItemsTable extends React.Component<ItemsTableProps> {
    render() {
        if (this.props.items.length === 0) {
            return "";
        }
        return (
            <Material.Table>
                <Material.TableHead>
                    <Material.TableRow>
                        {Object.keys(this.props.items[0] || {}).map(label =>
                            <Material.TableCell key={label}>
                                <Material.Typography variant="subheading">
                                    {label}
                                </Material.Typography>
                            </Material.TableCell>
                        )}
                    </Material.TableRow>
                </Material.TableHead>
                <Material.TableBody>
                    {this.props.items.map((item, index) =>
                        <Material.TableRow key={index}>
                            {Object.values(item).map((value, index) =>
                                <Material.TableCell key={index}>
                                    {value}
                                </Material.TableCell>
                            )}
                        </Material.TableRow>
                    )}
                </Material.TableBody>
            </Material.Table>
        );
    }
}
