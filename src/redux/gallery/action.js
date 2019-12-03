
import emitter from "../../common/event";
import { GET_PHOTOS_FAILED, GET_PHOTOS_SUCCESS, UPLOAD_PHOTOS_FAILED, UPLOAD_PHOTOS_SUCCESS } from "./type";
import { getPhotos, uploadPhotos } from "../../common/api";

export function actionGetPhotos(params = {}, userId) {
    return async dispatch => {
        try {
            const res = await getPhotos(userId, params);
            dispatch({
                type: GET_PHOTOS_SUCCESS,
                payload: res.data
            });
            emitter.emit(GET_PHOTOS_SUCCESS, res.data);
        } catch (error) {
            emitter.emit(GET_PHOTOS_FAILED, error);
        }
    }
}

export function actionUploadPhotos(images, userId) {
    return async dispatch => {
        try {
            const res = await uploadPhotos(images, userId)
            emitter.emit(UPLOAD_PHOTOS_SUCCESS, res);
        } catch (error) {
            emitter.emit(UPLOAD_PHOTOS_FAILED, error);
        }
    }
}