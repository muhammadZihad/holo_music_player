<template>
    <div id="app">
        <div class="content sh">
            <div class="header">
                <h1>Holo Player</h1>
            </div>
            <div class="player" v-for="(item,i) in current" :key="i">
                <div class="info">
                    <div class="title">{{ item.title }}</div>
                    <div class="artist">{{ item.artist }}</div>
                </div>
                <div class="cover-out sh">
                    <div class="cover-in" :style="{'background-image': 'url(' + item.image + ')'}"></div>
                </div>
                <div class="controls">
                    <button class="prev" @click="back">
                        <i class="fas fa-backward"></i>
                    </button>
                    <button @click="playing=!playing" class="play" v-if="playing===false">
                        <i class="fas fa-play-circle"></i>
                    </button>
                    <button v-else class="pause" @click="playing=!playing">
                        <i class="fas fa-pause-circle"></i>
                    </button>
                    <button class="next" @click="next">
                        <i class="fas fa-forward"></i>
                    </button>
                </div>
            </div>
            <div class="playlist">
                <div class="accordion" id="accordionExample">
                    <div class="card">
                        <div class="card-header" id="headingTwo">
                            <h2 class="mb-0">
                                <button
                                    class="btn btn-link collapsed"
                                    type="button"
                                    data-toggle="collapse"
                                    data-target="#collapseTwo"
                                    aria-expanded="false"
                                    aria-controls="collapseTwo"
                                >All songs</button>
                            </h2>
                        </div>
                        <div id="collapseTwo" class="collapse" data-parent="#accordionExample">
                            <div class="card-body">
                                <div class="list-group list-group-flush">
                                    <a
                                        v-for="item in testCollection"
                                        :key="item.title"
                                        href="#"
                                        class="list-group-item list-group-item-action"
                                    >
                                        <div class="title2">{{ item.title }}</div>
                                        <div class="art2">{{ item.artist }}</div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "App",
    data() {
        return {
            playing: false,
            title: "",
            index: 0,
            current: {
                title: "",
                artist: "",
                image: "",
                file: ""
            },
            testCollection: []
        };
    },
    mounted() {
        const db = this.$firebase.firestore();
        // const storage = this.$firebase.storage();

        db.collection("music")
            .get()
            .then(snap => {
                const testCollection = [];
                snap.forEach(doc => {
                    testCollection.push({ [doc.id]: doc.data() });
                });
                this.testCollection = testCollection;
                this.current = testCollection[0];
                this.title = Object.keys(this.current)[0];
                // this.current[0].file = storage.refFromURL(
                //     this.current[name].file
                // );
                // let v = storage.refFromURL(this.current[name].file);
                // console.log(v);
            });
    },
    methods: {
        next() {
            this.index++;

            this.current = this.testCollection[this.index];
        },
        back() {
            this.index--;

            this.current = this.testCollection[this.index];
        }
    }
};
</script>

<style>
.sh {
    -webkit-box-shadow: 0px 0px 56px -17px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 0px 0px 56px -17px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 56px -17px rgba(0, 0, 0, 0.75);
}
.content {
    background: #f7f7f7;
    width: 430px;
    margin: 0 auto;
    margin-top: 50px;
    /* padding: 10px; */

    border-radius: 20px;
    overflow: hidden;
}

.header {
    /* position: absolute; */
    background: #120136;
    padding: 10px;
    text-align: center;
    color: #40bad5;
}

.title {
    font-size: 30px;
    font-weight: bold;
    text-align: center;
    color: #035aa6;
}

.info {
    padding: 10px;
}

.artist {
    font-size: 20px;
    text-align: center;
    color: #120136;
}

.cover-out {
    height: 220px;
    width: 220px;
    background: #fcbf1e;
    border-radius: 50%;
    margin: 10px auto 10px;
    /* position: relative; */
    display: flex;
    align-items: center;
    justify-content: center;
}

.cover-in {
    height: 200px;
    width: 200px;
    border-radius: 50%;
    background-size: cover;
    background-position: top;
}
.controls {
    margin-bottom: 20px;
    text-align: center;
}
button {
    background: none;
    border: none;
    font-size: 30px;
    appearance: none;
    padding: 0;
    outline: none;
    cursor: pointer;
}

.next,
.prev {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    color: #035aa6;
}
.play,
.pause {
    margin: 0 20px;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    font-size: 80px;
    color: #d7385e;
}
button:focus {
    outline: none;
}
.card-body {
    padding: 0;
}
.card-header {
    text-align: center;
}
.card-header h2 button {
    font-size: 20px;
    font-weight: 700;
}
.card-header h2 button:hover {
    text-decoration: none;
}
.card-header h2 button:focus {
    text-decoration: none;
}
.list-group-item {
    transition: all 0.3s;
}

.title2 {
    font-size: 20px;
}
.playing {
    background: #204051;
    color: #d7385e;
}
</style>
