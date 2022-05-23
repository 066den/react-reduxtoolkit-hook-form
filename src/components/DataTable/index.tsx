import { FC } from 'react'
import CreateUser from '../CreateUser'
import DataList from './DataList'

const DataTable: FC = () => {
	return (
		<div className='card'>
			<CreateUser />
			<DataList />
		</div>
	)
}

export default DataTable
