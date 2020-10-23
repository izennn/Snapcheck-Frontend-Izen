import React, { useState, useContext } from 'react';

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
				name='home'
				active={activeItem === 'home'}
				onClick={() => setActiveItem('home')}
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
	}
}

export default Navbar;