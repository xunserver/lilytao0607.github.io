<template>
  <div class="bg-paper rounded-2xl shadow-xl p-8 md:p-12 border border-border/30">
    <div class="mb-8">
      <h3 class="text-3xl font-serif font-bold text-ink mb-4">
        {{ t.title }}
      </h3>
      <div class="w-16 h-1 bg-accent/50"></div>
      <p class="text-secondary mt-4">
        {{ t.subtitle }}
      </p>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- 姓名 -->
      <div>
        <label for="name" class="block text-sm font-medium text-ink mb-2">
          {{ t.nameLabel }} <span class="text-accent">*</span>
        </label>
        <input
          id="name"
          v-model="formData.name"
          type="text"
          required
          :placeholder="t.namePlaceholder"
          class="w-full px-4 py-3 rounded-lg border border-border/50 bg-paper text-ink placeholder:text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
          :disabled="isSubmitting"
        />
      </div>

      <!-- 邮箱 -->
      <div>
        <label for="email" class="block text-sm font-medium text-ink mb-2">
          {{ t.emailLabel }} <span class="text-accent">*</span>
        </label>
        <input
          id="email"
          v-model="formData.email"
          type="email"
          required
          :placeholder="t.emailPlaceholder"
          class="w-full px-4 py-3 rounded-lg border border-border/50 bg-paper text-ink placeholder:text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
          :disabled="isSubmitting"
        />
      </div>

      <!-- 电话（可选） -->
      <div>
        <label for="phone" class="block text-sm font-medium text-ink mb-2">
          {{ t.phoneLabel }} <span class="text-secondary">({{ props.locale === 'zh' ? '可选' : props.locale === 'nl' ? 'optioneel' : props.locale === 'pl' ? 'opcjonalnie' : 'optional' }})</span>
        </label>
        <input
          id="phone"
          v-model="formData.phone"
          type="tel"
          :placeholder="t.phonePlaceholder"
          class="w-full px-4 py-3 rounded-lg border border-border/50 bg-paper text-ink placeholder:text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
          :disabled="isSubmitting"
        />
      </div>

      <!-- 课程选择 -->
      <div>
        <label for="course" class="block text-sm font-medium text-ink mb-2">
          {{ t.courseLabel }} <span class="text-accent">*</span>
        </label>
        <select
          id="course"
          v-model="formData.course"
          required
          class="w-full px-4 py-3 rounded-lg border border-border/50 bg-paper text-ink focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
          :disabled="isSubmitting"
        >
          <option value="">{{ t.coursePlaceholder }}</option>
          <option value="beginner">{{ t.courses.beginner }}</option>
          <option value="intermediate">{{ t.courses.intermediate }}</option>
          <option value="advanced">{{ t.courses.advanced }}</option>
          <option value="private">{{ t.courses.private }}</option>
        </select>
      </div>

      <!-- 备注 -->
      <div>
        <label for="message" class="block text-sm font-medium text-ink mb-2">
          {{ t.messageLabel }} <span class="text-secondary">({{ props.locale === 'zh' ? '可选' : props.locale === 'nl' ? 'optioneel' : props.locale === 'pl' ? 'opcjonalnie' : 'optional' }})</span>
        </label>
        <textarea
          id="message"
          v-model="formData.message"
          rows="4"
          :placeholder="t.messagePlaceholder"
          class="w-full px-4 py-3 rounded-lg border border-border/50 bg-paper text-ink placeholder:text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all resize-none"
          :disabled="isSubmitting"
        ></textarea>
      </div>

      <!-- 提示信息 -->
      <div v-if="submitStatus" class="p-4 rounded-lg" :class="{
        'bg-accent/10 border border-accent/30': submitStatus.type === 'success',
        'bg-red-50 border border-red-200': submitStatus.type === 'error'
      }">
        <p class="text-sm" :class="{
          'text-accent': submitStatus.type === 'success',
          'text-red-600': submitStatus.type === 'error'
        }">
          {{ submitStatus.message }}
        </p>
      </div>

      <!-- 提交按钮 -->
      <button
        type="submit"
        :disabled="isSubmitting"
        class="w-full px-8 py-4 bg-accent hover:bg-primary text-paper font-medium text-lg rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-2"
      >
        <svg v-if="isSubmitting" class="animate-spin h-5 w-5 text-paper" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>{{ isSubmitting ? t.submittingButton : t.submitButton }}</span>
      </button>

      <p class="text-xs text-secondary text-center">
        {{ t.privacyText }}
      </p>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue';
import emailjs from '@emailjs/browser';

