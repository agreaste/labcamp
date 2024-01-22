import {createRef, KeyboardEventHandler, useCallback, useEffect, useId, useMemo, useReducer} from "react";
import styles from "./good-select.module.css";
import {useOnClickOutside} from "usehooks-ts";
import {selectReducer} from "../step-3/context.ts";

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
    return index ? `${prefix}-${index}` : undefined;
};

const GoodSelect = ({options, label, onChange}: BadSelectProps) => {
    const containerRef = createRef<HTMLDivElement>();
    const [state, dispatch] = useReducer(selectReducer, {expanded: false, options});
    const {selected, active, expanded} = state;

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

    useOnClickOutside(containerRef, () => {
        dispatch({type: "list/toggle", payload: false});
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
                    dispatch({type: "list/toggle", payload: true})
                } else {
                    dispatch({type: "option/next"});
                }
                break;
            case "ArrowUp":
                dispatch({type: "option/previous"});
                break;
            case " ":
                if (!expanded)
                    dispatch({type: "list/toggle", payload: true})
                if (expanded && active !== undefined) {
                    dispatch({type: "option/selectActive"})
                }
                break;
            case "Escape":
                dispatch({type: "list/toggle", payload: false})
                break;
            default:
        }
    }, [expanded, active]);

    const optionClick = (value: string) => {
        dispatch({type: "option/select", payload: value})
    };

    return <div className={styles.container} ref={containerRef}>
        <p id={labelId} className={styles.label}>{label}</p>
        <button className={styles.trigger} onClick={() => dispatch({type: "list/toggle", payload: true})}
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
                                onMouseEnter={() => dispatch({type: "option/activate"})}
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