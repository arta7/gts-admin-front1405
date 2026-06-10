export type TreeNode = {
    caption: string,
    code?: string,
    id: number,
    icon?: string,
    subSystems?: Array<TreeNode>,
    routPath: string,
    children?: Array<TreeNode>,
    checked?: boolean,
    nodeId: string,
    systemId:string,
    subSystemId:string
};