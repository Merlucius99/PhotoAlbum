import React, { useState } from 'react'
import { PhotoModel } from '../../models/PhotoModel';
import { Modal, Form, Button, Icon, Message } from 'semantic-ui-react';

interface PhotoFormProps {
    formType: 'New' | 'Edit';
    index: string;
    photoProp?: PhotoModel;
    editPhoto: Function;
    createPhoto: Function;
}

const PhotoForm = (props: PhotoFormProps) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isError, setIsError] = useState(false);
    const emptyPhoto: PhotoModel = {
        id: '',
        description: '',
        title: '',
        url: ''
    }

    const [photo, setPhoto] = useState<PhotoModel>(emptyPhoto);

    const handleInputChange = (name: string, value: string | string[] | any) => {
        const updatedPhoto = {
            ...photo,
            [name]: value
        }
        setPhoto(updatedPhoto);
    }

    const isFormValid = () => {
        if (!photo) return false;
        else if (!photo.title) return false;
        else if (!photo.description) return false;
        else if (!photo.url) return false;
    
        return true;
    }

    const handleSubmit = (event: any) => {
        if (!isFormValid()) {
          setIsError(true);
          return;
        }
        setIsError(false);
    
        const { editPhoto, createPhoto, index } = props;
    
        if (isNewForm()) {
            createPhoto(photo);
        } else {
            editPhoto(index, photo);
        }
        closeForm();
      }

    const showForm = () => {
        const { photoProp } = props;
        setIsModalOpen(true);
        setPhoto(photoProp || emptyPhoto);
    }

    const closeForm = () => setIsModalOpen(false);
    const isNewForm = () => props.formType === 'New';

    return (
        <Modal
          trigger={
            <Button icon onClick={showForm}>
              <Icon name={isNewForm() ? 'plus' : 'edit'} />
            </Button>
          }
          closeIcon
          open={isModalOpen}
          onClose={closeForm}
        >
          <Modal.Header>{isNewForm() ? 'Add Photo' : `Edit: ${photo.title}`}</Modal.Header>
          <Modal.Content>
            <Form error={isError}>
              <Message
                error
                content='Fill out all fields and try again...'
              />
              <Form.Input
                name="title"
                label="Title"
                placeholder="Photo title"
                defaultValue={isNewForm() ? '' : photo.title}
                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                required
              />
              <Form.TextArea
                name="description"
                label="Description"
                placeholder="Tell more about the photo..."
                defaultValue={isNewForm() ? '' : photo.description}
                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                required
              />
              <Form.Input
                name="url"
                label="URL"
                placeholder="URL of the photo"
                defaultValue={isNewForm() ? '' : photo.url}
                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                required
              />
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button positive icon='save' content='Save' onClick={(e) => {handleSubmit(e)}} />
          </Modal.Actions>
        </Modal>
      )
}

export default PhotoForm
