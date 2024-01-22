import {createRef, KeyboardEventHandler, useCallback, useEffect, useId, useMemo, useState} from "react";
import styles from "./good-select.module.css";
import {useOnClickOutside} from "usehooks-ts";

export type OptionProps = {
    label: string;
    value: string;
};

export type BadSelectProps = {
    label: string;
    options: Array<OptionProps>;
    onChange: (value?: string) => void;
};

const optionId = (prefix: string, index?: number) => {
    return index ? `${prefix}-${index};` : undefined;
};

const GoodSelect = ({options, label, onChange}: BadSelectProps) => {
    const containerRef = createRef<HTMLDivElement>();
    const [selected, setSelected] = useState<undefined | string>(undefined);
    const [active, setActive] = useState<undefined | number>(undefined);
    const [expanded, setExpanded] = useState<boolean>(false);

    // aria vars
    const labelId = useId();
    const listId = useId();
    const optionPrefix = useId();
    const popupType = "listbox";
    const activeId = optionId(optionPrefix, active);

    const changeHandler = useCallback((value?: string) => {
        onChange(value)
    }, [onChange]);

    useEffect(() => {
        changeHandler(selected);
    }, [changeHandler, selected]);

    useEffect(() => {
        if(!expanded)
            setActive(undefined);
    }, [expanded]);

    useOnClickOutside(containerRef, () => {
        setExpanded(false);
    });

    const selectedLabel = useMemo(() => {
        return options.find(({value}) => value === selected)?.label || "select a value";
    }, [selected, options]);

    const optionClasses = useCallback((value: string, index: number) => [
        styles.listOption,
        value === selected ? styles["listOption--selected"] : undefined,
        index === active ? styles["listOption--active"] : undefined
    ].join(" "), [selected, active]);

    const keyHandler: KeyboardEventHandler = useCallback((event) => {
        event.preventDefault();

        switch (event.key) {
            case "ArrowDown":
                if (!expanded) {
                    setExpanded(true);
                } else {
                    if (active === undefined)
                        setActive(0)
                    else
                        setActive((active + 1) % options.length)
                }
                break;
            case "ArrowUp":
                if (!expanded || active === undefined)
                    break;

                if (active === 0)
                    setActive(options.length - 1)
                else
                    setActive(active - 1);
                break;
            case " ":
                if (!expanded)
                    setExpanded(true)
                if (expanded && active !== undefined) {
                    setSelected(options[active].value);
                    setExpanded(false);
                }
                break;
            case "Escape":
                setExpanded(false);
                break;
            default:
        }
    }, [expanded, active, options]);

    const optionClick = (value: string) => {
        setSelected(value);
        setExpanded(false);
    };

    return <div className={styles.container} ref={containerRef}>
        <p id={labelId} className={styles.label}>{label}</p>
        <button className={styles.trigger} onClick={() => setExpanded(true)}
            // aria attributes
                role={"combobox"}
                aria-controls={expanded ? listId : undefined}
                aria-haspopup={popupType}
                aria-expanded={expanded}
                aria-activedescendant={activeId}
                aria-labelledby={labelId}
                onKeyUp={keyHandler}
        >
            {selectedLabel}
        </button>
        <div className={styles.listContainer}>
            {
                expanded && <ul id={listId} className={styles.listWrapper} role={popupType}>
                    {
                        options.map(({label, value}, i) => (
                            <li key={i} className={optionClasses(value, i)} onClick={() => optionClick(value)}
                                // aria attributes
                                onMouseEnter={() => setActive(i)}
                                id={optionId(optionPrefix, i)}
                                role={"option"}
                                aria-selected={value === selected}
                            >
                                {label}
                            </li>
                        ))
                    }
                </ul>
            }
        </div>
    </div>
};

export default GoodSelect;