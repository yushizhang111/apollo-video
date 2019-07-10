import { ajax } from "../utils";
import { Base_URL } from "../utils/variables";
import { getVideoDetails } from "./video";
import moment from "moment";

const url = `${Base_URL}/profile`;
export const getProfile = () => ajax.getData(url);
export async function getWatchedVideos(limit) {
	const currentUser = await getProfile();
	const watchedVideos = currentUser.watched;
	let watchedVideoList = [];
	for (let i = 0; i < (limit ? limit : watchedVideos.length); i++) {
		let video = watchedVideos[i];
		let videoId = video.videoId;
		let videoDetail = await getVideoDetails(videoId);
		let lastViewedTime = moment(video.lastViewed).format(
			"DD/MM/YYYY HH:MM"
		);
		let watchedVideo = {
			id: videoId,
			video: videoDetail,
			percentage: video.percentage,
			times: video.times,
			lastViewed: lastViewedTime
		};
		watchedVideoList.push(watchedVideo);
	}
	console.log(watchedVideoList);
	return watchedVideoList;
}
