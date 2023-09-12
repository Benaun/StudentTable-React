export default function SearchInput({ searchValue, onSearch }) {

    const handleInputChange = (event) => {
        onSearch(event.target.value);
    };

    return (
        <input
            type="search"
            value={searchValue}
            onChange={handleInputChange}
            placeholder="Поиск"
        />
    )
}