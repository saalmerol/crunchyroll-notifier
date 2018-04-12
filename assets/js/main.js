Vue.use(VueLoading)
new Vue({
  el: '#app',
  mounted: function () {
    let res = this
    let loader = this.$loading.show()
    let x2js = new X2JS();
    axios.get('https://cors-anywhere.herokuapp.com/http://feeds.feedburner.com/crunchyroll/rss/anime')
      .then(function (response) {
        let crunchyrollLatest = x2js.xml_str2json(response.data).rss.channel
        console.log(crunchyrollLatest)
        let numberPopup = 5;
        chrome.storage.sync.get("numberPopup", function (obj) {
            // numberPopup = parseInt(obj)
            numberPopup = obj.numberPopup
            for (let x=0; x < numberPopup; x++) {
              anime = {}
              anime.name = crunchyrollLatest.item[x].title.split(' - Episode ')[0]
              anime.url = crunchyrollLatest.item[x].guid.__text
              anime.thumbnail = crunchyrollLatest.item[x].enclosure._url.replace('thumb', 'full')
              anime.freetime = crunchyrollLatest.item[x].freePubDate.__text
              anime.time = moment(crunchyrollLatest.item[x].premiumPubDate.__text.split(', ')[1].concat(' +0000'), 'DD MMM YYYY HH:mm:ss ZZ').format('MMMM DD, YYYY | hh:mm a')
              anime.episode = crunchyrollLatest.item[x].title.split(' - Episode ')[1]
              res.animes.push(anime)
            }
            loader.hide()
        });
      })
      .catch(function (error) {
        console.log(error)
      });
  },
  data () {
    return {
      slide: 0,
      sliding: null,
      animes: [],
      loading: true
    }
  },
  methods: {
    onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = false
    }
  }
})
