import React from 'react'
import { PhotoModel } from '../../models/PhotoModel';
import AddLightbox from './AddLightbox';

interface WithLightBoxProps {
    photos: PhotoModel[];
    children?: React.ReactNode;
}

const WithLightBox = (props: WithLightBoxProps) => {
    return (
        <div>
            {props.children}
        </div>
    )
}

export default AddLightbox(WithLightBox);
