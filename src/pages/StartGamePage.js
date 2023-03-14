import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "../../src/components/Button";
import { startGame } from "../../src/store/slices/gameState.slice";

const StartGame = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");

  const startGameHandler = () => {
    dispatch(startGame({ username }));
  };

  return (
    <div className="flex flex-col justify-center items-center mt-80">
      <label htmlFor="username-input" className="sr-only">
        Enter your name:
      </label>
      <input
        id="username-input"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Your Name..."
        className="py-2 px-4 outline-none rounded shadow w-64 mb-6"
      />
      <Button onClick={startGameHandler}>Start Game</Button>
    </div>
  );
};

export default StartGame;
