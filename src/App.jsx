import React, { useState } from "react";
import UserInput from "./components/UserInput";
import DivisionCalculator from "./components/DivisionCalculator";
import BodyIndices from "./components/BodyIndices";
import CriteriaManager from "./components/CriteriaManager";
import AlternativeManager from "./components/AlternativeManager";
import CriteriaMatrix from "./components/CriteriaMatrix";
import AlternativeMatrix from "./components/AlternativeMatrix";
import AHPResults from "./components/AHPResults";
import { calculateBodyIndices, calculateAHP } from "./utils/ahpUtils";

const initialCriteria = ["BF%", "WHR", "BMI", "WHtR", "LBM"];
const initialAlternatives = [
  "Suy dinh dưỡng",
  "Béo phì",
  "Thừa cân",
  "Cân đối",
];
const initialCriteriaMatrix = [
  [1, 3, 5, 4, 7],
  [1 / 3, 1, 3, 2, 5],
  [1 / 5, 1 / 3, 1, 1 / 2, 3],
  [1 / 4, 1 / 2, 2, 1, 4],
  [1 / 7, 1 / 5, 1 / 3, 1 / 4, 1],
];
const initialAlternativeMatrices = {
  "BF%": [
    [1, 1 / 3, 5, 1 / 5],
    [3, 1, 7, 1 / 3],
    [1 / 5, 1 / 7, 1, 1 / 7],
    [5, 3, 7, 1],
  ],
  WHR: [
    [1, 1 / 5, 5, 1 / 3],
    [5, 1, 7, 3],
    [1 / 5, 1 / 7, 1, 1 / 7],
    [3, 1 / 3, 7, 1],
  ],
  BMI: [
    [1, 3, 5, 3],
    [1 / 3, 1, 5, 1],
    [1 / 5, 1 / 5, 1, 1 / 5],
    [1 / 3, 1, 5, 1],
  ],
  WHtR: [
    [1, 1, 5, 1],
    [1, 1, 5, 1],
    [1 / 5, 1 / 5, 1, 1 / 5],
    [1, 1, 5, 1],
  ],
  LBM: [
    [1, 1 / 3, 1 / 5, 1 / 3],
    [3, 1, 1, 1],
    [5, 1, 1, 1],
    [3, 1, 1, 1],
  ],
};

const App = () => {
  const [userInput, setUserInput] = useState({
    name: "",
    sex: "1",
    age: "",
    weight: "",
    height: "",
    waist: "",
    buttocks: "",
    message: "",
  });
  const [criteria, setCriteria] = useState(initialCriteria);
  const [alternatives, setAlternatives] = useState(initialAlternatives);
  const [criteriaMatrix, setCriteriaMatrix] = useState(initialCriteriaMatrix);
  const [alternativeMatrices, setAlternativeMatrices] = useState(
    initialAlternativeMatrices
  );
  const [newCriterion, setNewCriterion] = useState("");
  const [newAlternative, setNewAlternative] = useState("");
  const [bodyIndices, setBodyIndices] = useState(null);
  const [results, setResults] = useState(null);
  const [isLoadingBodyIndices, setIsLoadingBodyIndices] = useState(false);
  const [isLoadingAHP, setIsLoadingAHP] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        HỆ THỐNG HỖ TRỢ CHUẨN ĐOÁN THỂ TRẠNG CƠ THỂ
      </h1>
      <UserInput
        userInput={userInput}
        setUserInput={setUserInput}
        calculateBodyIndices={() =>
          calculateBodyIndices(
            userInput,
            setBodyIndices,
            setIsLoadingBodyIndices,
            setSaveStatus
          )
        }
      />
      <CriteriaManager
        criteria={criteria}
        setCriteria={setCriteria}
        newCriterion={newCriterion}
        setNewCriterion={setNewCriterion}
        criteriaMatrix={criteriaMatrix}
        setCriteriaMatrix={setCriteriaMatrix}
        alternativeMatrices={alternativeMatrices}
        setAlternativeMatrices={setAlternativeMatrices}
      />
      <AlternativeManager
        alternatives={alternatives}
        setAlternatives={setAlternatives}
        newAlternative={newAlternative}
        setNewAlternative={setNewAlternative}
        alternativeMatrices={alternativeMatrices}
        setAlternativeMatrices={setAlternativeMatrices}
      />
      <BodyIndices
        bodyIndices={bodyIndices}
        isLoadingBodyIndices={isLoadingBodyIndices}
      />
      <DivisionCalculator /> {/* Add the DivisionCalculator component */}
      <CriteriaMatrix
        criteria={criteria}
        criteriaMatrix={criteriaMatrix}
        setCriteriaMatrix={setCriteriaMatrix}
      />
      {criteria.map((criterion) => (
        <AlternativeMatrix
          key={criterion}
          criterion={criterion}
          alternatives={alternatives}
          alternativeMatrices={alternativeMatrices}
          setAlternativeMatrices={setAlternativeMatrices}
        />
      ))}
      <button
        onClick={() =>
          calculateAHP(
            userInput,
            bodyIndices,
            criteria,
            alternatives,
            criteriaMatrix,
            alternativeMatrices,
            setResults,
            setIsLoadingAHP,
            setSaveStatus
          )
        }
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mb-8"
      >
        Tính AHP
      </button>
      {isLoadingBodyIndices && (
        <p className="text-center">Đang tính toán chỉ số cơ thể...</p>
      )}
      {isLoadingAHP && <p className="text-center">Đang tính toán AHP...</p>}
      {saveStatus && <p className="text-center text-green-600">{saveStatus}</p>}
      <AHPResults
        results={results}
        criteria={criteria}
        alternatives={alternatives}
        isLoadingAHP={isLoadingAHP}
      />
    </div>
  );
};

export default App;
