/*
Purpose: Provides the default layout structure for the application.
Features:
Likely includes a navigation bar, sidebar, or header that is consistent across pages.
Ensures that all main sections of the app (e.g., Home, Add/Edit Transactions, Analytics) have a unified design.
It serves as a container for rendering different child components based on user navigation.
*/
import React from "react";
import { Menu, Dropdown} from "antd";
import {useNavigate} from 'react-router-dom'

import "../resources/default-layout.css";
function DefaultLayout(props) {
   // Main component that defines the default layout for the application.
  const user = JSON.parse(localStorage.getItem("finance-tracker-user"));
  // Retrieving the user object from local storage and parsing it to JavaScript object.
  const navigate = useNavigate()
  // Initializing the navigate hook to handle route changes.
  const menu = (
     // Defining a dropdown menu for user actions, such as logout.
    <Menu
      items={[
        {
          label: (
            <li onClick={()=>{
              localStorage.removeItem('finance-tracker-user')
              navigate("/login");
            }}>Logout</li>
          ),
        }
      ]}
    />
  );
  return (
    <div className="layout">
      {/* Header section with logo and user dropdown */}
      <div className="header d-flex justify-content-between align-items-center">
        <div>
          <h1 className="logo">Expense Tracker</h1>
          {/* Displaying the title of the application */}
        </div>
        <div>
          <Dropdown overlay={menu} placement="bottomLeft">
            <button className='primary'>{user.name}</button>
          </Dropdown>
        </div>
      </div>
      {/* Content section to display child components */}
      <div className="content">{props.children}</div>
    </div>
  );
}

export default DefaultLayout;