import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import "./noAccess.scss"

const NoAccess = () => {

  // let Navigate = useNavigate

  return (
    <div className='noAcc-cont'>
      <div className="d-img">
          <div className="top-404">
              404
              <span>PAGE</span>
          </div>

          <div className="text-404">
            Something's <br /> missing.


            <Link to="-1">Go home</Link>
          </div>
      </div>

    </div>
  )
}

export default NoAccess