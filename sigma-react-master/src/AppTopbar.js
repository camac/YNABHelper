import React from 'react';
import { InputText } from 'primereact/inputtext';
import { useSelector } from 'react-redux';

export const AppTopbar = (props) => {

    const rateLimitRemaining = useSelector((state) => state.budget.rateLimitRemaining);

    return (
        <div className="layout-topbar clearfix">
            <button type="button" className="p-link layout-menu-button" onClick={props.onToggleMenu}>
                <span className="pi pi-bars" />
            </button>
            <div className="layout-topbar-icons">
                <span className="layout-topbar-search">
                    <InputText type="text" placeholder="Search" />
                    <span className="layout-topbar-search-icon pi pi-search" />
                </span>
                <button type="button" className="p-link">
                    <span className="layout-topbar-item-text">Requests</span>
                    <span className="layout-topbar-icon pi pi-download" />
                    <span className="layout-topbar-badge">{rateLimitRemaining}</span>
                </button>
                <button type="button" className="p-link">
                    <span className="layout-topbar-item-text">Settings</span>
                    <span className="layout-topbar-icon pi pi-cog" />
                </button>
                <button type="button" className="p-link">
                    <span className="layout-topbar-item-text">User</span>
                    <span className="layout-topbar-icon pi pi-user" />
                </button>
            </div>
        </div>
    );
}
