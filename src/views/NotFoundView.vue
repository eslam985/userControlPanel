<template>
  <div
    class="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center text-center p-6 bg-background animate-fade-in"
  >
    <div
      class="w-24 h-24 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mb-6 shadow-sm border border-red-100/50"
    >
      <font-awesome-icon icon="fa-solid fa-triangle-exclamation" class="text-4xl animate-bounce" />
    </div>

    <h1
      class="text-7xl md:text-8xl font-black text-title tracking-tighter mb-2 selection:bg-accent selection:text-white"
    >
      404
    </h1>

    <h2 class="text-xl md:text-2xl font-bold text-foreground mb-3">
      Page Not Found / الصفحة غير موجودة
    </h2>

    <p class="text-sub text-sm md:text-base max-w-md mb-8 leading-relaxed">
      عذراً، يبدو أن الرابط الذي حاولت الانتقال إليه غير صحيح، أو تم نقل الصفحة إلى مسار آخر.
    </p>

    <router-link :to="{ name: 'UsersList' }" class="btn-primary flex items-center gap-2.5">
      <font-awesome-icon icon="fa-solid fa-arrow-left" class="text-sm rtl:rotate-180" />
      <span>Back to Dashboard / العودة للرئيسية</span>
    </router-link>
  </div>
</template>

<script setup></script>
