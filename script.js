"use strict";

/* =====================================================
   CHRYZXANDER MEMORY BOOK
   Dada Chris & Mama Joanna
===================================================== */

/* ELEMENTS */
const loader = document.getElementById("loader");
const openMemory = document.getElementById("openMemory");
const music = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicButton");
const finalButton = document.getElementById("finalButton");
const finalMessage = document.getElementById("finalMessage");
const topButton = document.getElementById("topButton");
const heroTeddy = document.getElementById("heroTeddy");

const photos = Array.from(
    document.querySelectorAll(".photo-frame img")
);

const videos = Array.from(
    document.querySelectorAll("video")
);

let musicPlaying = false;
let currentPhoto = 0;


/* =====================================================
   LOADING SCREEN
===================================================== */

window.addEventListener("load", () => {

    if (!loader) return;

    setTimeout(() => {
        loader.classList.add("hidden");
    }, 1800);

});


/* =====================================================
   OPEN MEMORY BOOK
===================================================== */

if (openMemory) {

    openMemory.addEventListener("click", () => {

        const intro = document.querySelector(".intro");

        if (intro) {

            intro.scrollIntoView({
                behavior: "smooth"
            });

        }

        startMusic();

        createFloatingHearts(12);

    });

}


/* =====================================================
   AUTOMATIC BACKGROUND MUSIC
===================================================== */

/* Volume */
if (music) {
    music.volume = 0.35;
}


/* Update button */
function updateMusicButton() {

    if (!musicButton) return;

    if (musicPlaying) {

        musicButton.textContent = "🎵";
        musicButton.setAttribute(
            "aria-label",
            "Pause music"
        );
        musicButton.title = "Pause music";

    } else {

        musicButton.textContent = "🔇";
        musicButton.setAttribute(
            "aria-label",
            "Play music"
        );
        musicButton.title = "Play music";

    }
}


/* Start music */
async function startMusic() {

    if (!music) return;

    try {

        await music.play();

        musicPlaying = true;

        updateMusicButton();

        console.log("🎵 Lullaby started automatically.");

    } catch (error) {

        console.log(
            "Browser blocked autoplay. Waiting for user interaction."
        );

    }
}


/* =====================================================
   TRY AUTOMATICALLY WHEN PAGE LOADS
===================================================== */

window.addEventListener("load", () => {

    setTimeout(() => {

        startMusic();

    }, 1000);

});


/* =====================================================
   START MUSIC AFTER FIRST USER INTERACTION
   IF AUTOPLAY WAS BLOCKED
===================================================== */

function firstInteraction() {

    if (!musicPlaying) {
        startMusic();
    }

    document.removeEventListener(
        "click",
        firstInteraction
    );

    document.removeEventListener(
        "touchstart",
        firstInteraction
    );

    document.removeEventListener(
        "keydown",
        firstInteraction
    );

}


document.addEventListener(
    "click",
    firstInteraction
);

document.addEventListener(
    "touchstart",
    firstInteraction
);

document.addEventListener(
    "keydown",
    firstInteraction
);


/* =====================================================
   MUSIC BUTTON
===================================================== */

if (musicButton) {

    musicButton.addEventListener(
        "click",
        async () => {

            if (!music) return;

            if (music.paused) {

                await startMusic();

            } else {

                music.pause();

            }

        }
    );

}


/* =====================================================
   MUSIC EVENTS
===================================================== */

if (music) {

    music.addEventListener(
        "play",
        () => {

            musicPlaying = true;

            updateMusicButton();

        }
    );


    music.addEventListener(
        "pause",
        () => {

            musicPlaying = false;

            updateMusicButton();

        }
    );


    music.addEventListener(
        "error",
        () => {

            console.error(
                "❌ Cannot load ./media/lullaby.mp3"
            );

        }
    );

}


/* Initial button */
updateMusicButton();


/* =====================================================
   SCROLL REVEAL ANIMATION
===================================================== */

const revealElements =
    document.querySelectorAll(".reveal");


