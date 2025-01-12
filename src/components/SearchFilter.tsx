import React from "react";

interface SearchFilterProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        className="w-full p-2 border border-gray-300 rounded-lg"
        placeholder="Pesquisar por título"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default SearchFilter;
