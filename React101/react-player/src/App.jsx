import React from "react";
import Song from "./components/Song";
import { useState } from "react";
import Player from "./components/Player";

export default function App() {
  return (
    <>
      <Song></Song>
      <Player></Player>
    </>
  );
}
