<template>
  <div class="container pt-2" style="max-width: 650px; min-height: 300px">
    <div class="row">
      <div class="col">
        <h1>Free URL Shortener</h1>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-auto">
        <input
          type="text"
          class="form-control"
          placeholder="Enter link here"
          v-model="url"
          style="width: 400px"
        />
      </div>
      <div class="col-auto">
        <button type="button" class="btn btn-primary" @click="generateUrl">
          Shorten URL
        </button>
      </div>
    </div>
    <showUrl :urlMap="urls" @deleteUrl="deleteUrl" />
  </div>
  <div
    class="text-black"
    style="background-color: #f5f7f8; min-height: 300px; padding: 100px 300px"
  >
    <h2>Squeeze more into every link.</h2>
    <div>
      With URLSqueezer, you can turn long and unwieldy URLs into short, snappy
      links that are easy to share, remember, and use. Our powerful compression
      technology lets you fit more information into every link, making it the
      perfect tool for social media, email marketing, and any other situation
      where space is at a premium. So why settle for long and complicated URLs
      when you can squeeze more into every link with URLSqueezer?
    </div>
  </div>
</template>

<script>
import urlService from '../service/url';
import showUrl from '../components/showUrl.vue';
export default {
  components: {
    showUrl,
  },
  data() {
    return {
      url: '',
      urls: [],
    };
  },
  async created() {
    const { data: urls } = await urlService.getAllUrl();
    this.urls = urls;
  },
  methods: {
    async generateUrl() {
      const data = await urlService.createShortUrl(this.url);
      this.addUrl(this.url, data.shortUrl);
      this.url = '';
    },
    addUrl(url, shortUrl) {
      this.urls = this.urls.concat({
        originUrl: url,
        shortUrl: `${shortUrl}`,
      });
    },
    async deleteUrl(urlObj) {
      this.urls = this.urls.filter((url) => url.shortUrl !== urlObj.shortUrl);
      const response = await urlService.deleteUrl(urlObj.shortUrl);
    },
  },
};
</script>
