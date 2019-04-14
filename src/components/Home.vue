<script>
export default {
  name: 'ranking'
}
</script>

<template>
    <div>
        <h2>Welcome!!! Please enjoy this free memory game.</h2>
        <p>
            Github: <a href="https://github.com/diegomengarda/memory-game" target="_blank">diegomengarda/memory-game</a>
        </p>
    </div>
</template>

<style lang="scss">
    h2 {
        padding: 0 10px;
        text-align: center;
    }

    p {
        text-align: center;

        a {
            font-weight: bold;
            text-decoration: none;
            color: #333;

            &:hover {
                text-decoration: underline;
            }
        }
    }
</style>
