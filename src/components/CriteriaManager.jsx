import React from "react";

const CriteriaManager = ({
  criteria,
  setCriteria,
  newCriterion,
  setNewCriterion,
  criteriaMatrix,
  setCriteriaMatrix,
  alternativeMatrices,
  setAlternativeMatrices,
}) => {
  const addCriterion = () => {
    if (!newCriterion.trim()) return;
    const newCrit = newCriterion.trim();
    if (criteria.includes(newCrit)) {
      alert("Tiêu chí đã tồn tại!");
      return;
    }

    setCriteria([...criteria, newCrit]);

    const newRow = Array(criteria.length + 1).fill(1);
    const newMatrix = criteriaMatrix.map((row) => [...row, 1]);
    newMatrix.push(newRow);
    setCriteriaMatrix(newMatrix);

    const newAltMatrix = Array(alternatives.length)
      .fill()
      .map(() => Array(alternatives.length).fill(1));
    setAlternativeMatrices((prev) => ({
      ...prev,
      [newCrit]: newAltMatrix,
    }));

    setNewCriterion("");
  };

  const removeCriterion = (index) => {
    if (criteria.length <= 2) {
      alert("Phải có tối thiểu 2 tiêu chí!");
      return;
    }

    const critToRemove = criteria[index];
    const newCriteria = criteria.filter((_, i) => i !== index);
    setCriteria(newCriteria);

    const newMatrix = criteriaMatrix
      .filter((_, i) => i !== index)
      .map((row) => row.filter((_, j) => j !== index));
    setCriteriaMatrix(newMatrix);

    const newAltMatrices = { ...alternativeMatrices };
    delete newAltMatrices[critToRemove];
    setAlternativeMatrices(newAltMatrices);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-xl font-semibold mb-4">Quản lý Tiêu chí</h2>
      <div className="flex items-center mb-4">
        <input
          type="text"
          value={newCriterion}
          onChange={(e) => setNewCriterion(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
          placeholder="Nhập tiêu chí mới (ví dụ: TDEE)"
        />
        <button
          onClick={addCriterion}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Thêm Tiêu chí
        </button>
      </div>
      <ul className="list-disc pl-5">
        {criteria.map((crit, index) => (
          <li key={crit} className="flex items-center justify-between py-1">
            <span>{crit}</span>
            {index >= 2 && (
              <button
                onClick={() => removeCriterion(index)}
                className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
              >
                Xóa
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CriteriaManager;
