import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './component_styles.css';
import { SidebarData } from './SidebarData.jsx';
import { SidebarDataAdmin } from './SidebarDataAdmin.jsx';
import AuthContext from '../AuthContext';

function Sidebar() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <div className='Sidebar' style={{ backgroundColor: '#222222' }}>
        <ul className='SidebarList'>
        </ul>
      </div>
    );
  }

  const toLink = (Link) => {
    navigate(Link);
  }

  // Decide qué datos de la barra lateral utilizar según el tipo de usuario
  const sidebarData = user && user.isAdmin ? SidebarDataAdmin : SidebarData;

  return (
    <>
      <div className='Sidebar'>
        <ul className='SidebarList'>
          {sidebarData.map((val, key) => {
            return (
              <div key={val.title} className='row'>
                <div className='title'> {val.title} </div>
                <div>
                  {val.options.map((items, key) => {
                    return (
                      <a key={key} href='#' onClick={() => toLink(items.link)} className='subRow'>
                        {items.title}
                      </a>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
