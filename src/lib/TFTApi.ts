import { TftApi, Constants } from 'twisted'
import { MatchTFTDTO } from 'twisted/dist/models-dto'

export class TFTApi {
    private readonly api: TftApi

    constructor() {
        this.api = new TftApi({
            rateLimitRetry: true,
            rateLimitRetryAttempts: 50
        })
    }

    getSummonerPUUID = async(name: string): Promise<string> => {
        const summoner = await this.api.Summoner.getByName(name, Constants.Regions.AMERICA_NORTH)
        return summoner.response.puuid
    }

    getMatchList = async(puuid: string): Promise<string[]> => {
        console.log("Getting matches")
        const matches = await this.api.Match.list(puuid, Constants.TftRegions.AMERICAS)
        return matches.response
    }

    getMatchInfo = async(matchId: string): Promise<MatchTFTDTO> => {
        console.log("Getting match info")
        const matchInfo = await this.api.Match.get(matchId, Constants.TftRegions.AMERICAS)
        return matchInfo.response
    }

    getMatchListWithDetails = async(puuid: string): Promise<MatchTFTDTO[]> => {
        console.log("Getting matches and info")
        const matches = await this.api.Match.listWithDetails(puuid, Constants.TftRegions.AMERICAS)
        return matches
    }
}