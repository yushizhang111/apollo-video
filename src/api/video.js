import { ajax } from '../utils';
import { Base_URL } from '../utils/variables';

const url = `${Base_URL}/videos`;
export const getUserList = () => ajax.getData(url);
export const getUser = (id) => ajax.getData(url + '/' + id);
export const getCommentsOfVideo = (id) => ajax.getData(url + '/' + id + '/comments');
