"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const TFTApi_1 = require("./lib/TFTApi");
async function main() {
    const tft = new TFTApi_1.TFTApi();
    const listOfNAPlayers = ["Awlsring", "Mrichael", "Cr4zyJ"];
    const resultPromises = [];
    const playerResults = [];
    listOfNAPlayers.forEach((async (player) => {
        // const promise = processPlayerData2(tft, player)
        // resultPromises.push(promise)
        const promise = await processPlayerData2(tft, player);
        playerResults.push(promise);
    }));
    // const results = await Promise.all(resultPromises)
    // console.log(`Result promises: ${results.length}`)
    // results.forEach((result => {
    //     console.log(`${result[0]}: ${result[1]} points`)
    // }))
    playerResults.forEach((result => {
        console.log(`${result[0]}: ${result[1]} points`);
    }));
}
exports.main = main;
// async function processPlayerData(tft: TFTApi, player: string): Promise<[string, number]> {
//     console.log(`Processing player data for ${player}`)
//     const puuid = await tft.getSummonerPUUID(player)
//     const matches = await tft.getMatchList(puuid)
//     const resultPromises: Promise<number>[] = []
//     matches.forEach((match => {
//         const promise = getPlayerMatchResult(tft, puuid, match)
//         resultPromises.push(promise)
//     }))
//     const results = await Promise.all(resultPromises)
//     let pointTotal = 0
//     results.forEach((result => {
//         const points = placementToPoints(result)
//         pointTotal += points
//     }))
//     return [player, pointTotal]
// }
async function processPlayerData2(tft, player) {
    console.log(`Processing player data for ${player}`);
    const puuid = await tft.getSummonerPUUID(player);
    const matches = await tft.getMatchListWithDetails(puuid);
    let pointTotal = 0;
    //make this await
    matches.forEach((result => {
        result.info.participants.forEach((player => {
            if ((player.puuid) == puuid) {
                console.log("Getting points");
                const placement = player.placement;
                const points = placementToPoints(placement);
                pointTotal += points;
            }
        }));
    }));
    console.log(`${player} Total: ${pointTotal}`);
    return [player, pointTotal];
}
async function getPlayerMatchResult(tft, puuid, matchId) {
    console.log("Looking at match results");
    const matchInfo = await tft.getMatchInfo(matchId);
    matchInfo.info.participants.forEach((player => {
        if (player.puuid == puuid) {
            return player.placement;
        }
    }));
    return 0;
}
function placementToPoints(placement) {
    switch (placement) {
        case 8: {
            return -10;
        }
        case 7: {
            return -6;
        }
        case 6: {
            return -3;
        }
        case 5: {
            return -1;
        }
        case 4: {
            return 1;
        }
        case 3: {
            return 3;
        }
        case 2: {
            return 6;
        }
        case 1: {
            return 10;
        }
        default: {
            return 0;
        }
    }
}
console.log("running");
main();
//# sourceMappingURL=index.js.map