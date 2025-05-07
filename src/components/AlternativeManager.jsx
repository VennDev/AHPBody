import React from "react";

const AlternativeManager = ({
  alternatives,
  setAlternatives,
  newAlternative,
  setNewAlternative,
  alternativeMatrices,
  setAlternativeMatrices,
}) => {
  const addAlternative = () => {
    if (!newAlternative.trim()) return;
    const newAlt = newAlternative.trim();
    if (alternatives.includes(newAlt)) {
      alert("Phương án đã tồn tại!");
      return;
    }

    setAlternatives([...alternatives, newAlt]);

    const newAltMatrices = { ...alternativeMatrices };
    Object.keys(newAltMatrices).forEach((criterion) => {
      const matrix = newAltMatrices[criterion];
      const newRow = Array(matrix.length + 1).fill(1);
      const newMatrix = matrix.map((row) => [...row, 1]);
      newMatrix.push(newRow);
      newAltMatrices[criterion] = newMatrix;
    });
    setAlternativeMatrices(newAltMatrices);

    setNewAlternative("");
  };

  const removeAlternative = (index) => {
    const newAlternatives = alternatives.filter((_, i) => i !== index);
    setAlternatives(newAlternatives);

    const newAltMatrices = { ...alternativeMatrices };
    Object.keys(newAltMatrices).forEach((criterion) => {
      const matrix = newAltMatrices[criterion];
      const newMatrix = matrix
        .filter((_, i) => i !== index)
        .map((row) => row.filter((_, j) => j !== index));
      newAltMatrices[criterion] = newMatrix;
    });
    setAlternativeMatrices(newAltMatrices);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-xl font-semibold mb-4">Quản lý Phương án</h2>
      <div className="flex items-center mb-4">
        <input
          type="text"
          value={newAlternative}
          onChange={(e) => setNewAlternative(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
          placeholder="Nhập phương án mới (ví dụ: Béo phì)"
        />
        <button
          onClick={addAlternative}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Thêm Phương án
        </button>
      </div>

      <ul className="list-disc pl-5">
        {alternatives.map((alt, index) => (
          <li key={alt} className="flex items-center justify-between py-1">
            <span>{alt}</span>
            <button
              onClick={() => removeAlternative(index)}
              className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
            >
              Xóa
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlternativeManager;
