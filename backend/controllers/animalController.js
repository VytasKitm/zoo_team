import {
  createAnimal,
  getAllAnimals,
  removeAnimal,
  updateAnimal,
  getAnimalById,
} from "../models/animal.js";

async function create(req, res) {
  const { vardas, rusis, svoris, aplinka, lt } = req.body;
  try {
    if (!vardas) {
      return res.status(400).json({
        error: `Truksta vardo.`,
      });
    }
    if (!rusis) {
      return res.status(400).json({
        error: `Truksta rusies.`,
      });
    }
    if (!svoris) {
      return res.status(400).json({
        error: `Truksta svorio.`,
      });
    }
    if (!aplinka) {
      return res.status(400).json({
        error: `Truksta aplinkos.`,
      });
    }
    if (typeof lt !== "boolean") {
      return res.status(400).json({
        error: `Truksta gyvenimo vietos.`,
      });
    }
    const animalId = await createAnimal(req.body);
    res.status(201).json(animalId);
  } catch (error) {
    console.log(`Cant create animal. ${error}`);
  }
}

// Nauja getAll funkcija, kuri kviečia modelį
async function getAll(req, res) {
  try {
    // console.log(req.query)
    // const {
    //   q = '',
    //   sort = '',
    //   order = 'asc',
    //   lt = 'false',
    // } = req.query
    // const filters = {
    //   q,
    //   sort,
    //   order: order.toLowerCase() === 'desc' ? 'desc' : 'asc',
    //   lt: lt === 'false'
    // }

    const animals = await getAllAnimals(req.query);
    console.log(`req.query: ${JSON.stringify(req.query)}`)
    res.status(200).json(animals);
  } catch (error) {
    console.error("Klaida gaunant gyvūnus controller:", error);
    res.status(500).json({ error: "Nepavyko gauti gyvūnų." });
  }
}

// Funkcija, kuri pašalina gyvūną pagal ID
async function remove(req, res) {
  const { id } = req.params;

  try {
    const deleted = await removeAnimal(id);

    if (!deleted) {
      return res.status(404).json({ error: "Gyvūnas nerastas." });
    }

    res.status(200).json({ message: `Gyvūnas sėkmingai pašalintas.` });
  } catch (error) {
    console.error("Klaida šalinant gyvūną:", error);
    res.status(500).json({ error: "Nepavyko pašalinti gyvūno." });
  }
}

// Atnaujinti gyvūną pagal ID
async function update(req, res) {
  const { id } = req.params;
  const { vardas, rusis, svoris, aplinka, lt } = req.body;

  try {
    // Patikrinam ar toks gyvūnas egzistuoja
    const existingAnimal = await getAnimalById(id);
    if (!existingAnimal) {
      return res.status(404).json({ error: "Gyvūnas su tokiu ID nerastas." });
    }

    // Validacija
    if (!vardas) return res.status(400).json({ error: "Trūksta vardo." });
    if (!rusis) return res.status(400).json({ error: "Trūksta rūšies." });
    if (!svoris) return res.status(400).json({ error: "Trūksta svorio." });
    if (!aplinka) return res.status(400).json({ error: "Trūksta aplinkos." });
    if (typeof lt !== "boolean")
      return res
        .status(400)
        .json({ error: "Netinkama gyvenimo vietos (lt) reikšmė." });

    const updated = await updateAnimal(id, {
      vardas,
      rusis,
      svoris,
      aplinka,
      lt,
    });

    if (!updated) {
      return res.status(500).json({ error: "Nepavyko atnaujinti gyvūno." });
    }

    res.status(200).json({ message: "Gyvūnas sėkmingai atnaujintas." });
  } catch (error) {
    console.error("Klaida atnaujinant gyvūną:", error);
    res.status(500).json({ error: "Nepavyko atnaujinti gyvūno." });
  }
}

// Gauti vieną gyvūną pagal ID
async function getById(req, res) {
  const { id } = req.params;

  try {
    const animal = await getAnimalById(id);

    if (!animal) {
      return res.status(404).json({ error: "Gyvūnas nerastas." });
    }

    res.status(200).json(animal);
  } catch (error) {
    console.error("Klaida gaunant gyvūną pagal ID:", error);
    res.status(500).json({ error: "Nepavyko gauti gyvūno." });
  }
}

export { create, getAll, remove, update, getById };
