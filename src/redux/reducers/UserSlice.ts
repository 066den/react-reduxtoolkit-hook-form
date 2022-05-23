import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../../types/IUser'
interface UserState {
	users: IUser[]
	stepForm: number
	user: object
}

const initialState: UserState = {
	users: [],
	stepForm: 1,
	user: {},
}

export const userSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		addData(state, action: PayloadAction<IUser>) {
			state.user = { ...state.user, ...action.payload }
		},
		addUser(state, action: PayloadAction<IUser>) {
			state.users.push({ ...action.payload, id: Date.now() })
		},
		removeUser(state, action) {
			state.users = state.users.filter(user => user.id !== action.payload)
		},
	},
})

export default userSlice.reducer
