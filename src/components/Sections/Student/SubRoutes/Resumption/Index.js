import React, { useEffect } from 'react'
import { Row, Col, Button, Upload } from 'antd';
import Icon from '@mdi/react';
import {
  mdiPencilOutline,
  mdiDeleteOutline,
  mdiAccountCircle,
  mdiNoteEdit,
  mdiUpload
} from '@mdi/js';
import "./Index.scss"



const Resumption = () => {
  const uploadProps = {
    name: 'assessment',
    action: 'https://www.random.com',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    progress: {
      strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068',
      },
      strokeWidth: 3,
      format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
    },
  };

  return (
    // <Row>
    <Row justify={"center"} align={"center"} dir="column" className="Resumption">
      <Col xs={20}>
        <h6 className='Heading'>Manage Resumption Forms</h6>
      </Col>
      <Col xs={20} sm={16} md={12}>
        <Row justify={'center'}>
          <Row className='DragAndDrop' justify={'center'}>
            <Col xs={20}>
              <Icon path={mdiUpload}
                title="upload"
                style={{ marginRight: '3px' }}
                size={5}
              />
            </Col>
            <Col className='Text' xs={20}>
              Drag And Drop Files Here
            </Col>
          </Row>
        </Row>
        <Row justify={'center'} align={'middle'}>

          <Upload  {...uploadProps}>
            <Button className='UploadBtn' icon={<Icon path={mdiUpload}
              title="upload"
              style={{ marginRight: '3px' }}
              size={1}
            />}>Upload Files</Button>
          </Upload>
        </Row>
      </Col>
    </Row>
    // </Row>
  )
}

export default Resumption