"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TFTApi = void 0;
const twisted_1 = require("twisted");
class TFTApi {
    constructor() {
        this.getSummonerPUUID = async (name) => {
            const summoner = await this.api.Summoner.getByName(name, twisted_1.Constants.Regions.AMERICA_NORTH);
            return summoner.response.puuid;
        };
        this.getMatchList = async (puuid) => {
            console.log("Getting matches");
            const matches = await this.api.Match.list(puuid, twisted_1.Constants.TftRegions.AMERICAS);
            return matches.response;
        };
        this.getMatchInfo = async (matchId) => {
            console.log("Getting match info");
            const matchInfo = await this.api.Match.get(matchId, twisted_1.Constants.TftRegions.AMERICAS);
            return matchInfo.response;
        };
        this.getMatchListWithDetails = async (puuid) => {
            console.log("Getting matches and info");
            const matches = await this.api.Match.listWithDetails(puuid, twisted_1.Constants.TftRegions.AMERICAS);
            return matches;
        };
        this.api = new twisted_1.TftApi({
            rateLimitRetry: true,
            rateLimitRetryAttempts: 50
        });
    }
}
exports.TFTApi = TFTApi;
//# sourceMappingURL=TFTApi.js.map