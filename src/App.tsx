import React, { useState } from "react";
import menu from "./fileStructure";
import "./styles.css";

// Define an interface for the Node object
interface Node {
  title: string;
  type: "file" | "directory";
  children?: Node[];
}

const App = () => {
  // Use the useState hook to store the file structure as state
  const [structure, setStructure] = useState<Node[]>(menu);

  // Use the useState hook to store the selected paths as state
  const [selectedPaths, setSelectedPaths] = useState<string[]>([]);

  // Function to check if a path is selected
  const isPathSelected = (path: string) => {
    // Loop through all the selected paths
    for (let selectedPath of selectedPaths) {
      // If the selected path starts with the current path, return true
      if (selectedPath.startsWith(path)) {
        return true;
      }
    }
    // If the path is not found, return false
    return false;
  };

  // Function to add children of a node to the selected paths
  const addChildren = (
    children: Node[],
    prefix: string,
    newSelectedPaths: string[]
  ) => {
    // Loop through all the children of the node
    children.forEach((child, index) => {
      // Add the child's path to the selected paths
      newSelectedPaths.push(`${prefix}/${child.title}`);
      // If the child is a directory and has children, recursively add its children
      if (child.type === "directory" && child.children) {
        addChildren(
          child.children,
          `${prefix}/${child.title}`,
          newSelectedPaths
        );
      }
    });
  };

  // Function to handle checkbox change events
  const handleCheckboxChange = (node: Node, path: string) => {
    let newSelectedPaths: string[];
    // If the path is already selected
    if (isPathSelected(path)) {
      // Filter out the path from the selected paths
      newSelectedPaths = selectedPaths.filter(
        (p: string) => !p.startsWith(path)
      );
    } else {
      // If the node is a file
      if (node.type === "file") {
        // Add the path to the selected paths
        newSelectedPaths = [...selectedPaths, path];
      } else {
        // If the node is a directory
        newSelectedPaths = [...selectedPaths];
        // If the directory has children, add them to the selected paths
        if (node.children) {
          addChildren(node.children, path, newSelectedPaths);
        }
      }
    }

    // Update the selected paths in state
    setSelectedPaths(newSelectedPaths);
  };

  // Function to render nodes
  const renderNode = (node: Node, parentTitle: string) => {
    // If the node is a file
    if (node.type === "file") {
      return (
        <li key={node.title}>
          {/* Render a checkbox with a label */}
          <input
            type="checkbox"
            checked={isPathSelected(`${parentTitle}/${node.title}`)}
            onChange={() =>
              handleCheckboxChange(node, `${parentTitle}/${node.title}`)
            }
          />
          {node.title}
        </li>
      );
    }
    // If the node is a directory
    if (node.type === "directory") {
      return (
        <li key={node.title}>
          {/* Render a checkbox with a label */}
          <input
            type="checkbox"
            checked={isPathSelected(`${parentTitle}/${node.title}`)}
            onChange={() =>
              handleCheckboxChange(node, `${parentTitle}/${node.title}`)
            }
          />
          {node.title}
          <ul>
            {/* Render the children nodes */}
            {node.children &&
              node.children.map((child) =>
                renderNode(child, `${parentTitle}/${node.title}`)
              )}
          </ul>
        </li>
      );
    }
  };

  // Return the component
  return (
    <div>
      {/* Render the file structure as a list */}
      <ul>{structure.map((node) => renderNode(node, ""))}</ul>
      {/* Display the selected paths */}
      <div>
        Selected Paths:
        <br />
        <ul>
          {selectedPaths.map((selectedPath) => (
            <li key={selectedPath}>{selectedPath}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
