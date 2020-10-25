import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

// hostnames
import { backendBaseUrl } from '../../shared/hostnames';
// styling
import { Container, Input, Table } from 'semantic-ui-react';

// TODO
// 1. add link for each table row to individual user
// 4. Search bar: could search by firstname, lastname, or amount

const Users = () => {
	const [users, setUsers] = useState([]);
	const [displayOrders, setDisplayOrders] = useState([]);
	const searchPhrase = useFormInput('');
	const history = useHistory();

	// on mount, fetch users and store into const users
	useEffect(() => {
		// fetch all users
		axios.get(`${backendBaseUrl}/orders`)
			.then((res) => {
				if (res.data) {
					setUsers(res.data);
					setDisplayOrders(res.data);
				} else {
					console.log("Error in backend/orders response");
				}
			})
			.catch((err) => console.log(err))
	}, [])

	// on search phrase change, load temp search results to displayOrders
	useEffect(() => {
		if (searchPhrase === '') {
			setDisplayOrders(users);
		} else {
			// set display orders as orders that have 1. first name 2. last name, or 3. amount matching
		}
	}, [searchPhrase, users])

	return (
		<Container style={{overflowY: 'auto'}}>
			<Input 
				focus 
				placeholder="Search name, address ..." 
				{...searchPhrase}
			/>
			<Table celled>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>Username</Table.HeaderCell>
						<Table.HeaderCell>Address</Table.HeaderCell>
						<Table.HeaderCell>Gender</Table.HeaderCell>
						<Table.HeaderCell>Age</Table.HeaderCell>
						<Table.HeaderCell 
							style={{
								textAlign: 'right'
							}}
						>
							Amount
						</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
				{
					displayOrders.length > 0 ? displayOrders.map((user) => {
						return (
							<Table.Row 
								key={user.id}
								onClick={() => changeToEditUser(user.id)}
							>
								<Table.Cell collapsing>{user.first_name}&nbsp;{user.last_name}</Table.Cell>
								<Table.Cell>{addressPipe(user.address)}</Table.Cell>
								<Table.Cell collapsing>{user.gender}</Table.Cell>
								<Table.Cell collapsing>{user.age}</Table.Cell>
								<Table.Cell textAlign='right' collapsing>{amountPipe(user.order_total)}</Table.Cell>
							</Table.Row>
						)
					}) : null
				}
				</Table.Body>
			</Table>	
		</Container>
	)

	// on table row click, change to EditUser component with specified id
	// do so by changing the path 
	function changeToEditUser(id) {
		history.push(`/users/${id}/`);
	}

	function useFormInput(initialValue) {
		const [value, setValue] = useState(initialValue);
		function handleChange(e) {
			setValue(e.target.value);
		}

		return {
			value, 
			onChange: handleChange
		};
	}	

	// given address, return formatted string
	function addressPipe(address) {
		const { address1, address2, city, state, zip } = address;

		let returnString = `${address1} ${address2} ${city}, ${state} ${zip}`;
		return returnString;
	}

	// given order_total object, return formatted amount i.e. currency symbol and dec
	function amountPipe(order_total) {
		if (order_total === null || order_total.amount === undefined) {
			return "Null";
		}

		let amountString = order_total.amount.toString();
		let amountStringLen = amountString.length;
		let currency = order_total.currency;

		if (amountStringLen === 1) {
			amountString = `0.0${amountString}`;
		} else if (amountStringLen === 2) {
			amountString = `0.${amountString}`;
		} else {
			let dotIndex = amountStringLen - 2;
			let temp = amountString.slice(0, dotIndex) + '.' + amountString.slice(dotIndex);
			amountString = temp;
		}

		return `${amountString} ${currency}`;
	}
};

export default withRouter(Users);