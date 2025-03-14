import { useState } from "react";
import { PlusCircle } from "lucide-react";

const CourseBuilder = () => {
  const [sectionName, setSectionName] = useState("");

  const handleCreateSection = () => {
    if (sectionName.trim() !== "") {
      alert(`Section Created: ${sectionName}`);
      setSectionName("");
    }
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg w-full max-w-md">
      <h2 className="text-lg font-semibold mb-3">Course Builder</h2>
      <input
        type="text"
        value={sectionName}
        onChange={(e) => setSectionName(e.target.value)}
        placeholder="Add a section to build your course"
        className="w-full bg-gray-700 text-white px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-yellow-400"
      />
      <button
        onClick={handleCreateSection}
        className="mt-4 flex items-center gap-2 px-4 py-2 border-2 border-yellow-400 text-yellow-400 rounded-md hover:bg-yellow-400 hover:text-black transition"
      >
        <PlusCircle size={18} />
        Create Section
      </button>
    </div>
  );
};

export default CourseBuilder;
