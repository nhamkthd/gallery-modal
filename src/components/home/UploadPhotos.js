import React, { useState, useRef } from 'react';
import { Modal, Button, Form, Message, List, Image, Icon } from "semantic-ui-react";
import produce from "immer";
import { useDispatch } from "react-redux";
import useUserLogin from '../../hooks/useUserLogin';
import { actionUploadPhotos, actionGetPhotos } from '../../redux/gallery/action';
import useEvent from '../../hooks/useEvent';
import { UPLOAD_PHOTOS_SUCCESS, UPLOAD_PHOTOS_FAILED, UPLOAD_PHOTOS_INPROGRESS } from '../../redux/gallery/type';


export default function UploadPhotos(props) {
    const fileInputRef = useRef();
    const dispatch = useDispatch();
    const userLogin = useUserLogin();
    const [images, setImages] = useState([]);
    const [uploadStatus, setUploadStatus] = useState("")

    function bytesToSize(bytes) {
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes == 0) return '0 Byte';
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
    }

    function handleFileChange(e) {
        setUploadStatus("")
        if (images.length > 0) {
            setImages(images.concat(Array.from(e.target.files)))
        } else {
            setImages(Array.from(e.target.files));
        }
    }

    function handleRemoveFile(index) {
        const nextState = produce(images, draftState => {
            draftState.splice(index, 1);
            return draftState;
        });
        setImages(nextState);
    }

    function handleSubmit() {
        if (images.length === 0) return;
        if (!userLogin) return;
        setUploadStatus(UPLOAD_PHOTOS_INPROGRESS)
        dispatch(actionUploadPhotos(images, userLogin.id))
    }

    useEvent(UPLOAD_PHOTOS_SUCCESS, res => {
        setUploadStatus(UPLOAD_PHOTOS_SUCCESS)
        dispatch(actionGetPhotos({},userLogin.id))
        setImages([])
    })

    useEvent(UPLOAD_PHOTOS_FAILED, error => {
        setUploadStatus(UPLOAD_PHOTOS_FAILED)
        console.log(error)
    })

    return (
        <div>
            <Modal trigger={props.uploadButton} closeIcon>
                <Modal.Header>Upload photos</Modal.Header>
                <Modal.Content image>
                    <Modal.Description>
                        {
                            uploadStatus === UPLOAD_PHOTOS_SUCCESS ?
                                <Message positive>
                                    Photos uploaded successfully
                                </Message>
                                : uploadStatus === UPLOAD_PHOTOS_FAILED ?
                                    <Message warning>
                                        Photos upload failed
                                    </Message>
                                    : null
                        }
                        {
                            images.length > 0 ?
                                <Message>
                                    <Message.Header>Files selected</Message.Header>
                                    <List divided>
                                        {
                                            images.map((image, index) =>
                                                <List.Item key={index}>

                                                    <List.Content floated='right'>
                                                        <Button icon size='mini' color="red" onClick={() => handleRemoveFile(index)}><Icon name="close" /></Button>
                                                    </List.Content>
                                                    <Image style={{ width: "30px", height: "30px" }} verticalAlign='middle' src={window.URL.createObjectURL(image)} />
                                                    <span>  {image.name} (<span style={{ color: "green" }}>{bytesToSize(image.size)}</span>)</span>
                                                </List.Item>
                                            )
                                        }
                                    </List>
                                </Message> : null
                        }
                        <Form.Field >
                            {
                                images.length > 0 ?
                                    <Button loading={uploadStatus === UPLOAD_PHOTOS_INPROGRESS} primary floated='right' onClick={handleSubmit}><Icon name="send" /> Submit</Button>
                                    : null
                            }
                            {
                                
                            }
                            <Button
                                floated='right'
                                content={images.length > 0 ? "Choose more files" : "Choose files"}
                                labelPosition="left"
                                icon="file"
                                onClick={() => fileInputRef.current.click()}
                            />
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={(e) => handleFileChange(e)}
                                multiple
                                ref={fileInputRef} />

                        </Form.Field>
                    </Modal.Description>
                </Modal.Content>

            </Modal>
        </div>
    )
}