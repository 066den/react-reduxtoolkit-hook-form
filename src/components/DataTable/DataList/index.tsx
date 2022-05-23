import { FC } from 'react'
import { useAppSelector } from '../../../hooks/redux'

import DataItem from './DataItem'

const DataList: FC = () => {
	const { users } = useAppSelector(state => state.userReducer)

	return (
		<div className='dt-wrap'>
			<table className='table data-table'>
				<tr>
					<th></th>
					<th>Company</th>
					<th>Name</th>
					<th>Additional</th>
					<th>Street</th>
					<th>Postal Code</th>
					<th>Country</th>
					<th>IBAN</th>
					<th>BIC</th>
					<th>Bank name</th>
					<th>Fax</th>
					<th>E-mail</th>
					<th>Birthday</th>
					<th>Homepage</th>
				</tr>
				{users &&
					users.map((user, index) => <DataItem key={user.id} user={user} />)}
			</table>
		</div>
	)
}

export default DataList
