import { styled } from "@linaria/react";
import { useState } from "react";
import { DraggableFurniture } from "./DraggableFurniture";
import { Furniture } from "../types/types";
import { FurnitureToolbox } from "./FurnitureToolbox";

export function App() {
  const [droppedFurniture, setDroppedFurniture] = useState<Furniture[]>([]);

  return (
    <Container>
      <FurnitureToolbox
        droppedFurniture={droppedFurniture}
        setDroppedFurnitureHandler={setDroppedFurniture}
      />
      <Board>
        {droppedFurniture.map(({ id, src, type, coordinate }) => (
          <DraggableFurniture
            key={id}
            id={id}
            type={type}
            src={src}
            coordinate={coordinate}
            setDroppedFurnitureHandler={setDroppedFurniture}
          />
        ))}
      </Board>
    </Container>
  );
}

const Container = styled.main`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin: 0 auto;
  max-width: 1200px;
  padding: 80px;
`;

const Board = styled.div`
  position: relative;
  width: 800px;
  height: 800px;
  background-color: aliceblue;
  border-radius: 25px;
  overflow: hidden;
`;
