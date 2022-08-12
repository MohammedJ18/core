<template>
    <div class="bg-default" h="screen" w="screen" flex="~ col" items="center" justify="center">
        <div w="1016px" h="600px" border="rounded-t-10px" bg="primary dark:primaryOp" flex="~ col" items="center">
            <UiIconsEnab m="t-50px" w="128px" h="128px" />
            
            <AuthLogin />

        </div>
        <div flex="~ gap-10px" justify="center" items="center" w="1016px" h="109px" border="rounded-b-10px" bg="primary opacity-90 dark:primaryOp dark:opacity-90">
            <div w="24px" h="24px" un-text="warning" class="i-material-symbols-tips-and-updates-rounded"></div>
            <span un-text="xl primaryOp dark:primary">تستطيع مشاركة الملفات والتقارير والصور من خلال تطبيق ملفاتي</span>
        </div>

        <div flex="~ gap-50px" h="48px" w="1016px" border="rounded-10px" m="t-65px" justify="center" items="center" bg="primary dark:primaryOp opacity-50 dark:opacity-50" un-text="primaryOp dark:primary">
            <span cursor="pointer">هل تحتاج المساعدة؟</span>
            <span cursor="pointer">نسيت كلمة المرور؟</span>
        </div>
    </div>
</template>

<script setup>
import { guest } from '../middleware/guest'

definePageMeta({
  title: "Auth",
  middleware: guest
});

</script>

<style scoped>
.bg-default {
background-image: url('https://images.unsplash.com/photo-1542401886-65d6c61db217?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'); 
/* background-image: url('imgs/bg.jpg'); */
background-color: #999;

/* background-size: cover; */
background-size: cover;
/* background-position: 100% 180%; */

/* animation: lightMove 5s infinite; */
}
</style>