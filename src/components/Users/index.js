import React, { useState, useEffect } from 'react';
import axios from 'axios';

// hostnames
import { backendBaseUrl } from '../../shared/hostnames';
// styling
import { Container, Input, Table } from 'semantic-ui-react';

// TODO:
// 1. add link for each table row to individual user
// 2. "amount pipe"
// 3. "currency pipe"
// 4. Search bar

const Users = () => {
	const [users, setUsers] = useState([])
	const [searchPhrase, setSearchPhrase] = useState('');

	useEffect(() => {
		// fetch all users
		axios.get(`${backendBaseUrl}/orders`)
			.then((res) => {
				if (res.data) {
					setUsers(res.data)
				} else {
					console.log("Error in response")
				}
			})
			.catch((err) => console.log(err))
	}, [])

	return (
		<Container>
			<Input focus placeholder="Search name, address ..." />
			<Table celled>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>Username</Table.HeaderCell>
						<Table.HeaderCell>Address</Table.HeaderCell>
						<Table.HeaderCell>Gender</Table.HeaderCell>
						<Table.HeaderCell>Order Total</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
				{
					users.length > 0 ? users.map((user, userId) => {
						return (
							<Table.Row key={userId}>
								<Table.Cell>{user.first_name}&nbsp;{user.last_name}</Table.Cell>
								<Table.Cell>{user.address.address1}</Table.Cell>
								<Table.Cell>{user.gender}</Table.Cell>
								<Table.Cell>{user.order_total.amount}</Table.Cell>
							</Table.Row>
						)
					}) : null
				}
				</Table.Body>
			</Table>	
		</Container>
	)
};

export default Users;