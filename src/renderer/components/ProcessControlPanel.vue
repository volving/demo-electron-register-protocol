<template>
    <div id="wrapper">
        <img id="logo" src="~@/assets/logo.png" alt="electron-vue" />
        <main>
            <div class="left-side">
                <p>{{startResult}}</p>
                <p>{{randomWord}}</p>
            </div>
            <div class="right-side">
                <a href="movtile:///Users/volving/Downloads/raw/converted/b033_h264_1920x1080.mp4">b033_h264_1920x1080.mp4</a>
                <!-- <button class="btn startProc" @click="startProc()">Start Process</button>

                <button class="btn randomWord" @click="getRandomWord()">Random Word</button>
                <button class="btn term-proc" @click="terminateProcess()">Terminate Process</button> -->
            </div>
        </main>
    </div>
</template>

<script>
const { remote, ipcRenderer } = require('electron');

export default {
    name: 'process-control-panel',
    data() {
        return {
            startResult: 'initialized!!!',
            randomWord: 'random-word!!!!'
        };
    },
    methods: {
        open(link) {
            // open('https://vuejs.org/v2/guide/')
            this.$electron.shell.openExternal(link);
        },
        startProc() {
            ipcRenderer.send('StartRandomWord:req', '');
        },
        getRandomWord() {
            ipcRenderer.send('RandomWord:req', '');
        },
        terminateProcess() {
            ipcRenderer.send('Terminate:req', '');
        }
    },
    created() {
        let z = this;
        ipcRenderer.on('StartRandomWord:res', function(event, args) {
            z.startResult = args;
        });
        ipcRenderer.on('RandomWord:res', function(event, args) {
            z.randomWord = args || '';
        });
        ipcRenderer.on('Terminate:res', function(event, args) {
            console.log(args);
        });
    }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: 'Source Sans Pro', sans-serif;
}

#wrapper {
    background: radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, 0.9) 100%
    );
    height: 100vh;
    padding: 60px 80px;
    width: 100vw;
}

#logo {
    height: auto;
    margin-bottom: 20px;
    width: 420px;
}

main {
    display: flex;
    justify-content: space-between;
}

main > div {
    flex-basis: 50%;
}

.left-side {
    display: flex;
    flex-direction: column;
}

.right-side {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
}
.welcome {
    color: #555;
    font-size: 23px;
    margin-bottom: 10px;
}

.title {
    color: #2c3e50;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 6px;
}

.title.alt {
    font-size: 18px;
    margin-bottom: 10px;
}

button {
    font-size: 0.8em;
    cursor: pointer;
    outline: none;
    padding: 0.75em 2em;
    border-radius: 2em;
    display: inline-block;
    color: #fff;
    background-color: #4fc08d;
    transition: all 0.15s ease;
    box-sizing: border-box;
    border: 1px solid #4fc08d;
}

utton.alt {
    color: #42b983;
    background-color: transparent;
}
</style>
