import { TFTApi } from './lib/TFTApi'

export async function main() {
    const tft = new TFTApi()

    const listOfNAPlayers = ["Awlsring", "Mrichael", "Cr4zyJ"]

    const resultPromises: Promise<[string, number]>[] = []
    const playerResults: [string, number][]= []
    listOfNAPlayers.forEach((async player => {
        const promise = await processPlayerData2(tft, player)
        playerResults.push(promise)
    }))

    playerResults.forEach((result => {
        console.log(`${result[0]}: ${result[1]} points`)
    }))
}

async function processPlayerData2(tft: TFTApi, player: string): Promise<[string, number]> {
    console.log(`Processing player data for ${player}`)

    const puuid = await tft.getSummonerPUUID(player)
    const matches = await tft.getMatchListWithDetails(puuid)

    let pointTotal = 0

    //make this await
    matches.forEach((result => {
        result.info.participants.forEach((player => {
            if ((player.puuid) == puuid) {
                console.log("Getting points")
                const placement = player.placement
                const points = placementToPoints(placement)
                pointTotal += points
            }
        }))
    }))

    console.log(`${player} Total: ${pointTotal}`)
    return [player, pointTotal]
}

async function getPlayerMatchResult(tft: TFTApi, puuid: string, matchId: string): Promise<number> {
    console.log("Looking at match results")
    const matchInfo = await tft.getMatchInfo(matchId)
    
    matchInfo.info.participants.forEach((player => {
        if (player.puuid == puuid) {
            return player.placement
        }
    }))

    return 0
}

function placementToPoints(placement: number): number {
    switch (placement) {
        case 8: {
            return -10
        }

        case 7: {
            return -6
        }

        case 6: {
            return -3
        }

        case 5: {
            return -1
        }

        case 4: {
            return 1
        }

        case 3: {
            return 3
        }

        case 2: {
            return 6
        }

        case 1: {
            return 10
        }

        default: {
            return 0
        }
    }
}

console.log("running")
main()