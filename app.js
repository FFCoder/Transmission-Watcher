const Transmission = require('transmission');

const TORRENT_STATUS = {
    STOPPED: 0,
    CHECK_WAIT: 1,
    CHECK: 2,
    DOWNLOAD_WAIT: 3,
    DOWNLOAD: 4,
    SEED_WAIT: 5,
    SEED: 6,
    ISOLATED: 7 
}

transmission = new Transmission(
    {
        host: process.env.TRANSMISSION_HOST,
        port: process.env.TRANSMISSION_PORT,
        username: process.env.TRANSMISSION_USERNAME,
        password: process.env.TRANSMISSION_PASSWORD        
    }
);

const convertToHours = (seconds) => {
    return (seconds * 60 ) * 60
}

transmission.active((err, results) => {
    if (err) {
        console.error(err);
    }
    else {
        results.torrents.forEach(torrent => {
            var torrentAdded = new Date(torrent.addedDate * 1000);
            var now = Date.now();

            
            if (torrent.status == TORRENT_STATUS.SEED){
                var ratio = torrent.uploadRatio;
                var id = torrent.id;
                if (ratio >= 1) {
                    let torrentObj = {
                        ID: id,
                        name: torrent.name,
                        ratio: ratio
                    };
                    console.log(`Deleting ${torrentObj}`);
                    transmission.remove(id, true, (err, results) => {
                        if (err) {
                            console.error("Failed to delete Torrent!");
                            console.error(err);
                        }
                        else {
                            console.log("Successfully deleted " + torrent.name);
                        }
                    })
                }
                else {
                    console.log(`Skipping ${torrent.name}. Ratio LESS THAN 1`)
                }
            }
        });
    }
})