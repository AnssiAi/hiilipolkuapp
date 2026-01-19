import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useUser } from "../context/UserContext"

function ProductSearch() {
    const { t } = useTranslation();
    const { fetchProducts, fetchByQuery } = useUser();
    const [search, setSearch] = useState<string | undefined>(undefined)


    const handleSearch = (e: React.SyntheticEvent): void => {
        e.preventDefault();
        if (search) {
            fetchByQuery(search);
        } else {
            fetchProducts();
        }
    }

    const handleChange = (e: React.SyntheticEvent): void => {
        e.preventDefault();
        if (e.target instanceof HTMLInputElement) {
            setSearch(e.target.value)
            if (!e.target.value) {
                fetchProducts();
            } 
        }
    }

    return (
        <div className="searchContainer">
            <div className="testInput">
                <input id="searchInput" name="search input" type="text" placeholder="Search..." maxLength={50} onChange={handleChange} value={search} />
            </div>
            <button type="button" className="btn-primary" onClick={handleSearch} aria-label="Search">
                <div className="btn-container">
                    <i className="bi bi-search"></i>
                    {t("search")}
                </div>
            </button>
        </div>
    )
}

export default ProductSearch