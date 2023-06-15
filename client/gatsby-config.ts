import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Массив Юг`,
    description: `Наша компания более 20 лет занимается производством элитной мебели, дверей и лестниц из массива дуба, бука и ясеня.
      Дизайн интерьера дома – это ваша индивидуальность, 
      и центральное место здесь занимает качественная стильная мебель. 
      Благодаря компании «МАССИВ-ЮГ» вы сами можете принять участие в создание своей мебели из массива, 
      выбирая её стилистику, конфигурацию, цветовые решения и фурнитуру. Всё остальное сделаем мы.`,
    siteUrl: `https://massiv-yug.ru`,
    image: `/images/icon.png`,
    keywords: "",
  },
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-image",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Massiv Yug",
        short_name: "Massiv Yug",
        start_url: "/",
        background_color: "#FFFFFF",
        theme_color: "#161B20",
        // Включает подсказку «Добавить на главный экран» и отключает пользовательский интерфейс браузера (включая кнопку «Назад»)
        display: "minimal-ui",
        icon: "src/images/icon.png",
      },
    },
    {
      resolve: `gatsby-plugin-web-font-loader`,
      options: {
        custom: {
          families: ["Orchidea Pro"],
          urls: ["/fonts/orchidea-pro/orchidea-pro.css"],
        },
      },
    },
    "gatsby-plugin-mdx",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "assets",
        path: "./src/assets/",
      },
      __key: "assets",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
  ],
};

export default config;
