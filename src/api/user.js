import { ajax } from "../utils";
import { Base_URL } from "../utils/variables";

const url = `${Base_URL}/users`;
export const getUserList = () => ajax.getData(url);
export const getUser = id => ajax.getData(url + "/" + id);
export const getVideosUploadedByUser = id =>
	ajax.getData(url + "/" + id + "/videos");
