import { useTranslation } from "react-i18next";
import { supportedLanguages } from "../i18n/config"

const selectOptions: string[] = Object.keys(supportedLanguages);

function LanguageSelect() {
    const { t, i18n } = useTranslation();

    const changeLanguage = (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (e.target instanceof HTMLSelectElement) {
            i18n.changeLanguage(e.target.value);
        }
    }

    return (
        <div className="languageSelect">
            <label htmlFor="language-select">{t("language.select")}:</label>
            <select name="Language" id="language-select" onChange={changeLanguage}>{selectOptions.map((item) => (
                <option value={item} selected={item === i18n.resolvedLanguage}>{item.toUpperCase()}</option>
            ))}</select>
        </div>
    )
}

export default LanguageSelect;