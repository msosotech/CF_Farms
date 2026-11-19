/* =====================================================
   CF FARMS & AGRO
   SINGLE-PAGE WEBSITE
   MAIN JAVASCRIPT
   ===================================================== */


/* ================= 1. INITIAL SETUP ================= */

document.documentElement.classList.add("js-enabled");


/* ================= 2. PRELOADER ================= */

const preloader = document.getElementById("preloader");

let preloaderHidden = false;


function hidePreloader() {

    if (!preloader || preloaderHidden) return;

    preloaderHidden = true;

    preloader.classList.add("hide");

}


window.addEventListener("load", () => {

    setTimeout(hidePreloader, 400);

}, { once: true });


// Safety fallback if an external image takes too long

setTimeout(hidePreloader, 3000);


// Handle pages that have already loaded

if (document.readyState === "complete") {

    hidePreloader();

}



/* ================= 3. MOBILE NAVIGATION ================= */

const menuToggle = document.getElementById("menuToggle");

const navigation = document.getElementById("navigation");

const navLinks = document.querySelectorAll(".nav-link");


function closeMenu() {

    if (!menuToggle || !navigation) return;

    navigation.classList.remove("open");

    menuToggle.classList.remove("active");

    document.body.classList.remove("menu-open");

    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.setAttribute(
        "aria-label",
        "Open navigation menu"
    );

}


if (menuToggle && navigation) {


    menuToggle.addEventListener("click", () => {


        const isOpen = navigation.classList.toggle("open");


        menuToggle.classList.toggle("active", isOpen);


        document.body.classList.toggle("menu-open", isOpen);


        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );


        menuToggle.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );


    });



    // Close menu after selecting a section

    navLinks.forEach(link => {

        link.addEventListener("click", closeMenu);

    });



    // Close menu when pressing Escape

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            closeMenu();

        }

    });



    // Close menu when clicking outside

    document.addEventListener("click", event => {


        const clickedInside =
            navigation.contains(event.target) ||
            menuToggle.contains(event.target);


        if (
            !clickedInside &&
            navigation.classList.contains("open")
        ) {

            closeMenu();

        }

    });



    // Close menu when switching to desktop

    window.addEventListener("resize", () => {

        if (window.innerWidth > 768) {

            closeMenu();

        }

    });


}



/* ================= 4. AUTOMATIC COPYRIGHT YEAR ================= */

const currentYear = document.getElementById("currentYear");


if (currentYear) {

    currentYear.textContent = new Date().getFullYear();

}



/* ================= 5. STICKY HEADER ================= */

const header = document.getElementById("header");


function updateHeader() {

    if (!header) return;


    if (window.scrollY > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}


window.addEventListener("scroll", updateHeader, {
    passive: true
});


updateHeader();



/* ================= 6. BACK TO TOP ================= */

const backToTop = document.getElementById("backToTop");


function updateBackToTop() {

    if (!backToTop) return;


    if (window.scrollY > 500) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

}


window.addEventListener("scroll", updateBackToTop, {
    passive: true
});


if (backToTop) {

    backToTop.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}



/* ================= 7. SCROLL REVEAL ANIMATIONS ================= */

const revealElements = document.querySelectorAll(".reveal");


if ("IntersectionObserver" in window) {


    const revealObserver = new IntersectionObserver(

        (entries, observer) => {


            entries.forEach(entry => {


                if (entry.isIntersecting) {

                    entry.target.classList.add("revealed");

                    observer.unobserve(entry.target);

                }


            });


        },

        {

            threshold: 0.12,

            rootMargin: "0px 0px -35px 0px"

        }

    );



    revealElements.forEach(element => {

        revealObserver.observe(element);

    });


} else {


    // Fallback for older browsers

    revealElements.forEach(element => {

        element.classList.add("revealed");

    });


}



/* ================= 8. ACTIVE SECTION NAVIGATION ================= */

const sections = document.querySelectorAll(
    "main section[id]"
);


if ("IntersectionObserver" in window) {


    const sectionObserver = new IntersectionObserver(

        entries => {


            entries.forEach(entry => {


                if (entry.isIntersecting) {


                    const currentId = entry.target.id;


                    navLinks.forEach(link => {


                        const linkId = link.getAttribute("href");


                        if (linkId === `#${currentId}`) {

                            link.classList.add("active");

                        } else {

                            link.classList.remove("active");

                        }


                    });


                }


            });


        },

        {

            rootMargin: "-25% 0px -65% 0px",

            threshold: 0

        }

    );


    sections.forEach(section => {

        sectionObserver.observe(section);

    });


}



/* ================= 9. IMAGE OPTIMISATION ================= */

const images = document.querySelectorAll("img");


images.forEach(image => {

    image.loading = "lazy";

    image.decoding = "async";

});



/* ================= 10. CONTACT FORM ================= */

const contactForm = document.getElementById("contactForm");

const formNotice = document.getElementById("formNotice");


if (contactForm) {


    contactForm.addEventListener("submit", event => {


        event.preventDefault();


        // Get form information

        const fullName = document
            .getElementById("fullName")
            .value.trim();


        const email = document
            .getElementById("email")
            .value.trim();


        const subject = document
            .getElementById("subject")
            .value;


        const message = document
            .getElementById("message")
            .value.trim();



        // Basic validation

        if (!fullName || !email || !subject || !message) {

            if (formNotice) {

                formNotice.textContent =
                    "Please complete all the required fields.";

            }

            return;

        }



        // Prepare email content

        const emailSubject = encodeURIComponent(
            `CF Farms & Agro - ${subject}`
        );


        const emailBody = encodeURIComponent(

            `Name: ${fullName}\n` +

            `Email: ${email}\n` +

            `Enquiry Type: ${subject}\n\n` +

            `Message:\n${message}`

        );



        // Open the visitor's default email application

        const emailLink =
            `mailto:cffarmsagro@gmail.com?subject=${emailSubject}&body=${emailBody}`;


        if (formNotice) {

            formNotice.textContent =
                "Opening your email application. Please review and send your enquiry.";

        }


        window.location.href = emailLink;


    });


}



/* ================= 11. CONSOLE INFORMATION ================= */

console.log(
    "%cCF FARMS & AGRO",
    "color: #26734D; font-size: 24px; font-weight: bold;"
);


console.log(
    "%cGrowing Food. Building Futures.",
    "color: #D8A83E; font-size: 13px;"
);


console.log(
    "Welcome to CF Farms & Agro."
);