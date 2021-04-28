import React from 'react'
import { PhotoModel } from '../../models/PhotoModel'
import { Card, Image, Button } from 'semantic-ui-react';
import { WithLightbox } from '../Common';

interface PhotoProps {
    photo: PhotoModel;
}

const Photo: React.FC<PhotoProps> = ({ photo, children }) => {

    // Note that we did not define a 'children' prop. 
    // This represents the child nodes/components of the current component, and
    // it is provided automatically as a prop by React.
    // It is type defined by the React.FC<Props> type used for the component. 

    return (
        <Card className='photo'>
            <WithLightbox photos={[photo]}>
                <Image src={photo.url} />
            </WithLightbox>
            <Card.Content>  
                <Card.Header>
                {photo.title}
                </Card.Header>
                <Card.Meta>
                {photo.description}
                </Card.Meta>
            </Card.Content>
            <Button.Group basic attached='bottom'>
                {children}
            </Button.Group>
        </Card>
    )
}

export default Photo
