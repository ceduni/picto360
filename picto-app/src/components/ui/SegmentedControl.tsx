import React from "react";
import "@css/SegmentedControl.css";

export interface SegmentOption {
    value: string;
    label: string;
    icon?: React.ReactNode;
}

interface SegmentedControlProps {
    id: string;
    value: string;
    onChange: (value: string) => void;
    options: SegmentOption[];
    disabled?: boolean;
    variant?: "default" | "icon" | "compact";
    fullWidth?: boolean;
}

const SegmentedControl: React.FC<SegmentedControlProps> = ({
    id,
    value,
    onChange,
    options,
    disabled = false,
    variant = "default",
    fullWidth = false,
}) => {
    const selectedIndex = options.findIndex(opt => opt.value === value);

    return (
        <div
            className={`segmented-control segmented-control--${variant} ${
                fullWidth ? "segmented-control--full-width" : ""
            } ${disabled ? "segmented-control--disabled" : ""}`}
            role="radiogroup"
            aria-labelledby={`${id}-label`}
        >
            {/* Sliding background indicator */}
            <div
                className="segmented-control__slider"
                style={{
                    transform: `translateX(${selectedIndex * 100}%)`,
                    width: `${100 / options.length}%`,
                }}
                aria-hidden="true"
            />

            {/* Segment buttons */}
            {options.map((option) => (
                <button
                    key={option.value}
                    type="button"
                    className={`segmented-control__segment ${
                        option.value === value ? "segmented-control__segment--active" : ""
                    }`}
                    onClick={() => !disabled && onChange(option.value)}
                    disabled={disabled}
                    role="radio"
                    aria-checked={option.value === value}
                    aria-label={option.label}
                >
                    {variant === "icon" && option.icon && (
                        <span className="segmented-control__icon">
                            {option.icon}
                        </span>
                    )}
                    <span className="segmented-control__label">
                        {option.label}
                    </span>
                </button>
            ))}
        </div>
    );
};

export default SegmentedControl;