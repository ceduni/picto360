import React from "react";
import "@css/ToggleSwitch.css";

interface ToggleSwitchProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    id: string;
    // Optional: icons to display in the circle
    checkedIcon?: React.ReactNode;
    uncheckedIcon?: React.ReactNode;
    // Optional: text labels on the track
    checkedLabel?: string;
    uncheckedLabel?: string;
    // Optional: text inside the circle
    checkedText?: string;
    uncheckedText?: string;
    // Style variant
    variant?: "icon" | "text" | "label" | "default";
    disabled?: boolean;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
    checked,
    onChange,
    id,
    checkedIcon,
    uncheckedIcon,
    checkedLabel,
    uncheckedLabel,
    checkedText,
    uncheckedText,
    variant = "default",
    disabled = false,
}) => {
    return (
        <div className={`toggle ${variant !== "default" ? `toggle--${variant}` : ""}`}>
            <input
                type="checkbox"
                id={id}
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                className="toggle__checkbox"
                disabled={disabled}
            />
            <label htmlFor={id} className="toggle__label">
                <span className="toggle__track">
                    {/* Track labels (shown on the background) */}
                    {variant === "label" && (
                        <>
                            <span className="toggle__track-label toggle__track-label--left">
                                {uncheckedLabel}
                            </span>
                            <span className="toggle__track-label toggle__track-label--right">
                                {checkedLabel}
                            </span>
                        </>
                    )}
                </span>
                <span className="toggle__thumb">
                    {/* Icon variant - show icon in circle */}
                    {variant === "icon" && (
                        <span className="toggle__icon">
                            {checked ? checkedIcon : uncheckedIcon}
                        </span>
                    )}
                    {/* Text variant - show text in circle */}
                    {variant === "text" && (
                        <span className="toggle__text">
                            {checked ? checkedText : uncheckedText}
                        </span>
                    )}
                </span>
            </label>
        </div>
    );
};

export default ToggleSwitch;