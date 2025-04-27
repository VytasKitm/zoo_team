import { useState } from "react";
import "./App.css";
import "./style.css";

// laikinai. po to istrinti:
import {
  getAnimalsAPI,
  getAnimalByIdAPI,
  createAnimalAPI,
  updateAnimalAPI,
  deleteAnimalAPI,
} from "./api/animalsAPI";

import Filters from "./components/Filters";
import AnimalTable from "./components/AnimalsTable";


function App() {

  return (
    <>
      <AnimalTable />
    </>
  );
}

export default App;
