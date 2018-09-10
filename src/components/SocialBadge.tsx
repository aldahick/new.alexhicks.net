import * as React from "react";
import * as Material from "@material-ui/core";
import { withStyles, StyleComponentProps, StyleRules } from "@material-ui/core/styles";

const styles: StyleRules = {
    badgeContainer: {
        textDecoration: "none"
    }
};

interface SocialBadgeProps extends StyleComponentProps {
    label: React.ReactNode;
    imageUrl: string;
    url?: string;
    imageProps?: Partial<React.ImgHTMLAttributes<HTMLImageElement>>;
}

@withStyles(styles)
export default class SocialBadge extends React.Component<SocialBadgeProps> {
    render() {
        return (
            <a href={this.props.url} className={this.props.classes.badgeContainer}>
                <Material.Grid container alignItems="center" direction="column">
                    <Material.Grid item>
                        <img src={this.props.imageUrl} height={32} {...(this.props.imageProps || {})} />
                    </Material.Grid>
                    <Material.Grid item>
                        {typeof(this.props.label) === "string"
                            ? <Material.Typography color="inherit">
                                {this.props.label}
                            </Material.Typography>
                            : this.props.label}
                    </Material.Grid>
                </Material.Grid>
            </a>
        );
    }
}
