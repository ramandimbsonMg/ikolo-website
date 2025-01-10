document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");
    const menuLinks = document.querySelectorAll(".menu-link");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                const link = document.querySelector(`a[href="#${entry.target.id}"]`);
                if (entry.isIntersecting) {
                    // Supprime les classes actives des autres liens
                    menuLinks.forEach((menuLink) => menuLink.classList.remove("bg-indigo-50", "text-indigo-400", "px-6", "pt-1", "pt-1"));

                    // Ajoute les classes actives au lien correspondant
                    link.classList.add("bg-indigo-50", "rounded-lg", "px-6","pt-1", "w-full" ,"w-[230px]", "block" , "pb-1", "text-indigo-400");
                }
            });
        },
        { threshold: 0.6 }
    );

    sections.forEach((section) => observer.observe(section));
});
