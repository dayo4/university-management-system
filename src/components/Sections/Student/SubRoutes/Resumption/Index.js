import React, { useEffect } from 'react'
import { Row, Col, Button } from 'antd';
import Icon from '@mdi/react';
import {
  mdiPencilOutline,
  mdiDeleteOutline,
  mdiAccountCircle,
  mdiNoteEdit
} from '@mdi/js';
import "./Index.scss"



const Resumption = ({setBreadCrumb}) => {
  useEffect(() => {
    setBreadCrumb()
  })

  return (
    <Row>
      <Row wrap>

      </Row>
    </Row>
  )
}

export default Resumption