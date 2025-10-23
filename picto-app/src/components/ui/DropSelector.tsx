import React, { useState, useRef, useEffect } from "react";
import { MdCheck, MdKeyboardArrowDown } from "react-icons/md";
import "@css/DropSelector.css";

export interface SelectorOption {
    value: string;
    label: string;
    icon?: React.ReactNode;
}

interface DropSelectorProps {
    id: string;
    value: string;
    onChange: (value: string) => void;
    options: SelectorOption[];
    placeholder?: string;
    disabled?: boolean;
    variant?: "default" | "compact" | "icon";
    width?: string;
}

const DropSelector: React.FC<DropSelectorProps> = ({
    id,
    value,
    onChange,
    options,
    placeholder = "Sélectionner...",
    disabled = false,
    variant = "default",
    width = "200px",
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectorRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find(opt => opt.value === value);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent): void => {
            if (selectorRef.current && !selectorRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        const handleEscape = (event: KeyboardEvent): void => {
            if (event.key === "Escape") {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener("keydown", handleEscape);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen]);

    const handleToggle = (): void => {
        if (!disabled) {
            setIsOpen(!isOpen);
        }
    };

    const handleSelect = (optionValue: string): void => {
        onChange(optionValue);
        setIsOpen(false);
    };

    const handleKeyDown = (event: React.KeyboardEvent, optionValue: string): void => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handleSelect(optionValue);
        }
    };

    return (
        <div
            ref={selectorRef}
            className={`enhanced-selector enhanced-selector--${variant} ${
                isOpen ? "enhanced-selector--open" : ""
            } ${disabled ? "enhanced-selector--disabled" : ""}`}
            style={{ width }}
        >
            <button
                type="button"
                id={id}
                className="enhanced-selector__trigger"
                onClick={handleToggle}
                disabled={disabled}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                aria-labelledby={`${id}-label`}
            >
                <span className="enhanced-selector__value">
                    {selectedOption ? (
                        <>
                            {variant === "icon" && selectedOption.icon && (
                                <span className="enhanced-selector__icon">
                                    {selectedOption.icon}
                                </span>
                            )}
                            <span className="enhanced-selector__label">
                                {selectedOption.label}
                            </span>
                        </>
                    ) : (
                        <span className="enhanced-selector__placeholder">
                            {placeholder}
                        </span>
                    )}
                </span>
                <span
                    className={`enhanced-selector__arrow ${
                        isOpen ? "enhanced-selector__arrow--open" : ""
                    }`}
                >
                    <MdKeyboardArrowDown />
                </span>
            </button>

            {isOpen && (
                <div className="enhanced-selector__dropdown" role="listbox">
                    {options.map((option) => (
                        <div
                            key={option.value}
                            className={`enhanced-selector__option ${
                                option.value === value
                                    ? "enhanced-selector__option--selected"
                                    : ""
                            }`}
                            onClick={() => handleSelect(option.value)}
                            onKeyDown={(e) => handleKeyDown(e, option.value)}
                            role="option"
                            aria-selected={option.value === value}
                            tabIndex={0}
                        >
                            {variant === "icon" && option.icon && (
                                <span className="enhanced-selector__option-icon">
                                    {option.icon}
                                </span>
                            )}
                            <span className="enhanced-selector__option-label">
                                {option.label}
                            </span>
                            {option.value === value && (
                                <span className="enhanced-selector__checkmark">
                                    <MdCheck />
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DropSelector;