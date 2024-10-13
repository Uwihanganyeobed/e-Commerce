import React from 'react'

const PaginateElement = () => {
  return (
    <div style={{marginTop: '1rem'}}>
      <div className='container pb-5'>
  <nav aria-label="Page navigation example">
    <ul className="pagination">
      <li className="page-item">
        <a className="page-link" href="#1">Previous</a>
      </li>
      <li className="page-item">
        <a className="page-link" href="#2">1</a>
      </li>
      <li className="page-item">
        <a className="page-link" href="#3">2</a>
      </li>
      <li className="page-item">
        <a className="page-link" href="#4">...</a>
      </li>
      <li className="page-item">
        <a className="page-link" href="#4">10</a>
      </li>
      <li className="page-item">
        <a className="page-link" href="#5">Next</a>
      </li>
    </ul>
  </nav>
  </div>
    </div>
  )
}

export default PaginateElement