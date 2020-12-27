import axios from 'axios';
import cheerio from 'cheerio';


function delay(ms) {
    return new Promise(function(resolve, reject) {
        setTimeout(() => resolve(), ms);
    });
}

function getHTML(url) {
    return new Promise(resolve => {
        delay(300).then(function() {
            axios.get(url).then(function(data) {
                resolve(data);
            });
        });
    })
}


function main() {
    let naverURLs = [
        "/webtoon/creation.nhn",
    ];

    getHTML(naverURLs[0]).then(html => {
        let result = {};
        const $ = cheerio.load(html.data);
        // let thumbnail_elems = $("body").find("#content.webtoon > .all_list.all_image ul > li > div.thumb");
        let title_elems = $("body").find("#content.webtoon > .all_list.all_image ul > li > a");

        title_elems.each((_, elem) => {
            result[$(elem).attr("title")] = $(elem).attr("href");
        })

        console.log(result);
        return result;
    });
}

main();
