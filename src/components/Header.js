import React from "react";
import {useState} from "react"
import "../styles/Header.css";
import SearchIcon from '@material-ui/icons/Search';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Table from "./Table"

function Header() {

    const[searchTerm, setSearchTerm] = useState("");

    // onChange to track the search term typed
    const onChange = (e) => {
        setSearchTerm(e.target.value);
    }
    
    //top searchbar
    return(
        <div>
            <div className="header">
                <div className="header-middle">
                    <SearchIcon />
                    <input placeholder="Search news" type="text" onChange={onChange}/>
                    <ArrowDropDownIcon className="header-inputCare" />
                </div>
            </div>
            <Table searchTerm={searchTerm}/>
        </div>
    )
}

export default Header;