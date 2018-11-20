/* global Vue , $ ,jQuery ,data */
(function ($) {
  var app = new Vue({
    el: '#words',
    data: {
      data: data,
      timeId: '',
      audio: {
        playing: false,
        currentTime: 0
      }
    },
    methods: {
      startScroll: function () {
        if ($('.talk_special')[0]) {
          $('.talk_special')[0].scrollIntoView(true)
        }
      },
      startInterval: function () {
        if (this.audio.currentTime > data.durtime) {
          clearInterval(this.timeId)
        }

        this.timeId = setInterval(this.startScroll, 1000)
      },
      onPause: function () {
        this.audio.playing = false
        clearInterval(this.timeId)
      },
      onPlay: function () {
        this.audio.playing = true
        this.startInterval()
      },
      addEventListeners: function () {
        this.$refs.audio.addEventListener('timeupdate', this._currentTime)
      },
      _currentTime: function () {
        this.audio.currentTime = parseInt(this.$refs.audio.currentTime)
      }
    },
    mounted () {
      this.addEventListeners()
    },
    filters: {
      formatSecond: function (second) {
        var secondType = typeof second

        if (secondType === 'number' || secondType === 'string') {
          second = parseInt(second)

          var hours = Math.floor(second / 3600)
          second = second - hours * 3600
          var mimute = Math.floor(second / 60)
          second = second - mimute * 60

          return hours + ':' + ('0' + mimute).slice(-2) + ':' + ('0' + second).slice(-2)
        } else {
          return '0:00:00'
        }
      },
      transPlayPause: function (value) {
        return value ? '暂停' : '播放'
      }
    }
  })
})(jQuery)
