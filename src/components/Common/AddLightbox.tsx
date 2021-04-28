import React, { useState } from 'react'
import Lightbox from 'react-images';
import { PhotoModel } from '../../models/PhotoModel';

interface LightBoxState {
    lightboxOpen: boolean;
    lightboxCurrentImage: number
}

interface ExtendedComponentProps {
    photos: PhotoModel[];
    children?: React.ReactNode;
}

const AddLightbox = (WrappedComponent: React.FC<ExtendedComponentProps>) => {
    const ExtendedComponent = (props: ExtendedComponentProps) => {
        const [state, setState] = useState<LightBoxState>({
            lightboxOpen: false,
            lightboxCurrentImage: 0
        });
    
        const handlePlay = () => setState(prevState => ({ ...prevState, lightboxOpen: true}));
        
        const onLightboxClose = () => setState({ lightboxOpen: false, lightboxCurrentImage: 0 });
    
        const goToNextImage = () => setState(prevState => ({ 
            ...prevState, 
            lightboxCurrentImage: prevState.lightboxCurrentImage + 1 
        }));
        
        const goToPrevImage = () => setState(prevState => ({ 
            ...prevState, 
            lightboxCurrentImage: prevState.lightboxCurrentImage - 1 
        }));
        const { photos } = props;
        const lightboxPhotos = 
        photos
          .filter(photo => photo)
          .map(photo => {
            return {
              src: photo.url,
              caption: photo.title,
            }
          });
        return (
            <div onClick={() => handlePlay()}>
                <WrappedComponent {...props} />
                <Lightbox
                    backdropClosesModal
                    images={lightboxPhotos}
                    isOpen={state.lightboxOpen}
                    onClose={() => onLightboxClose()}
                    onClickPrev={() => goToPrevImage()}
                    onClickNext={() => goToNextImage()}
                    currentImage={state.lightboxCurrentImage}
                    onClickImage={() => {}} // Added to avoid warning message https://github.com/jossmac/react-images/issues/171
                />
            </div>
        ) 
      };
    return ExtendedComponent;
}

export default AddLightbox
