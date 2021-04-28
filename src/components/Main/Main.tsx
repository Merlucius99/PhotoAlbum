import React, { useEffect, useState } from 'react';
import { AlbumModel } from '../../models/AlbumModel';
import { PhotoModel } from '../../models/PhotoModel';
import { AlbumList } from '../Album';
import { PhotoList } from '../Photo';
import { Message } from 'semantic-ui-react';
import * as api from '../../api';
import { Route, Switch } from 'react-router';




const Main = () => {

    const [albums, setAlbums] = useState<AlbumModel[]>([]);
    const [photos, setPhotos] = useState<PhotoModel[]>([]);

    useEffect(() => {
        const localAlbums = localStorage.getItem('albums');
        const localPhotos = localStorage.getItem('photos');
        if(localAlbums && localPhotos){
            setAlbums(JSON.parse(localAlbums));
            setPhotos(JSON.parse(localPhotos));
        } else {
            const albumsResponse = api.getAlbums();
            const photosResponse = api.getPhotos();
            setAlbums(albumsResponse);
            setPhotos(photosResponse);
        }
    }, []);

    useEffect(() =>{
        localStorage.setItem(
            'albums',JSON.stringify(albums)
        );
    }, [albums]);

    useEffect(() =>{
        localStorage.setItem(
            'photos',JSON.stringify(photos)
        );
    }, [photos]);

    const createAlbum = (album: AlbumModel) => {
        const timestamp = Date.now();
        album.id = `album-${timestamp}`;
        setAlbums(prevAlbums => [...prevAlbums, album]);
    }
    const editAlbum = (key: string, updateAlbum: AlbumModel) => {
        const updateAlbums = albums.map(album => album.id === key ? updateAlbum : album);
        setAlbums(updateAlbums);
    }
    const deleteAlbum = (key: string) => {
        const updateAlbums = albums.filter(album => album.id !== key );
        setAlbums(updateAlbums);
    }

    const createPhoto = (photo: PhotoModel) => {
        const timestamp = Date.now();
        photo.id = `photo-${timestamp}`;
        setPhotos(prevAlbums => [...prevAlbums, photo]);
    }
    const editPhoto = (key: string, updatePhoto: PhotoModel) => {
        const updatePhotos = photos.map(photo => photo.id === key ? updatePhoto : photo);
        setPhotos(updatePhotos);
    }
    const deletePhoto = (key: string) => {
        const updatePhotos = photos.filter(photo => photo.id !== key );
        setPhotos(updatePhotos);
    }

    const albumList = () => <AlbumList
                    albums={albums}
                    photos={photos}
                    deleteAlbum={deleteAlbum}
                    editAlbum={editAlbum}
                    createAlbum={createAlbum}
                    />;

    const photoList = () => <PhotoList
                    photos={photos}
                    deletePhoto={deletePhoto}
                    editPhoto={editPhoto}
                    createPhoto={createPhoto}
                    />;

    const error = () => <Message
                    icon="warning circle"
                    header="Ups.. Error!"
                    content="Please go back and try again."
                    />;

    return(
        <Switch>
            <Route exact path="/" component={albumList}/>
            <Route exact path="/albums" component={albumList}/>
            <Route exact path="/photos" component={photoList}/>
            <Route render={error}/>
        </Switch>
    )
}


export default Main