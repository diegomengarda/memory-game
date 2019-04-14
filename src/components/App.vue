<template>
    <div id="app">
        <h1>Memory Game</h1>
        <nav id="menu">
            <ul>
                <li>
                    <router-link :to="{name: 'home'}">Home</router-link>
                </li>
                <li>
                    <router-link :to="{name: 'play'}">New Game</router-link>
                </li>
                <li>
                    <router-link :to="{name: 'ranking'}">Ranking</router-link>
                </li>
            </ul>
        </nav>
        <router-view/>
    </div>
</template>

<style lang="scss">
    @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,700');

    * {
        box-sizing: border-box;
    }

    html, body {
        background-color: #bfdaaf;
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 100vw;
        min-height: 100vh;
        margin: 0;
        padding: 0;
        font-family: 'Source Sans Pro', sans-serif;
        overflow-x: hidden;
    }

    #app {
        > h1 {
            font-size: 70px;
            margin: 0 0 25px;
            text-align: center;
        }

        > #menu {
            > ul {
                list-style: none;
                display: flex;
                justify-content: center;
                margin: 0;
                padding: 0;

                li {
                    margin: 0 5px;

                    a {
                        display: block;
                        text-decoration: none;
                        padding: 6px 16px;
                        border: 1px solid rgba(0, 0, 0, .2);
                        border-radius: 6px;
                        color: #333;
                        transition: all .4s ease-in-out;

                        &:hover {
                            background-color: rgba(0, 0, 0, .1);
                        }
                    }
                }
            }
        }

        .flex-box {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
</style>
