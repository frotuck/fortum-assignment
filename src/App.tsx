import React, { useState } from "react";
import menu, {FileStructure} from "./fileStructure";

const App = () => {
  // Use the useState hook to store the file structure as state
  const [structure, setStructure] = useState<FileStructure[]>(menu);

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

  // Function to add children of a FileStructure to the selected paths
  const addChildren = (
    children: FileStructure[],
    prefix: string,
    newSelectedPaths: string[]
  ) => {
    // Loop through all the children of the FileStructure
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
  const handleCheckboxChange = (node: FileStructure, path: string) => {
    let newSelectedPaths: string[];
    // If the path is already selected
    if (isPathSelected(path)) {
      // Filter out the path from the selected paths
      newSelectedPaths = selectedPaths.filter(
        (p: string) => !p.startsWith(path)
      );
    } else {
      // If the FileStructure is a file
      if (node.type === "file") {
        // Add the path to the selected paths
        newSelectedPaths = [...selectedPaths, path];
      } else {
        // If the FileStructure is a directory
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

  // Function to render FileStructures
  const renderFileStructure = (node: FileStructure, parentTitle: string) => {
    // If the FileStructure is a file
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
    // If the FileStructure is a directory
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
            {/* Render the children FileStructures */}
            {node.children &&
              node.children.map((child) =>
                renderFileStructure(child, `${parentTitle}/${node.title}`)
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
      <ul>{structure.map((node) => renderFileStructure(node, ""))}</ul>
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
