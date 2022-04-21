<template>
  <article class="legal-container">
    <address class="legal-info">
      <h5>{{ $t("components.legal.companyName", { name: companyName[lang] }) }}</h5>
      <h5>{{ $t("components.legal.inn", { inn: inn[lang] }) }}</h5>
      <h5>{{ $t("components.legal.address", { address: address[lang] }) }}</h5>
      <h5>{{ certificateInfo[lang] }}</h5>
      <h5>{{ onlineRegistration[lang] }}</h5>
      <h5>{{ $t("components.legal.workingHour", { hour: workingHour[lang] }) }}</h5>
      <h5>
        <a :href="`tel:${phone[lang]}`">
          {{ $t("components.legal.phone", { phone: phone[lang] }) }}
        </a>
      </h5>
      <h5>
        <a :href="`mailto:${email[lang]}`">
          {{ $t("components.legal.email", { email: email[lang] }) }}
        </a>
      </h5>
    </address>
    <div class="legal-payment">
      <img :src="paymentImages.visa[dark ? 'black' : 'white']" alt="Visa">
      <img :src="paymentImages.visaSecure[dark ? 'black' : 'white']" alt="Visa Secure">
      <img :src="paymentImages.alfa[dark ? 'black' : 'white']" alt="Alfa">
      <img :src="paymentImages.mcId[dark ? 'black' : 'white']" alt="MC ID">
      <img :src="paymentImages.mc[dark ? 'black' : 'white']" alt="Master Card">
      <img :src="paymentImages.belcart[dark ? 'black' : 'white']" alt="Belcart">
      <img :src="paymentImages.belcartP[dark ? 'black' : 'white']" alt="Belcart P">
      <img :src="paymentImages.applePay[dark ? 'black' : 'white']" alt="Apple Pay">
      <img :src="paymentImages.samsungPay[dark ? 'black' : 'white']" alt="Samsung Pay">
    </div>
  </article>
</template>

<script>
import { settings, theme } from "@/mixins";

export default {
  name: "LegalInfo",
  mixins: [settings, theme],
  data() {
    // TODO: move to workshop
    return {
      companyName: {
        ru: `ООО "Дарклайт"`,
        en: `Darklight LLC`
      },
      inn: {
        ru: "193508444",
        en: "193508444"
      },
      address: {
        ru: "Республика Беларусь, г.Минск, ул. Пинская 28А, каб. 810",
        en: "Belarus, Minsk, Pinskaya st. 28A, 810"
      },
      certificateInfo: {
        ru: "Свидетельство о государственной регистрации №193508444 от 12.02.2021 выдано Минским горисполкомом",
        en: "Certificate of state registration No. 193508444 dated February 12, 2021 issued by the Minsk City Executive Committee"
      },
      onlineRegistration: {
        ru: "Интернет-магазин зарегистрирован в Торговом реестре РБ 12.02.2021",
        en: "The online store is registered in the Trade Register of the Republic of Belarus dated February 12, 2021"
      },
      workingHour: {
        ru: "09:00 - 18:00",
        en: "09:00 - 18:00"
      },
      phone: {
        ru: "+375(29)2777191",
        en: "+375(29)2777191"
      },
      email: {
        ru: "mail@darklight.by",
        en: "mail@darklight.by"
      },
      paymentImages: {
        visa: {
          white: "/payments/visa_black.png",
          black: "/payments/visa_white.png"
        },
        visaSecure: {
          white: "/payments/visa-secure_black.png",
          black: "/payments/visa-secure_black.png"
        },
        alfa: {
          white: "/payments/alfa_white.png",
          black: "/payments/alfa_black.png"
        },
        mcId: {
          white: "/payments/mc-id_black.png",
          black: "/payments/mc-id_white.png"
        },
        mc: {
          white: "/payments/mc_black.png",
          black: "/payments/mc_white.png"
        },
        belcart: {
          white: "/payments/belcart.png",
          black: "/payments/belcart.png"
        },
        belcartP: {
          white: "/payments/belcart-p.png",
          black: "/payments/belcart-p.png"
        },
        applePay: {
          white: "/payments/apple.png",
          black: "/payments/apple.png"
        },
        samsungPay: {
          white: "/payments/samsung_black.svg",
          black: "/payments/samsung_white.svg"
        }
      }
    };
  }
}
</script>

<style lang="sass">
  .legal-container
    display: flex
    justify-content: space-between
    padding: 0 60px
    margin-bottom: 60px

    h5
      font-weight: 400
      font-size: 12px
      margin-bottom: 5px

  .legal-payment
    display: flex
    align-items: flex-start

    img
      margin-right: 20px
      width: 40px
</style>