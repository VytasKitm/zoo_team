import { createAnimal } from "../models/animal.js";

async function create(req, res) {
      const {vardas, rusis, svoris, aplinka, lt} = req.body
      try {
            if (!vardas) {
                  return res.status(400).json({
                        error: `Truksta vardo.`
                  })
            }
            if (!rusis) {
                  return res.status(400).json({
                        error: `Truksta rusies.`
                  })
            }
            if (!svoris) {
                  return res.status(400).json({
                        error: `Truksta svorio.`
                  })
            }
            if (!aplinka) {
                  return res.status(400).json({
                        error: `Truksta aplinkos.`
                  })
            }
            if (typeof lt !== "boolean") {
                  return res.status(400).json({
                        error: `Truksta gyvenimo vietos.`
                  })
            }
            const animalId = await createAnimal(req.body)
            res.status(201).json(animalId);
      } catch (error) {
            console.log(`Cant create animal. ${error}`)
      }
}

export {create}