interface FileStructure {
  title: string;
  type: "directory" | "file";
  children?: FileStructure[];
}

const menu: FileStructure[] = [
  {
    title: "Directory 1",
    type: "directory",
    children: [
      {
        title: "File 1",
        type: "file"
      },
      {
        title: "File 2",
        type: "file"
      },
      {
        title: "Directory 2",
        type: "directory",
        children: [
          {
            title: "File 1",
            type: "file"
          }
        ]
      }
    ]
  },
  {
    title: "Directory 2",
    type: "directory",
    children: [
      {
        title: "File 1",
        type: "file"
      },
      {
        title: "File 2",
        type: "file"
      }
    ]
  }
];

export default menu;