if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(

            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "active"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold: 0.12
            }

        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });

} else {

    revealElements.forEach(element => {

        element.classList.add("active");

    });

}


/* =====================================================
   HERO TEDDY
===================================================== */

if (heroTeddy) {

    heroTeddy.addEventListener(
        "click",
        () => {

            createFloatingHearts(15);

            heroTeddy.animate(

                [
                    {
                        transform: "scale(1)"
                    },

                    {
                        transform: "scale(1.25)"
                    },

                    {
                        transform: "scale(1)"
                    }
                ],

                {
                    duration: 600,
                    easing: "ease-out"
                }

            );

        }
    );

}


/* =====================================================
   FLOATING HEARTS / SPARKLES
===================================================== */

function createFloatingHearts(amount = 10) {

    const symbols = [
        "🤍",
        "💙",
        "♡",
        "✦",
        "✧"
    ];


    for (let i = 0; i < amount; i++) {

        const item =
            document.createElement("div");


        item.textContent =
            symbols[
            Math.floor(
                Math.random() *
                symbols.length
            )
            ];


        item.style.position = "fixed";

        item.style.left =
            Math.random() * 100 + "vw";

        item.style.bottom = "-40px";

        item.style.zIndex = "9999";

        item.style.pointerEvents = "none";

        item.style.fontSize =
            14 + Math.random() * 20 + "px";

        item.style.opacity = "0";

        item.style.transition =
            "transform 4s ease, opacity 4s ease";


        document.body.appendChild(item);


        requestAnimationFrame(() => {

            const x =
                (Math.random() - 0.5) * 180;

            const y =
                window.innerHeight + 120;

            const rotation =
                Math.random() * 360;


            item.style.opacity = ".9";


            item.style.transform =
                `translate(${x}px, -${y}px) rotate(${rotation}deg)`;

        });


        setTimeout(() => {

            item.remove();

        }, 4300);

    }

}


/* =====================================================
   FINAL MESSAGE
===================================================== */

if (finalButton && finalMessage) {

    finalButton.setAttribute(
        "aria-expanded",
        "false"
    );


    finalButton.addEventListener(
        "click",
        () => {

            const opened =
                finalMessage.classList.toggle(
                    "show"
                );


            finalButton.setAttribute(
                "aria-expanded",
                String(opened)
            );


            if (opened) {

                finalButton.textContent =
                    "Close One Last Message 🤍";


                createFloatingHearts(20);


                setTimeout(() => {

                    finalMessage.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });

                }, 150);


            } else {

                finalButton.textContent =
                    "Open One Last Message 💙";

            }

        }
    );

}


/* =====================================================
   PHOTO GALLERY
===================================================== */

photos.forEach((photo, index) => {

    photo.addEventListener(
        "click",
        () => {

            openLightbox(index);

        }
    );

});


/* =====================================================
   PHOTO LIGHTBOX
===================================================== */

