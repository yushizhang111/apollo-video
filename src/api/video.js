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
	console.log(video);
	const userId = video.userId;
	const user = await getUser(userId);
	const uploadedTime = video.uploadedAt;

	const videoInfo = {
		uploader: user,
		title: video.title,
		uploadTime: moment(uploadedTime).format("DD/MM/YYYY HH:MM"),
		url: video.url,
		description: video.description
	};
	return videoInfo;
}
export async function getVideosList(limited) {
	const videos = await getVideos();
	console.log(videos.length);
	let videosList = [];
	for (let i = 0; i < (limited ? limited : videos.length); i++) {
		console.log(i);
		let item = videos[i];
		let id = item.id;
		item = await getVideoDetails(id);
		console.log(item);
		videosList.push(item);
	}
	console.log(videosList);
	return videosList;
}