// 定义 props
const props = defineProps({
  locale: {
    type: String,
    default: 'zh',
    validator: (value) => ['nl', 'en', 'de', 'pl', 'zh'].includes(value)
  }
});

// 翻译对象
const translations = {
  nl: {
    title: 'Cursusinschrijving',
    subtitle: 'Vul onderstaande informatie in, wij nemen zo snel mogelijk contact met u op',
    nameLabel: 'Uw naam',
    emailLabel: 'E-mailadres',
    phoneLabel: 'Telefoonnummer (optioneel)',
    courseLabel: 'Gewenste cursus',
    messageLabel: 'Bericht (optioneel)',
    namePlaceholder: 'Voer uw naam in',
    emailPlaceholder: 'Voer uw e-mailadres in',
    phonePlaceholder: 'Voer uw telefoonnummer in',
    coursePlaceholder: 'Selecteer een cursus',
    messagePlaceholder: 'Vertel ons uw leerdoelen of andere behoeften...',
    submitButton: 'Indienen',
    submittingButton: 'Indienen...',
    privacyText: 'Door in te dienen gaat u akkoord met ons privacybeleid. Wij beschermen uw persoonlijke gegevens.',
    successMessage: '✓ Inschrijving succesvol! We hebben uw informatie ontvangen en nemen binnen 24 uur contact met u op.',
    errorMessage: '✗ Indienen mislukt, probeer het later opnieuw of neem rechtstreeks contact met ons op. Foutinformatie:',
    noPhone: 'Niet voorzien',
    noMessage: 'Geen',
    fromName: 'Tai Chi Cultuur website',
    courses: {
      beginner: 'Tai Chi beginnerscursus',
      intermediate: 'Tai Chi voortgezette cursus',
      advanced: 'Tai Chi gevorderde cursus',
      private: 'Eén-op-één privéles'
    }
  },
  en: {
    title: 'Course Registration',
    subtitle: 'Fill in the information below, and we will contact you as soon as possible',
    nameLabel: 'Your Name',
    emailLabel: 'Email Address',
    phoneLabel: 'Phone Number (optional)',
    courseLabel: 'Desired Course',
    messageLabel: 'Message (optional)',
    namePlaceholder: 'Enter your name',
    emailPlaceholder: 'Enter your email address',
    phonePlaceholder: 'Enter your phone number',
    coursePlaceholder: 'Select a course',
    messagePlaceholder: 'Tell us your learning goals or other requirements...',
    submitButton: 'Submit',
    submittingButton: 'Submitting...',
    privacyText: 'By submitting, you agree to our privacy policy. We will protect your personal information.',
    successMessage: '✓ Registration successful! We have received your information and will contact you within 24 hours.',
    errorMessage: '✗ Submission failed, please try again later or contact us directly. Error:',
    noPhone: 'Not provided',
    noMessage: 'None',
    fromName: 'Tai Chi Culture website',
    courses: {
      beginner: 'Tai Chi Beginner Course',
      intermediate: 'Tai Chi Intermediate Course',
      advanced: 'Tai Chi Advanced Course',
      private: 'One-on-One Private Lesson'
    }
  },
  de: {
    title: 'Kursanmeldung',
    subtitle: 'Füllen Sie die Informationen unten aus, wir kontaktieren Sie so schnell wie möglich',
    nameLabel: 'Ihr Name',
    emailLabel: 'E-Mail-Adresse',
    phoneLabel: 'Telefonnummer (optional)',
    courseLabel: 'Gewünschter Kurs',
    messageLabel: 'Nachricht (optional)',
    namePlaceholder: 'Geben Sie Ihren Namen ein',
    emailPlaceholder: 'Geben Sie Ihre E-Mail-Adresse ein',
    phonePlaceholder: 'Geben Sie Ihre Telefonnummer ein',
    coursePlaceholder: 'Wählen Sie einen Kurs aus',
    messagePlaceholder: 'Teilen Sie uns Ihre Lernziele oder weitere Anforderungen mit...',
    submitButton: 'Absenden',
    submittingButton: 'Wird gesendet...',
    privacyText: 'Mit dem Absenden stimmen Sie unserer Datenschutzrichtlinie zu. Wir schützen Ihre persönlichen Daten.',
    successMessage: '✓ Anmeldung erfolgreich! Wir haben Ihre Informationen erhalten und kontaktieren Sie innerhalb von 24 Stunden.',
    errorMessage: '✗ Senden fehlgeschlagen. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns direkt. Fehler:',
    noPhone: 'Nicht angegeben',
    noMessage: 'Keine',
    fromName: 'Tai-Chi-Kultur Webseite',
    courses: {
      beginner: 'Tai-Chi-Anfängerkurs',
      intermediate: 'Tai-Chi-Mittelkurs',
      advanced: 'Tai-Chi-Fortgeschrittenenkurs',
      private: 'Einzelunterricht'
    }
  },
  pl: {
    title: 'Rejestracja na kurs',
    subtitle: 'Wypełnij poniższe informacje, a skontaktujemy się z Tobą tak szybko, jak to możliwe',
    nameLabel: 'Twoje imię',
    emailLabel: 'Adres e-mail',
    phoneLabel: 'Numer telefonu (opcjonalnie)',
    courseLabel: 'Wybrany kurs',
    messageLabel: 'Wiadomość (opcjonalnie)',
    namePlaceholder: 'Wpisz swoje imię',
    emailPlaceholder: 'Wpisz swój adres e-mail',
    phonePlaceholder: 'Wpisz numer telefonu',
    coursePlaceholder: 'Wybierz kurs',
    messagePlaceholder: 'Powiedz nam o swoich celach nauki lub innych potrzebach...',
    submitButton: 'Wyślij',
    submittingButton: 'Wysyłanie...',
    privacyText: 'Wysyłając formularz, akceptujesz naszą politykę prywatności. Chronimy Twoje dane osobowe.',
    successMessage: '✓ Rejestracja zakończona pomyślnie! Otrzymaliśmy Twoje dane i skontaktujemy się z Tobą w ciągu 24 godzin.',
    errorMessage: '✗ Nie udało się wysłać formularza. Spróbuj ponownie później lub skontaktuj się z nami bezpośrednio. Błąd:',
    noPhone: 'Nie podano',
    noMessage: 'Brak',
    fromName: 'Strona Tai Chi Culture',
    courses: {
      beginner: 'Kurs podstawowy Tai Chi',
      intermediate: 'Kurs średnio zaawansowany Tai Chi',
      advanced: 'Kurs zaawansowany Tai Chi',
      private: 'Prywatna lekcja indywidualna'
    }
  },
  zh: {
    title: '课程报名',
    subtitle: '填写下方信息，我们将尽快与您联系',
    nameLabel: '您的称呼',
    emailLabel: '电子邮箱',
    phoneLabel: '联系电话',
    courseLabel: '意向课程',
    messageLabel: '留言',
    namePlaceholder: '请输入您的称呼',
    emailPlaceholder: '请输入您的邮箱地址',
    phonePlaceholder: '请输入您的联系电话',
    coursePlaceholder: '请选择课程',
    messagePlaceholder: '请告诉我们您的学习目标或其他需求...',
    submitButton: '提交报名',
    submittingButton: '提交中...',
    privacyText: '提交即表示您同意我们的隐私政策。我们将保护您的个人信息安全。',
    successMessage: '✓ 报名成功！我们已收到您的信息，将在24小时内与您联系。',
    errorMessage: '✗ 提交失败，请稍后重试或直接联系我们。错误信息：',
    noPhone: '未提供',
    noMessage: '无',
    fromName: '太极文化官网',
    courses: {
      beginner: '太极拳初级课程',
      intermediate: '太极拳中级课程',
      advanced: '太极拳高级课程',
      private: '一对一私教课程'
    }
  }
};