function openLightbox(index) {

    if (!photos.length) return;

    currentPhoto = index;


    const lightbox =
        document.createElement("div");


    lightbox.className =
        "memory-lightbox";


    lightbox.innerHTML = `

        <button
            class="lightbox-close"
            aria-label="Close gallery">
            ×
        </button>

        <button
            class="lightbox-prev"
            aria-label="Previous photo">
            ‹
        </button>

        <img
            class="lightbox-image"
            src=""
            alt="Chryzxander memory">

        <button
            class="lightbox-next"
            aria-label="Next photo">
            ›
        </button>

        <div class="lightbox-counter"></div>

    `;


    document.body.appendChild(lightbox);

    document.body.classList.add(
        "no-scroll"
    );


    const image =
        lightbox.querySelector(
            ".lightbox-image"
        );


    const counter =
        lightbox.querySelector(
            ".lightbox-counter"
        );


    const close =
        lightbox.querySelector(
            ".lightbox-close"
        );


    const previous =
        lightbox.querySelector(
            ".lightbox-prev"
        );


    const next =
        lightbox.querySelector(
            ".lightbox-next"
        );


    function showPhoto(index) {

        currentPhoto =
            (index + photos.length) %
            photos.length;


        image.src =
            photos[currentPhoto].src;


        image.alt =
            photos[currentPhoto].alt;


        counter.textContent =
            `${currentPhoto + 1} / ${photos.length}`;

    }


    function closeLightbox() {

        lightbox.remove();

        document.body.classList.remove(
            "no-scroll"
        );


        document.removeEventListener(
            "keydown",
            keyboardHandler
        );

    }


    function keyboardHandler(event) {

        if (event.key === "Escape") {

            closeLightbox();

        }


        if (event.key === "ArrowLeft") {

            showPhoto(
                currentPhoto - 1
            );

        }


        if (event.key === "ArrowRight") {

            showPhoto(
                currentPhoto + 1
            );

        }

    }


    close.addEventListener(
        "click",
        closeLightbox
    );


    previous.addEventListener(
        "click",
        () => {

            showPhoto(
                currentPhoto - 1
            );

        }
    );


    next.addEventListener(
        "click",
        () => {

            showPhoto(
                currentPhoto + 1
            );

        }
    );


    lightbox.addEventListener(
        "click",
        event => {

            if (event.target === lightbox) {

                closeLightbox();

            }

        }
    );


    document.addEventListener(
        "keydown",
        keyboardHandler
    );


    showPhoto(currentPhoto);

}


/* =====================================================
   VIDEO CONTROL
===================================================== */

videos.forEach(video => {

    video.addEventListener(
        "play",
        () => {

            videos.forEach(otherVideo => {

                if (otherVideo !== video) {

                    otherVideo.pause();

                }

            });

        }
    );


    video.addEventListener(
        "error",
        () => {

            console.warn(
                "Video could not load:",
                video.currentSrc
            );

        }
    );

});


/* =====================================================
   IMAGE ERROR CHECK
===================================================== */

photos.forEach(photo => {

    photo.addEventListener(
        "error",
        () => {

            console.warn(
                "Image could not load:",
                photo.src
            );

        }
    );

});


/* =====================================================
   BACK TO TOP
===================================================== */

if (topButton) {

    window.addEventListener(
        "scroll",
        () => {

            if (window.scrollY > 700) {

                topButton.classList.add(
                    "show"
                );

            } else {

                topButton.classList.remove(
                    "show"
                );

            }

        },
        {
            passive: true
        }
    );


    topButton.addEventListener(
        "click",
        () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

}


/* =====================================================
   PAGE VISIBILITY
===================================================== */

document.addEventListener(
    "visibilitychange",
    () => {

        if (
            document.hidden &&
            musicPlaying &&
            music
        ) {

            music.pause();

        }

    }
);


/* =====================================================
   TOUCH SWIPE
===================================================== */

let touchStartX = 0;


document.addEventListener(
    "touchstart",
    event => {

        if (
            !document.querySelector(
                ".memory-lightbox"
            )
        ) {
            return;
        }


        touchStartX =
            event.changedTouches[0].screenX;

    },
    {
        passive: true
    }
);


document.addEventListener(
    "touchend",
    event => {

        const lightbox =
            document.querySelector(
                ".memory-lightbox"
            );


        if (!lightbox) return;


        const touchEndX =
            event.changedTouches[0].screenX;


        const difference =
            touchStartX - touchEndX;


        if (Math.abs(difference) < 50) {
            return;
        }


        const button =
            difference > 0
                ? lightbox.querySelector(
                    ".lightbox-next"
                )
                : lightbox.querySelector(
                    ".lightbox-prev"
                );


        if (button) {
            button.click();
        }

    },
    {
        passive: true
    }
);


/* =====================================================
   RANDOM SOFT SPARKLES
===================================================== */

function softSparkles() {

    if (document.hidden) return;

    createFloatingHearts(2);

}


setInterval(
    softSparkles,
    12000
);


/* =====================================================
   CONSOLE MESSAGE
===================================================== */

console.log(
    "🧸 Chryzxander's Memory Book is ready."
);

console.log(
    "💙 Dada Chris & Mama Joanna"
);

console.log(
    "🤍 Forever loved. Forever remembered."
);