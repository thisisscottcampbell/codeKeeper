import { ActionType } from '../action-types';
import { Actions } from '../actions';
import { Cell } from '../cell';

interface CellState {
	loading: boolean;
	error: string | null;
	order: string[];
	data: {
		[key: string]: Cell;
	};
}

const initialState: CellState = {
	loading: false,
	error: null,
	order: [],
	data: {},
};

const reducer = (
	state: CellState = initialState,
	action: Actions
): CellState => {
	switch (action.type) {
		case ActionType.UPDATE_CELL:
			return {
				...state,
				data: {
					...state.data,
					[action.payload.id]: {
						...state.data[action.payload.id],
						content: action.payload.content,
					},
				},
			};
		case ActionType.DELETE_CELL:
			return state;
		case ActionType.MOVE_CELL:
			return state;
		case ActionType.INSERT_CELL_BEFORE:
			return state;
		default:
			return state;
	}
};

export default reducer;
