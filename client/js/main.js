import BannerImg from "./src/bannerImg.js";
import BigImg from "./src/bigImg.js";
import Switch from "./src/switch.js";

const mode = "dev";

const bannerObj = new BannerImg("bannerImgSection", mode);
const bigObj = new BigImg("bigPicSection", mode);

new Switch(bannerObj, bigObj, mode);