import cheerio from "cheerio";
import axios from "axios";

const getOpenGraph = async (data) => {
  const targetURL = data.contents
    .split(" ")
    .filter((e) => e.startsWith("http"));

  const aaa = await axios.get(targetURL[0]);
  const $ = cheerio.load(aaa.data);

  $("meta").each((_, el) => {
    if ($(el).attr("property")) {
      const KEY = $(el).attr("property").split(":")[1];
      const VALUE = $(el).attr("content");
      console.log(KEY, VALUE);
    }
  });
};

const feData = {
  title: "Hello",
  contents: "Sooo Good Soooo GooooooooooD https://naver.com is so Good",
};

getOpenGraph(feData);
