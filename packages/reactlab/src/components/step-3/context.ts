import {OptionProps} from "./GoodSelect.tsx";

export type SelectState = {
    selected?: string;
    active?: number;
    expanded: boolean;
    options: Array<OptionProps>;
};

type ActivateOption = {type: "option/activate", payload?: number};
type NextOption = {type: "option/next"};
type PreviousOption = {type: "option/previous"};
type SelectOption = {type: "option/select", payload: string};
type SelectActiveOption = {type: "option/selectActive"};
type ToggleList = {type: "list/toggle", payload: boolean};

export type SelectAction = ActivateOption
    | NextOption
    | PreviousOption
    | SelectOption
    | SelectActiveOption
    | ToggleList;

export const selectReducer = (state: SelectState, action: SelectAction):SelectState => {
    switch (action.type) {
        case "option/select":
            return {
                ...state,
                selected: action.payload,
                expanded: false
            };
        case "option/selectActive":
            if(state.active === undefined)
                return state;

            return {
                ...state,
                selected: state.options[state.active].value,
                expanded: false
            };
        case "list/toggle":
            return {
                ...state,
                expanded: action.payload,
                active: !action.payload ? undefined : state.active
            };
        case "option/activate":
            return {
                ...state,
                active: action.payload
            };
        case "option/next":
            return {
                ...state,
                expanded: true,
                active: state.active !== undefined
                    ? (state.active + 1) % state.options.length
                    : 0
            };
        case "option/previous":
            if(state.active === undefined)
                return state;

            return {
                ...state,
                expanded: true,
                active: state.active === 0
                    ? state.options.length - 1
                    : state.active - 1
            };
        default:
            return state;
    }
};