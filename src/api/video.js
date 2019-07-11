import { ajax } from "../utils";
import { Base_URL } from "../utils/variables";
import { getUser } from "./user";
import moment from "moment";
const url = `${Base_URL}videos`;

export const getVideos = () => ajax.getData(url);
export const getVideo = id => ajax.getData(url + "/" + id);
export const getCommentsOfVideo = id =>
	ajax.getData(url + "/" + id + "/comments");

export async function getVideoDetails(id) {
	const video = await getVideo(id);
	const userId = video.userId;
	const user = await getUser(userId);
	const uploadedTime = video.uploadedAt;

	const videoInfo = {
		id: video.id,
		uploader: user,
		title: video.title,
        uploadTime: moment(uploadedTime).format("MMM Do YYYY HH:MM:SS a"),
        relateUploadTime:moment(uploadedTime).startOf('day').fromNow(),
		url: video.url,
		description: video.description
	};
	return videoInfo;
}
export async function getVideosList(limited) {
	const videos = await getVideos();
	let videosList = [];
	for (let i = 0; i < (limited ? limited : videos.length); i++) {
		let item = videos[i];
		let id = item.id;
		item = await getVideoDetails(id);
		videosList.push(item);
	}
	return videosList;
}

export async function getVideoComments(id) {
	const comments = await getCommentsOfVideo(id);
	let commentsList = [];
	for (let i = 0; i < (comments.length); i++) {
		let item = comments[i];
		let userId = item.userId;
        let user = await getUser(userId);
        let relatedDate = moment(item.date).startOf('day').fromNow()
        let date = moment(item.date).format("MMMM Do YYYY, h:mm:ss a'")
        let commentDetail = {
            user: user,
            date: date,
            relatedDate: relatedDate,
            body:item.body,
            
        }
		commentsList.push(commentDetail);
	}
	return commentsList;
}
