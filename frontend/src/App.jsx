import { useState } from 'react'
import './App.css'

// laikinai. po to istrinti:
import { getAnimalsAPI, getAnimalByIdAPI, createAnimalAPI, updateAnimalAPI, deleteAnimalAPI } from './api/animalsAPI'


// argumentai:

const id = "15"

const createData = { 
	"vardas": "TestGyvunas",
	"rusis": "TestRusis",
	"svoris": 999999, 
	"aplinka": "TestAplinka", 
	lt: true 
}

// reikia pilnu duomenu, kad atnaujinti bent viena lauka
const updateId = "2"
const updateData = {
	"vardas": "gandras pakeistas",
	"rusis": "paukstis pakeista",
	"svoris": 3.555,
	"aplinka": "oras pakeista",
	lt: false
}

const deleteId = "12"

//---------------------------------------------------------------------



function App() {

// laikinos funkcijos testavimui:

	const getAll = async () => {
		const animals = await getAnimalsAPI()
		console.log("Get All:", animals)
	}

	const getById = async (id) => {
		const animalsIdResponse = await getAnimalByIdAPI(id)
		console.log("Get animal by id: ", animalsIdResponse)
	}

	const createAnimal = async (createData) => {
		const createdAnimalId = await createAnimalAPI(createData)
		console.log("Created animal with id: ", createdAnimalId)
	}

	const updateAnimal = async (updateId, updateData) => {
		const updateResponse = await updateAnimalAPI(updateId, updateData)
		console.log("Updated animal: ",updateResponse)
	}

	const deleteAnimal = async (deleteId) => {
		const deletedResponse = await deleteAnimalAPI(deleteId)
		console.log("Deleted animal: ", deletedResponse)
	}

//------------------------------------------------

  return (
    <>
         	<button onClick={(getAll)}>Get All Animals</button>
          	<button onClick={() => getById(id)}>Get animal by id</button>
           	<button onClick={() => createAnimal(createData)}>Create animal</button>
          	<button onClick={() => updateAnimal(updateId, updateData)}>Update animal</button>
		<button onClick={() => deleteAnimal(deleteId)}>Delete Animal</button>
    </>
  )
}

export default App
