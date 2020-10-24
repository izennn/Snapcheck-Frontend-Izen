import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

// import context
import { UserContext } from '../../contexts/UserContext';
// import styling
import { Menu } from 'semantic-ui-react';

const Navbar = (props) => {
	const [activeItem, setActiveItem] = useState('');
	const user = useContext(UserContext);
	const { setIsLoggedIn } = props;
	// locks up context to first time it finds a provider 

	return (
		<Menu secondary>
			<Menu.Item
				name='users'
				active={activeItem === 'users'}
				onClick={() => setActiveItem('users')}
				as={Link}
				to='/users'
			/>
			<Menu.Menu position='right'>
				<Menu.Item
					name={`Hello, ${user.firstName} ${user.lastName}`}
				/>
				<Menu.Item
					name='logout'
					active={activeItem === 'logout'}
					onClick={() => handleLogout()}
				/>
			</Menu.Menu>	
		</Menu>	
	)		

	function handleLogout() {
		setIsLoggedIn(false);
		user.setFirstName('');
		user.setLastName('');
	}
}

export default Navbar;