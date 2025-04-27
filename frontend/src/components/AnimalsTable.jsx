import React, { useEffect, useState } from "react";
import {
  getAnimalsAPI,
  updateAnimalAPI,
  deleteAnimalAPI,
} from "../api/animalsAPI";
import Filters from "./Filters";
import Create from "./Create";

const AnimalTable = () => {
  const [gyvunai, setGyvunai] = useState([]);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [filters, setFilters] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const duomenys = await getAnimalsAPI(filters);
      setGyvunai(duomenys);
    };
    fetchData();
  }, [filters]);

  const handleSave = async () => {
    const { id, vardas, rusis, svoris, aplinka, lt } = selectedAnimal;

    try {
      await updateAnimalAPI(id, {
        vardas: vardas,
        rusis: rusis,
        svoris: Number(svoris),
        aplinka: aplinka,
        lt: lt === 1 || lt === "1" || lt === true ? true : false,
      });

      setGyvunai((prev) =>
        prev.map((g) => (g.id === id ? { ...selectedAnimal } : g))
      );
      setSelectedAnimal(null);
    } catch (error) {
      console.error("Error updating:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteAnimalAPI(confirmDelete.id);
      setGyvunai((prev) => prev.filter((g) => g.id !== confirmDelete.id));
    } catch (error) {
      console.error("Error deleting:", error);
    } finally {
      setConfirmDelete(null);
    }
  };

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
  }

  return (
    <div className="container">
      <h2 className="title">Gyvūnų sąrašas</h2>

      <Create/>
      <Filters onChange={setFilters} />

      <ul className="animal-list">
        {gyvunai && gyvunai.length > 0 ? (
          gyvunai.map((g) => (
            <li key={g.id} className="animal-item">
              <div className="animal-info">
                <p className="animal-name">
                  {capitalize(g.vardas)}
                </p>
                <p className="animal-details">
                  Rusis: <span>{capitalize(g.rusis)}</span> |
                  Svoris: <span>{g.svoris}</span>kg | Aplinka: <span>{capitalize(g.aplinka)}</span> | Ar gyvena
                  Lietuvoje: <span>{g.lt ? "Taip" : "Ne"}</span>
                </p>
              </div>
              <div className="button-group">
                <button
                  onClick={() => setSelectedAnimal({ ...g })}
                  className="edit-button"
                >
                  Redaguoti
                </button>
                <button
                  onClick={() => setConfirmDelete(g)}
                  className="delete-button"
                >
                  Ištrinti
                </button>
              </div>
            </li>
          ))
        ) : (
          <li className="animal-item">Nieko nerasta...</li>
        )}
      </ul>

      {/* Modalai... */}
      {selectedAnimal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Redaguoti gyvūną</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
            >
              <div>
                <label>Vardas:</label>
                <input
                  type="text"
                  value={selectedAnimal.vardas}
                  onChange={(e) =>
                    setSelectedAnimal({
                      ...selectedAnimal,
                      vardas: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label>Rūšis:</label>
                <input
                  type="text"
                  value={selectedAnimal.rusis}
                  onChange={(e) =>
                    setSelectedAnimal({
                      ...selectedAnimal,
                      rusis: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label>Svoris:</label>
                <input
                  type="number"
                  value={selectedAnimal.svoris}
                  onChange={(e) =>
                    setSelectedAnimal({
                      ...selectedAnimal,
                      svoris: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label>Aplinka:</label>
                <select
                  value={selectedAnimal.aplinka}
                  onChange={(e) =>
                    setSelectedAnimal({
                      ...selectedAnimal,
                      aplinka: e.target.value,
                    })
                  }
                >
                  <option value="sausuma">Sausuma</option>
                  <option value="oras">Oras</option>
                  <option value="vanduo">Vanduo</option>
                  <option value="po žeme">Po žeme</option>
                </select>
              </div>
              <div>
                <label>Lietuva:</label>
                <input
                  type="checkbox"
                  checked={selectedAnimal.lt}
                  onChange={(e) =>
                    setSelectedAnimal({
                      ...selectedAnimal,
                      lt: e.target.checked,
                    })
                  }
                />
              </div>
              <div className="button-group">
                <button className="edit-button" type="submit">Išsaugoti</button>
                <button type="button" onClick={() => setSelectedAnimal(null)}>
                  Atšaukti
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {confirmDelete && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Patvirtinkite ištrynimą</h3>
            <p>Ar tikrai norite ištrinti gyvūną: {confirmDelete.vardas}?</p>
            <button onClick={handleDelete}>Ištrinti</button>
            <button onClick={() => setConfirmDelete(null)}>Atšaukti</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnimalTable;
