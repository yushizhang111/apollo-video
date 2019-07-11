import { ajax } from "../utils";
import { Base_URL } from "../utils/variables";
import { getVideoDetails } from "./video";
import { getUser } from "./user";
import moment from "moment";

const url = `${Base_URL}/profile`;
export const getProfile = () => ajax.getData(url);
export const update = data => ajax.updateData(url, data)(JSON.stringify(data));

export async function getSubscribedUser() {
	const currentUser = await getProfile();
	const subscriptions = currentUser.subscriptions;
	let subscribedList = [];
	for (let i = 0; i < subscriptions.length; i++) {
		let item = subscriptions[i];
		let userId = item.userId;
		let user = await getUser(userId);
		subscribedList.push(user);
	}
	return subscribedList;
}

export async function isSubscribed(id) {
	const currentUser = await getProfile();
	const subscriptions = currentUser.subscriptions;
	let isSubscribed = false;
	let index = "";
	for (let i = 0; i < subscriptions.length; i++) {
        let subscription = subscriptions[i];
        let userId = subscription.userId;
        console.log(id)
        console.log(userId);
		if (userId === parseInt(id)) {
			index = i;
			isSubscribed = true;
			break;
		}
	}
	let result = {
		isSubscribed: isSubscribed,
		index: index
	};
	return result;
}

export async function toggleSubscribe(id) {
	const currentUser = await getProfile();
	const result= await isSubscribed(id);
    console.log(result);
	let newUser = "";

	if (result.isSubscribed) {
		delete currentUser.subscriptions[result.index];
		newUser = await update(currentUser);
	} else {
		currentUser.subscriptions.push(parseInt(id));
		newUser = await update(currentUser);
	}
	console.log(newUser);
	return newUser;
}

export async function getWatchedVideos(limit) {
	const currentUser = await getProfile();
	const watchedVideos = currentUser.watched;
	let watchedVideoList = [];
	for (let i = 0; i < (limit ? limit : watchedVideos.length); i++) {
		let video = watchedVideos[i];
		let videoId = video.videoId;
		let videoDetail = await getVideoDetails(videoId);
		let lastViewedTime = moment(video.lastViewed)
			.startOf("day")
			.fromNow();
		let watchedVideo = {
			id: parseInt(videoId),
			video: videoDetail,
			percentage: video.percentage,
			times: video.times,
			lastViewed: lastViewedTime
		};
		watchedVideoList.push(watchedVideo);
	}
	return watchedVideoList;
}

export async function getWatchedVideoDetails(id) {
	const currentUser = await getProfile();
	let newUser = "";
	const watchedVideos = currentUser.watched;
	let watchedVideo = "";
	let index = 0;
	let videoDetail = await getVideoDetails(id);
	let lastViewedTime = moment(Date.now()).format("DD/MM/YYYY HH:MM");

	for (let i = 0; i < watchedVideos.length; i++) {
		let video = watchedVideos[i];
		let videoId = video.videoId;
		let relativeTime = moment(video.lastViewed)
			.startOf("day")
			.fromNow();
		if (videoId === parseInt(id)) {
			let watchedVideoDetail = {
				id: parseInt(videoId),
				video: videoDetail,
				percentage: video.percentage,
				times: video.times + 1,
				lastViewed: relativeTime
			};
			watchedVideo = watchedVideoDetail;
			currentUser.watched[i] = {
				videoId: parseInt(id),
				percentage: 0,
				times: video.times + 1,
				lastViewed: Date.now()
			};
			newUser = await update(currentUser);
			break;
		}
		index++;
	}
	if (index >= watchedVideos.length) {
		let relativeTime = "0s Ago";
		let watchedVideoDetail = {
			id: parseInt(id),
			video: videoDetail,
			percentage: 0,
			times: 1,
			lastViewed: relativeTime
		};
		watchedVideo = watchedVideoDetail;
		const currentViewVideo = {
			videoId: parseInt(id),
			percentage: 0,
			times: 1,
			lastViewed: lastViewedTime
		};
		currentUser.watched.push(currentViewVideo);
		newUser = await update(currentUser);
	}
	console.log(newUser);
	return watchedVideo;
}
