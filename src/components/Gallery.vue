<template>
    <div>
      <picture-swipe :items="images"></picture-swipe>
    </div>
  </template>
  

<script>
import PictureSwipe from 'vue3-picture-swipe';
data() {
  return {
    images: [
      { src: 'src/assets/images/10.png', w: 800, h: 600 },
      { src: 'path/to/image2.jpg', w: 1200, h: 900 },
      { src: 'path/to/image3.jpg', w: 1000, h: 750 }
    ]
  };
}
</script>