import React, { useState } from "react";
import "./Index.scss";
import { domData } from "../../../DomData";
import Icon from "@mdi/react";
import {
  mdiAccountCircle,
  mdiStar,
  mdiStarOutline,
} from "@mdi/js";
import { Col, Row, Table } from "antd";


const Inbox = () => {
  const [starred, setStarred] = useState({});

  const tableColumns = [
    {
      dataIndex: 'image',
      key: 'image',
      className: 'UserImage'
    },
    {
      dataIndex: 'name',
      key: 'name',
      className: 'UserName',
    },
    {
      dataIndex: 'subject',
      key: 'subject',
      className: 'Subject'
    },
    {
      key: 'star',
      render: (value, record) => (
        <span onClick={onStarClicked} className="StarredIcon" id={record.key} >
          {
            starred[record.key] ?
              <Icon path={mdiStar}
                size={1}
              /> :
              <Icon path={mdiStarOutline}
                size={1}
              />
          }
        </span>
      ),
      className: 'StarredMsg'
    },
  ];

  /* Table Data */
  const tableData = []
  for (let i = 0; i < 40; i++) {
    tableData.push(
      {
        key: i,
        image: <Icon path={mdiAccountCircle} size={1.4} />,
        name: 'Adeola Mercy',
        subject: 'Just trying to get a msg across to the...',
      }
    )
  }

  function onStarClicked(e) {
    let target = e.target.closest('.StarredIcon').id
    let stars = starred

    if (stars[target]) {
      stars[target] = false
    }
    else {
      stars[target] = true
    }

    setStarred((state)=>({
      ...stars
    }))
  }


  return (
    <Row>
      <Col xs={24}>
        <Table className='InboxTable' columns={tableColumns} dataSource={tableData} />
      </Col>
    </Row>
  );
};

export default Inbox;
