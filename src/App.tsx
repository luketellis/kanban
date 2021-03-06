import React, { useEffect, useState } from "react";
import "./App.css";
import Column from "./components/Column/Column";
import { states } from "./utils/constants";
import { Status } from "./types/Status";
import { testData } from "./utils/constants";
import { ICard } from "./interfaces/ICard";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const [cards, setCards] = useState<ICard[]>(testData as ICard[]);
  const [numCards, setNumCards] = useState<number>(cards.length + 1);

  const addNewCard = (newCard: ICard): void => {
    setCards((prevState) => [...prevState, newCard]);
    setNumCards((prevState) => ++prevState);
  };

  const editCardStatus = (
    cardId: number,
    property: string = "status",
    newValue: string
  ): void => {
    try {
      const oldCardArray: Array<ICard> = [...cards];

      const matchingCardArray = cards.filter((card) => {
        return card.id === cardId;
      });

      const nonMatchingCardArray = oldCardArray.filter((card) => {
        return card.id !== cardId;
      });

      const matchingCard: any = { ...matchingCardArray[0] };
      matchingCard[property] = newValue;
      const cardArrayWithUpdatedValues = [
        ...nonMatchingCardArray,
        matchingCard,
      ];

      setCards(cardArrayWithUpdatedValues);
    } catch (e: any) {
      console.log(e.message);
      return;
    }
  };

  const removeCard = (id: number): void => {
    setCards(cards.filter((card) => card.id !== id));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <h1>Kanban Board</h1>
      <div className="kanban-container">
        {states.map((state, i) => (
          <Column
            key={i}
            addNewCard={addNewCard}
            cards={cards}
            editCardStatus={editCardStatus}
            removeCard={removeCard}
            numCards={numCards}
            status={state.status as Status}
          />
        ))}
      </div>
    </DndProvider>
  );
}

export default App;
