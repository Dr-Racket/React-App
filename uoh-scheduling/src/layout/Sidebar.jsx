import React from 'react';
import { useNavigate } from 'react-router-dom';
import './component_styles.css';
import { SidebarData } from './SidebarData.jsx';

/* Sidebar index */
function Sidebar(){

	const navigate = useNavigate();

	const toLink = (Link) =>  {
		navigate(Link);
	}

	return (
		<>
		<div className='Sidebar'>
			{/* Orden Categorias */}
			<ul className='SidebarList'>
				{/* Mapping SidebarDataList*/}
				{SidebarData.map((val, key) => {
					return (
						<div key={val.title} className='row'>
						<div className='title'> { val.title } </div>
						{/* Mapping SidebarDataList subRows*/}
						<div>
						  {val.options.map((items, key) => {
							      return (
						    <a key={key} href='#'  onClick={() => toLink(items.link)} className='subRow'>
						      { items.title }
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
};


export default Sidebar;
