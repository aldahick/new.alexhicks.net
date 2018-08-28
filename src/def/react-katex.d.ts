declare module "react-katex" {
    import * as React from "react";
    type MathProps = { math: string };
    export class BlockMath extends React.Component<MathProps> { }
    export class InlineMath extends React.Component<MathProps> { }
}
