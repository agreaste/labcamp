import {createRef, useCallback, useEffect, useMemo, useState} from "react";
import styles from "./bad-select.module.css";
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

const BadSelect = ({options, label, onChange}: BadSelectProps) => {
    const containerRef = createRef<HTMLDivElement>();
    const [selected, setSelected] = useState<undefined | string>(undefined);
    const [expanded, setExpanded] = useState<boolean>(false);

    const changeHandler = useCallback((value?: string) => {
        onChange(value)
    }, [onChange]);

    useEffect(() => {
        changeHandler(selected);
    }, [changeHandler, selected]);

    useOnClickOutside(containerRef, () => {
       setExpanded(false);
    });

    const selectedLabel = useMemo(() => {
        return options.find(({value}) => value === selected)?.label || "select a value";
    }, [selected, options]);

    const optionClick = (value: string) => {
        setSelected(value);
        setExpanded(false);
    };

    const optionClasses = useCallback((value: string) => [
        styles.listOption,
        value === selected ? styles["listOption--selected"] : undefined
    ].join(" "), [selected]);

    return <div className={styles.container} ref={containerRef}>
        <p className={styles.label}>{label}</p>
        <button className={styles.trigger} onClick={() => setExpanded(true)}>
            {selectedLabel}
        </button>
        <div className={styles.listContainer}>
            {
                expanded && <ul className={styles.listWrapper}>
                    {
                        options.map(({label, value}, i) => (
                            <li key={i} className={optionClasses(value)} onClick={() => optionClick(value)}>{label}</li>
                        ))
                    }
                </ul>
            }
        </div>
    </div>
};

export default BadSelect;