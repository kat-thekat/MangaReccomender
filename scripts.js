// Enter a search query, then returns the list of IDs
function getIDsFromSearch(input) {
    return fetch("https://api.jikan.moe/v4/manga?q=" + input + "&page=1&limit=5&type=manga&sfw=true&order_by=score&sort=desc")
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('bro it messed up');
            }
        })
        .then(data => {
            const ids = data.data.map(item => item.mal_id);
            return ids;
        })
        .catch(error => {
            console.error(error);
        });
}

/* getIDsFromSearch("kanojo").then(ids => { 
    console.log(ids); 
}); */

function getInfoFromID(input, retries = 3) {
    return fetch("https://api.jikan.moe/v4/manga/" + input)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to fetch data');
            }
        })
        .then(data => {
            const name = data.data.titles.find(title => title.type === "English")?.title
                || data.data.titles.find(title => title.type === "Default")?.title;
            const desc = data.data.synopsis || "Description not available.";
            const image_url = data.data.images.jpg.image_url;
            return [name, desc, image_url];
        })
        .catch(error => {
            if (retries > 0) {
                console.warn(`Retrying... Attempts left: ${retries}`);
                return getInfoFromID(input, retries - 1); // Retry with one less attempt
            } else {
                console.error('All retries failed:', error);
                throw new Error('Unable to fetch data after multiple attempts');
            }
        });
}

/*
getInfoFromID("17").then(info => { 
    console.log(info); 
});
*/

function getRecFromID(input) {
    return fetch("https://api.jikan.moe/v4/manga/" + input + "/recommendations")
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('it ant work');
            }
        })
        .then(data => {
            var ids = data.data.map(item => item.entry.mal_id);
            ids = ids.slice(0, 10);
            return ids;
        })
        .catch(error => {
            console.error(error);
        });
}

/*getRecFromID(17).then(ids => { 
    ids.forEach((id, index) => {
        setTimeout(() => {
            getInfoFromID(id).then(info => {
                console.log(info + "\n");
            });
        }, 1000 * index);
    });
});*/

function getRandomID() {
    random = [2, 1706, 656, 13, 1, 642, 51, 130826, 25, 70345, 143441, 162032, 16765, 4632, 44489, 657, 3, 1303, 14893, 121405, 23751, 104, 34053, 90125, 126479, 336, 56805, 1224, 35243, 140765, 44227, 70261, 126287, 21525, 9115, 104039, 651, 89357, 7375, 74697, 28, 144267, 86119, 123992, 147272, 100448, 85781, 14483, 26, 86769, 40171, 91941, 7, 102875, 132678, 44347, 72467, 45143, 116778, 418, 125036, 147769, 145, 55215, 21, 1133, 1859, 121496, 123006, 664, 145863, 9726, 100035, 117077, 88660, 4, 98930, 103237, 23900, 24875, 107562, 78523, 85968, 137200, 904, 44, 26027, 6978, 81, 745, 81669, 35513, 60783, 107931, 128365, 102256, 118289, 60553, 70399, 756, 116312, 37707, 114043, 132214, 9982, 145539, 399, 61579, 147448, 3006, 13245, 698, 92559, 3031, 11514, 129621, 87844, 2062, 1325, 610, 23390, 105084, 11327, 66517, 138533, 8157, 11054, 22, 108177, 5744, 101396, 134744, 137303, 3083, 102, 33327, 147171, 39859, 81211, 21498, 44307, 93097, 1342, 214, 164926, 18200, 11734, 3649, 79085, 79993, 119161, 30, 146878, 28393, 104538, 92299, 56529, 115506, 113010, 141120, 121504, 38071, 46282, 111213, 85719, 87610, 88639, 114745, 119072, 121269, 25515, 1183, 123649, 93753, 14720];
    return random[Math.floor(Math.random() * random.length)];
};