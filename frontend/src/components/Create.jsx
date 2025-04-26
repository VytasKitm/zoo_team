import React, {useState} from 'react'
import { createAnimalAPI } from '../api/animalsAPI'

const data = {
        vardas: '',
        rusis: '',
        svoris: '',
        aplinka: 'sausuma',
        lt: false
}



const Create = () => {
        const [gyvunaiData, setGyvunasData] = useState(data)
        const [infoText, setInfoText] = useState('')

        const setData = (prop, value) => {
                setGyvunasData(prev => ({...prev, [prop]: value}))
                console.log(gyvunaiData)
        }

        const writeGyvunasToDB = () => {
                const vardas = gyvunaiData.vardas?.toString().trim()
                const rusis = gyvunaiData.rusis?.toString().trim()
                const svorisStr = gyvunaiData.svoris?.toString().trim()

                if (!vardas) {
                        setInfoText("Uzpildykite vardo lauka.")
                        return
                }

                if (!rusis) {
                        setInfoText("Uzpildykite rusies lauka.")
                        return
                }

                if (!svorisStr) {
                        setInfoText("Uzpildykite svorio lauka.")
                        return
                }

                const svorisNum = Number(svorisStr)

                if (Number.isNaN(svorisNum)) {
                        setInfoText("Svoris turi buti skaicius")
                        return
                }
                setGyvunasData((prev) => ({
                        ...prev,
                        vardas: vardas,
                        rusis: rusis,
                        svoris: svorisNum
                }))
                createAnimalAPI(gyvunaiData)
                setInfoText("Gyvunas sekmingai sukurtas")
                setGyvunasData((prev) => ({
                        ...prev,
                        vardas: '',
                        rusis: '',
                        svoris: '',
                        aplinka: 'sausuma',
                        lt: false
                }))
        }

  return (
    <div>
        <label> Pavadinimas
                <input type="text" value={gyvunaiData.vardas} onChange={(e) => setData('vardas', e.target.value)}/>
        </label>
        <label> Rusis
                <input type="text" value={gyvunaiData.rusis} onChange={(e) => setData('rusis', e.target.value)}/>
        </label>
        <label> Svoris
                <input type="text" value={gyvunaiData.svoris} onChange={(e) => setData('svoris', e.target.value )} />
        </label>
        <label> Ar gyvena Lietuvoje
                <input type="checkbox" checked={gyvunaiData.lt} onChange={(e) => setData('lt', e.target.checked)} />
        </label>
        <label> Aplinka{' '}
                <select value={gyvunaiData.aplinka} onChange={(e) => setData('aplinka', e.target.value)}>
                        <option value="sausuma">Sausuma</option>
                        <option value="oras">Oras</option>
                        <option value="vanduo">Vanduo</option>
                        <option value="po zeme">Po zeme</option>
                </select>
        </label>
        <label > Sukurti gyvuna
                <button onClick={writeGyvunasToDB}>Sukurti gyvuna</button>
        </label>
        <h3>{infoText}</h3>
        
    </div>
  )
}

export default Create
