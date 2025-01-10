document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");
    const menuLinks = document.querySelectorAll(".menu-link");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                const link = document.querySelector(`a[href="#${entry.target.id}"]`);
                if (entry.isIntersecting) {
                    // Supprime les classes actives des autres liens
                    menuLinks.forEach((menuLink) => menuLink.classList.remove("text-indigo-400","font-bold"));

                    // Ajoute les classes actives au lien correspondant
                    link.classList.add("text-indigo-400", "font-bold");
                }
            });
        },
        { threshold: 0.6 }
    );

    sections.forEach((section) => observer.observe(section));
});
