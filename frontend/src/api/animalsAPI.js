import axios from 'axios'



const getAnimalsAPI = async (params) => {
      try {
            const response = await axios.get("http://localhost:3000/animals/", {params})
            return response.data
      } catch (error) {
            console.log("Error geting all Animals: ", error )
      }
}

const getAnimalByIdAPI = async (id) => {
      try {
            const response = await axios.get(`http://localhost:3000/animals/${id}`)
            return response.data
      } catch (error) {
            console.log("Error geting Animals by ID: ", error )
      }
}

const createAnimalAPI = async (data) => {
      try {
            const response = await axios.post(`http://localhost:3000/animals/`, data)
            return response.data
      } catch (error) {
            console.log("Error creating Animals: ", error )
      }
}

const updateAnimalAPI = async (id, data) => {
      try {
            const response = await axios.put(`http://localhost:3000/animals/${id}`, data)
            return response.data
      } catch (error) {
            console.log(`Error updating Animal, id: ${id} `, error )
      }
}

const deleteAnimalAPI = async (id) => {
      try {
            const response = await axios.delete(`http://localhost:3000/animals/${id}`)
            return response.data
      } catch (error) {
            console.log(`Error deleting animal, id: ${id}`, error)
      }
}


export {getAnimalsAPI, getAnimalByIdAPI, createAnimalAPI, updateAnimalAPI, deleteAnimalAPI}