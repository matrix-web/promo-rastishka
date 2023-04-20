import { defineRule, configure } from "vee-validate";
import { localize, setLocale } from "@vee-validate/i18n";
import AllRules from "@vee-validate/rules";
import { defineNuxtPlugin } from "#imports";

export default defineNuxtPlugin((nuxtApp) => {
  Object.keys(AllRules).forEach((rule) => {
    // @ts-ignore
    defineRule(rule, AllRules[rule]);
  });

  defineRule("time", (value: any) => {
    return value.length === 5;
  });
  defineRule("max-date", (value: any) => {
    const [day, month, year] = value.split(".");
    const d = new Date(year + "/" + month + "/" + day);
    return +d <= +new Date();
  });
  defineRule("date", (value: any) => {
    const [day, month, year] = value.split(".");
    const d = new Date(year + "/" + month + "/" + day);
    return !isNaN(d.getTime());
  });
  defineRule("rus", (value: any) => {
    return /[а-я]/i.test(value);
  });
  defineRule("eng", (value: any) => {
    return !/[а-я]/i.test(value);
  });

  configure({
    generateMessage: localize("ru", {
      messages: {
        required: "Это поле обязательное",
        min: "Значение не может быть меньше чем 0:{min}",
        email: "Неккоректное значение",
        phone: "Неккоректное значение",
        numeric: "Значение должно быть числом",
        "max-date": "Дата не может быть больше чем текущая дата",
        time: "Неккоректное значение",
        date: "Неккоректное значение",
        rus: "Значение должно быть на русском языке",
        eng: "Введенное значение не должно содержать кириллицу",
      },
    }),
  });
});
