import React, { useState } from 'react'
import { AlbumModel } from '../../models/AlbumModel';
import { Modal, Form, Button, Icon, Message } from 'semantic-ui-react';
import { PhotoModel } from '../../models/PhotoModel';

interface AlbumFormProps {
    formType: 'New' | 'Edit';
    photos: PhotoModel[];
    index: string;
    albumProp?: AlbumModel;
    editAlbum: Function;
    createAlbum: Function;
}

const AlbumForm = (props: AlbumFormProps) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isError, setIsError] = useState(false);
    const emptyAlbum: AlbumModel = {
        id: '',
        name: '',
        description: '',
        tags: [],
        photoIds: []
    }

    const [album, setAlbum] = useState<AlbumModel>(emptyAlbum);

    const { photos } = props;

    const options = photos
                    .map(photo => {
                        return {
                            text: photo.title,
                            value: photo.id,
                            image: { avartar: true, src: photo.url }
                        }
                    });

    const handleInputChange = (name: string, value: string | string[] | any) => {
        const updatedAlbum = {
            ...album,
            [name]: value
        }
        setAlbum(updatedAlbum);
    }

    const isFormValid = () => {
        if (!album) return false;
        else if (!album.name) return false;
        else if (!album.description) return false;
        else if (!album.tags || album.tags.length === 0) return false;
        else if (!album.photoIds || album.photoIds.length === 0) return false;
    
        return true;
    }

    const handleSubmit = (event: any) => {
        if (!isFormValid()) {
          setIsError(true);
          return;
        }
        setIsError(false);
    
        const { editAlbum, createAlbum, index } = props;
    
        if (isNewForm()) {
            createAlbum(album);
        } else {
            editAlbum(index, album);
        }
        closeForm();
      }

    const showForm = () => {
        const { albumProp } = props;
        setIsModalOpen(true);
        setAlbum(albumProp || emptyAlbum);
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
          <Modal.Header>{isNewForm() ? 'Add Photo' : `Edit: ${album.name}`}</Modal.Header>
          <Modal.Content>
            <Form error={isError}>
              <Message
                error
                content='Fill out all fields and try again...'
              />
              <Form.Input
                name="name"
                label="Name"
                placeholder="Album name"
                defaultValue={isNewForm() ? '' : album.name}
                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                required
              />
              <Form.TextArea
                name="description"
                label="Description"
                placeholder="Tell more about the album..."
                defaultValue={isNewForm() ? '' : album.description}
                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                required
              />
              <Form.Input
                name="tags"
                label="Tags"
                placeholder="Enter tags separated by |"
                defaultValue={isNewForm() ? '' : album.tags.join('|')}
                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                required
                icon='tags'
                iconPosition='left'
              />
              <Form.Dropdown
                name="photoIds"
                label="PhotoIds"
                placeholder="Select photos for this album"
                defaultValue={isNewForm() ? '' : album.photoIds}
                onChange={(e, data) => handleInputChange(data.name, data.value)}
                required
                fluid
                multiple
                selection
                options={options}
              />
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button positive icon='save' content='Save' onClick={(e) => {handleSubmit(e)}} />
          </Modal.Actions>
        </Modal>
      )
}

export default AlbumForm;
