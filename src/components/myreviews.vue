<template>
    <body>
    <script src="https://myreviews.dev/widget/dist/index.js" defer></script>
    <script defer>
        var myReviewsInit = function () {
            new window.myReviews.VerticalWidget({
            uuid: "caea6c4c-7574-48bf-9a10-028995c53ca8",
            name: "verticalWidget-1",
            additionalFrame: "button",
            variant: "default",
            color: "black",
            lang:"en"
        }).init();
        };
        if (document.readyState === "loading") {
            document.addEventListener('DOMContentLoaded', function () {
                myReviewsInit()
            })
        } else {
            myReviewsInit()
        }
    </script>
    </body>
</template>