import { ajax } from '../utils';
import { Base_URL } from '../utils/variables';

const url = `${Base_URL}videos`;
export const getVideoList = () => ajax.getData(url);
export const getVideo = (id) => ajax.getData(url + '/' + id);
export const getCommentsOfVideo = (id) => ajax.getData(url + '/' + id + '/comments');
