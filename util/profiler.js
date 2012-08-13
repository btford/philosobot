exports.make = function () {
  return {
    startTime: Date.now(),
    durationMili: function () {
      return Date.now() - this.startTime;
    },
    duration: function () {
      return Math.ceil(this.durationMili() / 1000);
    },
    niceDuration: function () {
      var dur = this.duration();
      return Math.floor(dur / 60) + ' mins, ' + (dur % 60) + ' secs';
    }
  };
};