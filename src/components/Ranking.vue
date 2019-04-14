<script>
import { getPlayers } from '../utils/storage'

export default {
  name: 'ranking',
  data () {
    return {
      players: []
    }
  },
  async mounted () {
    // Get the list of player from storage
    const players = await getPlayers()
    // Sort the list of players by rounds
    this.players = [...players.sort((a, b) => {
      return (a.rounds < b.rounds) ? -1 : (a.rounds > b.rounds ? 1 : 0)
    })]
  }
}
</script>

<template>
    <div>
        <h1>Ranking</h1>
        <table class="table_content">
            <thead>
            <tr>
                <th>Nickname</th>
                <th>Rounds</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(player, index) in players" :key="index">
                <td>{{player.nickname}}</td>
                <td>{{player.rounds}}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<style lang="scss">
    .table_content {
        border-collapse: collapse;
        width: 100%;

        th, td {
            padding: 3px 6px;
            border: 1px solid rgba(0, 0, 0, .1);
        }
    }
</style>
