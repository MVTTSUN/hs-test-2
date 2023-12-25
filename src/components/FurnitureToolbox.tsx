import { styled } from "@linaria/react";
import { furniture } from "../const/const";
import { nanoid } from "nanoid";
import { Dispatch, FormEvent, SetStateAction, useRef } from "react";
import { useExportAndImportFile } from "../hooks/useExportAndImportFile";
import { Furniture } from "../types/types";

type FurnitureListProps = {
  droppedFurniture: Furniture[];
  setDroppedFurnitureHandler: Dispatch<SetStateAction<Furniture[]>>;
};

export function FurnitureToolbox(props: FurnitureListProps) {
  const { droppedFurniture, setDroppedFurnitureHandler } = props;
  const inputFile = useRef<HTMLInputElement>(null);
  const form = useRef<HTMLFormElement>(null);
  const { exportFile, importFile } = useExportAndImportFile();

  const onAdd = (id: string, type: string, src: string) => {
    setDroppedFurnitureHandler([
      ...droppedFurniture,
      { id, type, src, coordinate: { x: 0, y: 0 } },
    ]);
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    importFile(inputFile, (furniture) =>
      setDroppedFurnitureHandler(furniture as Furniture[])
    );

    form.current?.reset();
  };

  return (
    <Container>
      <FurnitureList>
        {furniture.map((image) => {
          const id = nanoid();
          const type = image.split("/").pop()?.split(".")[0];

          return (
            <FurnitureItem key={id} onClick={() => onAdd(id, type!, image)}>
              <FurnitureImage src={image} alt={type} />
            </FurnitureItem>
          );
        })}
      </FurnitureList>
      <Form ref={form} onSubmit={handleSubmit}>
        <input ref={inputFile} type="file" />
        <Button type="submit">Импорт</Button>
        <Button type="button" onClick={() => exportFile(droppedFurniture)}>
          Экспорт
        </Button>
      </Form>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
  border-radius: 25px;
  padding: 15px;
  background-color: antiquewhite;
`;

const FurnitureList = styled.ul`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FurnitureItem = styled.li`
  cursor: pointer;
`;

const Form = styled.form`
  display: flex;
  gap: 10px;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  cursor: pointer;
  border: none;
  background-color: #aaf67b;
  padding: 10px 30px;
  border-radius: 10px;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.7;
  }
`;

const FurnitureImage = styled.img`
  pointer-events: none;
  display: block;
  max-width: 100px;
`;
