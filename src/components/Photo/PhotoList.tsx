import React from 'react'
import { PhotoModel } from '../../models/PhotoModel'
import Photo, { PhotoForm } from '../Photo';
import { Card } from 'semantic-ui-react'
import StatusBar from '../StatusBar';
import { DeleteButton } from '../Common';

interface PhotoListProps {
    photos: PhotoModel[];
    deletePhoto: (index: string) => void;
    editPhoto: Function;
    createPhoto: Function;
}

const PhotoList = ({ photos, deletePhoto, editPhoto, createPhoto }: PhotoListProps) => {
    
    const renderPhoto = () => {
        return (
          photos
          .map(photo => {
            return (
              <Photo 
                key={photo.id} 
                photo={photo}
              >
                  {/* Everything between the 'Photo' tags is considered a child of the Photo component
                  and is passed by React to the Photo component in the 'children' prop. In this case, they are the Edit and Delete buttons */}
                <PhotoForm 
                  formType='Edit'
                  photoProp={photo}
                  index={photo.id}
                  editPhoto={editPhoto} 
                  createPhoto={createPhoto}
                />
                <DeleteButton
                  index={photo.id}
                  objectName={photo.title}
                  deleteObject={deletePhoto}
                />  
              </Photo>
            );
          })
        );
      };

    return (
        <div>
            <StatusBar title={`${photos.length} Photo(s) total`}>
                <PhotoForm 
                formType='New'
                createPhoto={createPhoto} 
                index={''}
                editPhoto={editPhoto}
                />
            </StatusBar>
            <Card.Group itemsPerRow={6} doubling>
                {renderPhoto()}
            </Card.Group>
        </div>
    )
}

export default PhotoList;
