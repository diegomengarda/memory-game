import localForage from 'localforage'

/**
 * Create LocalForage instance
 * @type {LocalForage}
 */
const storage = localForage.createInstance({ name: 'memory-game' })

/**
 * Get list of all players
 * @returns {Promise<Promise<any | never> | Array>}
 */
export async function getPlayers () {
  return storage.getItem('players').then(data => data) || []
}

/**
 * Set player results
 * @param nickname
 * @param rounds
 * @returns {Promise<void>}
 */
export async function setPlayerResults (nickname, rounds) {
  let players = await getPlayers()
  if (!players) {
    players = []
  }
  players.push({ nickname, rounds })
  storage.setItem('players', players)
}
