# Nested Checkboxes

![picture of file structure](/task_structure.png)

This code is a React application that displays a file structure and allows the user to select files and directories.

## Structure

The code consists of a single component, `App`, that implements the file structure using React state.

The file structure is stored in the state using the `useState` hook and is imported from a file called `fileStructure`. The file structure is an array of nodes, where each node represents a file or directory. The node object has the following interface:

```
interface FileStructure {
    title: string;
    type: "file" | "directory";
    children?: Node[];
    }
```

The selected paths are also stored in the state using the `useState` hook.

## Methods

The component implements a number of functions to handle the checkbox change events and render the file structure.
Methods

The following methods are used in the component:

- `isPathSelected`: This function takes a path and returns `true` if the path is in the selected paths state, and `false` otherwise.

- `addChildren`: This function takes an array of children nodes, a prefix path, and an array of selected paths. It adds the paths of the children nodes to the selected paths array. If a child node is a directory and has children, the function is called recursively with the child node's children and its path as the prefix.

- `handleCheckboxChange`: This function takes a node and a path. If the path is already selected, it filters out the path from the selected paths state. If the path is not selected, the function adds the path to the selected paths state. If the node is a directory, it also adds the paths of the node's children to the selected paths state using the `addChildren` function.

- `renderNode`: This function takes a node and a parent title. It returns a list item that renders a checkbox with a label for the node's title. If the node is a file, it returns just the checkbox and label. If the node is a directory, it also renders its children using the `renderNode` function.

Finally, the component returns a `div` that renders the file structure as a nested list using the `renderNode` function, and displays the selected paths as a list.
