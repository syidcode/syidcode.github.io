var app = new Vue({
  el: '#app',
  data: {
    scanner: null,
    activeCameraId: null,
    cameras: [],
    scans: []
  },
  mounted: function () {
    var self = this;
    self.scanner = new Instascan.Scanner({
      video: document.getElementById('preview'),
      scanPeriod: 2,
      //mirror: true,
    });
    self.scanner.addListener('scan', function (content, image) {
      var url = content;
      var urlSlice = url.slice(19, url.length);
      //////////////////////////
      var urlTitle = "http://10.116.1.217";
      //////////////////////////
      var newUrl = urlTitle + urlSlice;
      window.open(newUrl, '_blank', config='height=1080,width=960');
      console.log(newUrl);
      self.scans.unshift({
        date: +(Date.now()),
        content: content
      });
    });
    Instascan.Camera.getCameras().then(function (cameras) {
      self.cameras = cameras;
      if (cameras.length > 0) {
        self.activeCameraId = cameras[0].id;
        self.scanner.start(cameras[0]);
      } else {
        console.error('No cameras found.');
      }
    }).catch(function (e) {
      console.error(e);
    });
  },
  methods: {
    formatName: function (name) {
      return name || '(unknown)';
    },
    selectCamera: function (camera) {
      this.activeCameraId = camera.id;
      this.scanner.start(camera);
    }
  }
});
