const languages = [
  {
    name: "Ruby",
    description:
      "Ruby is a dynamic, reflective, object-oriented, " +
      "general-purpose programming language. It was designed and developed in the mid-1990s " +
      "by Yukihiro Matsumoto in Japan. According to its creator, Ruby was influenced by Perl, " +
      "Smalltalk, Eiffel, Ada, and Lisp. It supports multiple programming paradigms, " +
      "including functional, object-oriented, and imperative. It also has a dynamic type " +
      "system and automatic memory management.",
  },

  {
    name: "JavaScript",
    description:
      "JavaScript is a high-level, dynamic, untyped, and interpreted " +
      "programming language. It has been standardized in the ECMAScript language " +
      "specification. Alongside HTML and CSS, JavaScript is one of the three core " +
      "technologies of World Wide Web content production; the majority of websites employ " +
      "it, and all modern Web browsers support it without the need for plug-ins. JavaScript " +
      "is prototype-based with first-class functions, making it a multi-paradigm language, " +
      "supporting object-oriented, imperative, and functional programming styles.",
  },

  {
    name: "Lisp",
    description:
      "Lisp (historically, LISP) is a family of computer programming languages " +
      "with a long history and a distinctive, fully parenthesized prefix notation. " +
      "Originally specified in 1958, Lisp is the second-oldest high-level programming " +
      "language in widespread use today. Only Fortran is older, by one year. Lisp has changed " +
      "since its early days, and many dialects have existed over its history. Today, the best " +
      "known general-purpose Lisp dialects are Common Lisp and Scheme.",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  languages.forEach((language) => {
    let div = document.querySelector("#languages");
    let lang = document.createElement("DIV");
    let h2 = document.createElement("H2");
    let desc = document.createElement("P");
    let show = document.createElement("A");
    div.append(lang);
    lang.append(h2);
    lang.append(desc);
    lang.append(show);

    lang.classList.add("lang");
    lang.setAttribute("data-lang", language.name);
    show.classList.add("more");
    show.setAttribute("href", "#");

    h2.textContent = language.name;
    desc.textContent = language.description.slice(0, 119) + "...";
    show.textContent = "Show More";

    show.addEventListener("click", (event) => {
      event.preventDefault();
      if (show.getAttribute("class") === "more") {
        show.setAttribute("class", "less");
        desc.textContent = language.description;
        show.textContent = "Show Less";
      } else {
        show.setAttribute("class", "more");
        desc.textContent = language.description.slice(0, 119) + "...";
        show.textContent = "Show More";
      }
    });
  });
});
