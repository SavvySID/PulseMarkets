 /** @type {import('tailwindcss').Config} */
 module.exports = {
   darkMode: "class",
   content: ["./index.html", "./src/**/*.{ts,tsx}"],
   theme: {
     extend: {
       colors: {
         brand: {
           500: "#5b5bd6",
           600: "#4540c9",
           700: "#342f9f"
         }
       }
     }
   },
   plugins: []
 };




