import React, { Component } from 'react';
import { Menu, Container, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
  state = {
    activeItem: '',
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
    return (
      <Menu inverted size="huge">
        <Container>
          <Menu.Item>
            <Image size="tiny" src="https://www.club-os.com/hubfs/Website%20Images/logo-white.png?t=1524854663136" alt="ClubOS" />
          </Menu.Item>
          <Menu.Item
            name="home"
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
            as={Link}
            to="/"
          >
            All Users
          </Menu.Item>
          <Menu.Item
            name="register"
            active={activeItem === 'register'}
            onClick={this.handleItemClick}
            as={Link}
            to="/register"
          >
            New User
          </Menu.Item>
        </Container>
      </Menu>

    );
  }
}
