import { RefObject } from "react";

export const useExportAndImportFile = () => {
  const importFile = (
    inputFile: RefObject<HTMLInputElement>,
    setData: (data: object) => void
  ) => {
    if (inputFile.current!.files!.length === 0) {
      console.log("error");

      return;
    }

    const reader = new FileReader();

    reader.onload = (event: ProgressEvent<FileReader>) => {
      const str = event.target?.result as string;
      const json = JSON.parse(str);

      setData(json);
    };
    reader.readAsText(new Blob([inputFile.current!.files![0]]));
  };

  const exportFile = (data: object) => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(data)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "data.json";

    link.click();
  };

  return { importFile, exportFile };
};
