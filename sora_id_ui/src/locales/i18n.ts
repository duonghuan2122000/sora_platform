import i18n from "i18next";
import { initReactI18next } from "react-i18next";
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      vi: {
        translation: {
          LoginView: {
            Title: "Đăng nhập",
            EmailLabel: "Email",
            PasswordLabel: "Mật khẩu",
            SubmitText: "Đăng nhập",
            Validation: {
              EmailRequired: "Email không được để trống",
              EmailInvalid: "Email không hợp lệ",
              PasswordRequired: "Mật khẩu không được để trống",
              PasswordRangeLength: "Mật khẩu có độ dài từ 6 đến 36 ký tự",
            },
          },
        },
      },
    },
    lng: "vi", // if you're using a language detector, do not define the lng option
    fallbackLng: "vi",

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });
