declare module "js-svg-path" {
    export type Point = { main: { x: number; y: number } };
    type Shape = { points: Point[] };
    type Outline = { bounds: number[]; curveshapes: Shape[] };
    function parse(svgString: string): Outline;
    const library = { parse };
    export default library;
}
