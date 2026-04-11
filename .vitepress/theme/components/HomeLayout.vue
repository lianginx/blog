<template>
  <div class="grid gap-8">
    <ListBlog show-title :limit="12" />
    <ListProject show-title :limit="2" />
    <PhotoSection />
  </div>
</template>