// 计算当前语言的翻译
const t = computed(() => translations[props.locale] || translations.en);

// 表单数据
const formData = reactive({
  name: '',
  email: '',
  phone: '',
  course: '',
  message: ''
});

// 提交状态
const isSubmitting = ref(false);
const submitStatus = ref(null);

// EmailJS 配置
// 注意：这些是示例值，您需要在 https://www.emailjs.com/ 注册并获取实际的配置
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

const handleSubmit = async () => {
  isSubmitting.value = true;
  submitStatus.value = null;

  try {
    // 准备发送的参数
    const templateParams = {
      to_name: formData.name,
      to_email: formData.email,
      phone: formData.phone || t.value.noPhone,
      course: t.value.courses[formData.course],
      message: formData.message || t.value.noMessage,
      from_name: t.value.fromName,
      reply_to: formData.email
    };

    // 发送邮件
    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );

    // 成功
    submitStatus.value = {
      type: 'success',
      message: t.value.successMessage
    };

    // 重置表单
    Object.keys(formData).forEach(key => {
      formData[key] = key === 'phone' || key === 'message' ? '' : '';
    });

  } catch (error) {
    console.error('EmailJS Error:', error);
    submitStatus.value = {
      type: 'error',
      message: t.value.errorMessage + (error.text || error.message)
    };
  } finally {
    isSubmitting.value = false;
  }
};
</script>
