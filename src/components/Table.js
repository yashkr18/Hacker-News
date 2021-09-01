import React from 'react';
import TablePagination from '@material-ui/core/TablePagination';
import {Link} from "react-router-dom"
import { useState,useEffect } from 'react';
import "../styles/Table.css"
import Loading from "../utils/Loading"



export default function Table({searchTerm}) {
  
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [stories, setStories] = useState([]);
  const [count,setCount] = useState(5);
  const [loading,setLoading] = useState(true);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  // const emptyRows = 
  // rowsPerPage - Math.min(rowsPerPage, stories.length - page * rowsPerPage);



  useEffect(() => {
      const url = searchTerm === ""
      ? "https://hn.algolia.com/api/v1/search_by_date?tags=(story,poll)"
      : `http://hn.algolia.com/api/v1/search?query=${searchTerm}`;


      const getStoriesData = async () => {

          await fetch(url)
          .then((response) => response.json())
          .then((data) => {
              var count = Object.keys(data.hits).length;
              const stories = data.hits.map(({title,url,points,num_comments,objectID,author}) => ({title,url,points,num_comments,objectID,author}))
              setCount(count);
              setStories(stories);
              setLoading(false);
          });           

      }

      getStoriesData();
  }, [searchTerm]);


//  use when pagination block is not required to collapse
  // const emptyRows = 
  // rowsPerPage - Math.min(rowsPerPage, stories.length - page * rowsPerPage);

  return (
    
    <div className="table">
      {loading ? <Loading />:
        <div>
          <table >
            <thead>
              <tr clasName="head">
                <th style={{width:"45%"}}>Title</th>
                <th style={{width:"18%"}}>Author</th>
                <th style={{width:"18%"}}>Points</th>
                <th style={{width:"18%"}}>Comments</th>
              </tr>
            </thead>
            <tbody>
              {stories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((story) => (          
              <tr key={story.objectID}className="table-row" >
                  <td >    
                      <Link 
                          className="title"
                          id="titles" 
                          to={{
                              pathname: "/postDetail",
                              state: { id:story.objectID }                                
                          }}
                          >
                          {story.title}
                      </Link>
                  </td>
                  <td className="autthor">{story.author}</td>
                  <td className="points">{story.points}</td>
                  <td className="comments">{story.num_comments}</td>                    
              </tr>               
              ))}
              {/* {emptyRows > 0 && (
                <tr style = {{height: 53 * emptyRows}}>
                  <td colSpan={6}></td>
                </tr>
              )} */}
            </tbody>
          </table>
          <TablePagination
          id = "pagination"
          component="table"
          count={count}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      }
    </div>

  );
}
