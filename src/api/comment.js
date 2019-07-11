import { ajax } from "../utils";
import { Base_URL } from "../utils/variables";

const url = `${Base_URL}/comments`;
export const submit = (data) => ajax.postData(url, data);
