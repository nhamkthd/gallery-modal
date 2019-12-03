import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Icon, Label } from "semantic-ui-react";
import routesMap from "../../common/routesMap";

export default function MainMenu(props) {

  return (
    <Menu
      color={'blue'}
      inverted
      secondary
      vertical={props.vertical && props.vertical}
      style={{ padding: "10px" }}
      fixed={props.fixed ? props.fixed : 'left'}
    >
      <Menu.Item
        active={props.activeItem === "Home"}
        as={Link}
        to={routesMap.gallery}
        onClick={() => props.setActiveItem("Home")}
      >
        <Icon name="home" />
        Home
      </Menu.Item>
      <Menu.Item
        active={props.activeItem === "Setting"}
        as={Link}
        to={routesMap.setting}
        onClick={() => props.setActiveItem("Setting")}
      >
        <Icon name="setting" />
        Seeting
      </Menu.Item>
      <Menu.Item
        active={props.activeItem === "Notification"}
        as={Link}
        to={routesMap.notification}
        onClick={() => props.setActiveItem("Notification")}
      >
        <Icon name="bell" />
        Notifications
      </Menu.Item>
      <Menu.Item
        onClick={(e) => props.onLogout(e)}
      >
        <Icon name="sign-out" />
        Logout
      </Menu.Item>
    </Menu>
  );
}
