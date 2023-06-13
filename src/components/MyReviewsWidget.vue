<template>
    <div>
      <!-- Ваше содержимое компонента Vue -->
    </div>
  </template>
  
  <script>
  export default {
    mounted() {
      this.myReviewsInit();
    },
    methods: {
      myReviewsInit() {
        const script = document.createElement("script");
        script.src = "https://myreviews.dev/widget/dist/index.js";
        script.defer = true;
        document.head.appendChild(script);
  
        script.onload = () => {
          new window.myReviews.VerticalWidget({
            uuid: "caea6c4c-7574-48bf-9a10-028995c53ca8",
            name: "verticalWidget-1",
            additionalFrame: "button",
            variant: "default",
            color: "black",
            lang: "ru",
          }).init();
        };
      },
    },
  };
  </script>  