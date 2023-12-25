import { styled } from "@linaria/react";
import Draggable, { DraggableData } from "react-draggable";
import { Coordinate, Furniture } from "../types/types";
import { Dispatch, SetStateAction } from "react";

type DraggableFurnitureProps = {
  id: string;
  type: string;
  src: string;
  coordinate: Coordinate;
  setDroppedFurnitureHandler: Dispatch<SetStateAction<Furniture[]>>;
};

export function DraggableFurniture(props: DraggableFurnitureProps) {
  const { id, type, src, coordinate, setDroppedFurnitureHandler } = props;

  console.log(coordinate);

  const onStop = (data: DraggableData, id: string) => {
    setDroppedFurnitureHandler((prevState) =>
      prevState.map((furniture) => {
        if (furniture.id === id) {
          return {
            ...furniture,
            coordinate: {
              x: data.x,
              y: data.y,
            },
          };
        }

        return furniture;
      })
    );
  };

  return (
    <Draggable
      position={{ x: coordinate.x, y: coordinate.y }}
      defaultPosition={{ x: coordinate.x, y: coordinate.y }}
      bounds="parent"
      key={id}
      onStop={(_, data) => onStop(data, id)}
    >
      <FurnitureButton type="button">
        <FurnitureImage src={src} alt={type} />
      </FurnitureButton>
    </Draggable>
  );
}

const FurnitureButton = styled.button`
  position: absolute;
  cursor: pointer;
  border: none;
  background-color: transparent;
  padding: 0;
`;

const FurnitureImage = styled.img`
  pointer-events: none;
  display: block;
  max-width: 100px;
`;
