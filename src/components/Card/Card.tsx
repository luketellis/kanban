import React from "react";
import "./card.css";
import { ICard } from "../../interfaces/ICard";
import { useDrag } from "react-dnd";

interface CardProps {
  card: ICard;
  removeCard(id: number): void;
}

function Card({ card, removeCard }: CardProps) {
  const deleteCard = () => {
    removeCard(card.id);
  };

  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: "card",
      item: card,
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [card]
  );

  return (
    <div className="card grow" ref={dragRef}>
      <span className="default-cursor">
        <strong>{card.id}</strong>
      </span>
      {isDragging && "🔄"}
      <span className="exit-cross default-cursor">
        <strong onClick={deleteCard}>❌</strong>
      </span>
      <hr />
      <h3 className="text-cursor">{card.title}</h3>
      <div className="text-cursor">{card.description}</div>
    </div>
  );
}

export default Card;
