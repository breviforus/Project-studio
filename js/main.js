document.addEventListener('DOMContentLoaded', () => {

    new WOW().init();

    // smooth scroll

    SmoothScroll({
        animationTime: 800,
        stepSize: 75,
        accelerationDelta: 30,
        accelerationMax: 2,
        keyboardSupport: true,
        arrowScroll: 50,
        pulseAlgorithm: true,
        pulseScale: 4,
        pulseNormalize: 1,
        touchpadSupport: true,
    })

    // slideMenu

    let burger = document.querySelector('.brg'),
        close = document.querySelector('.crs'),
        mobileMenu = document.querySelector('.mobile__menu')

    function openMenu() {
        mobileMenu.classList.add('show');
        document.body.style.overflow = 'hidden';

    }

    function closeMenu() {
        mobileMenu.classList.remove('show');
        document.body.style.overflow = '';
    }

    burger.addEventListener('click', openMenu);
    close.addEventListener('click', closeMenu);

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && mobileMenu.classList.contains('show')) {
            closeMenu();
        }
    });


    /* popups */

    let popupElementInit = document.querySelector('.callme'),
        popupElementInitCallback = document.querySelector('.callback'),
        popupCallme = document.querySelector('.form__callme'),
        popupElementClose = document.querySelector('.close__popup'),
        backlayer = document.querySelector('.backlayer'),
        playBtn = document.querySelector('.play'),
        popupVideo = document.querySelector('.popup_video')



    function openPopupVideo() {
        popupVideo.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closePopupVideo() {
        popupVideo.classList.remove('open');
        document.body.style.overflow = '';
    }




    playBtn.addEventListener('click', openPopupVideo);
    popupElementClose.addEventListener('click', closePopupVideo);
    backlayer.addEventListener('click', closePopupVideo);

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && popupVideo.classList.contains('open')) {
            closePopupVideo();
        }
    });




    // animation write text




    document.querySelector('.rotate__text').innerHTML = 'Title1 Title2 Title3 Title4'.split('')
        .map((e, i) => `<span style="--rot:${i*11.5}deg">${e}</span>`).join('');

    /* btn */

    let section = [],
        centerElem = [],
        animText = [],
        animCircle = [],
        circle = document.querySelectorAll(".circle__animation"),
        animBtn = false;

    if (innerWidth > 1024 && circle.length) {
        initMovecircle();
    }

    setInterval(() => {
        animBtn = true;
    }, 50);

    function initMovecircle() {
        circle.forEach(el => {
            section.push(el.closest("section") || document);
            centerElem.push(el.querySelector(".star"));
            animText.push(el.querySelector(".circle__animation__text"));
            animCircle.push(el.querySelector("circle__animation"));
        });
        section.forEach((el, i) => {
            el.addEventListener('mousemove', (e) => {
                if (animBtn) {
                    animBtn = false;
                    movecircle(e, i);
                }
            });
        });
    }

    function movecircle(e, i) {
        let pos = circle[i].getBoundingClientRect();
        let x = pos.x + pos.width / 2;
        let y = pos.y + pos.height / 2;
        let xM = e.clientX;
        let yM = e.clientY;
        let posX = x - xM;
        let posY = y - yM;
        if (Math.abs(posY) < 400 && Math.abs(posX) < 400) {
            gsap.to(animCircle[i], {
                duration: 1,
                x: -posX / 12,
                y: -posY / 12,
                ease: "ease"
            });
            gsap.to(animText[i], {
                duration: 1,
                x: -posX / 8,
                y: -posY / 8,
                ease: "ease"
            });
            gsap.to(centerElem[i], {
                duration: 1,
                x: -posX / 30,
                y: -posY / 30,
                ease: "ease"
            });
        } else {
            gsap.to(animCircle[i], {
                duration: 2.5,
                x: 0,
                y: 0,
                ease: "ease"
            });
            gsap.to(animText[i], {
                duration: 2.5,
                x: 0,
                y: 0,
                ease: "ease"
            });
            gsap.to(centerElem[i], {
                duration: 2.5,
                x: 0,
                y: 0,
                ease: "ease"
            });
        }
    }


    // typing

    // List of sentences
    let content = [
            "Title1",
            "Title2",
            "Title3",
            "Title4"
        ],
        part = 0,
        partIndex = 0,
        intervalVal,
        element = document.querySelector("#typing");


    function Type() {
        var text = content[part].substring(0, partIndex + 1);
        element.innerHTML = text;
        partIndex++;

        if (text === content[part]) {
            clearInterval(intervalVal);
            setTimeout(function() {
                intervalVal = setInterval(Delete, 50);
            }, 1000);
        }
    }

    function Delete() {

        var text = content[part].substring(0, partIndex - 1);
        element.innerHTML = text;
        partIndex--;


        if (text === '') {
            clearInterval(intervalVal);

            if (part == (content.length - 1))
                part = 0;
            else
                part++;

            partIndex = 0;

            setTimeout(function() {
                intervalVal = setInterval(Type, 300);
            }, 200);
        }
    }

    intervalVal = setInterval(Type, 100);




    // swippers


    new Swiper('.brands__wrapper', {
        // Optional parameters
        slidesPerView: 'auto',
        grabCursor: true,
        mousewheelControl: true,
        keyboardControl: true,
        speed: 3000,
        loop: true,
        autoplay: {
            delay: 0,
            disableOnInteraction: false
        },

    });

    if (document.documentElement.clientWidth < 1024) {
        let forWT = new Swiper(".forWT", {
            loop: true,
            speed: 400,
            autoplay: {
                delay: 5000,
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
        });

        let forWI = new Swiper(".forWI", {
            effect: "fade",
            loop: true,
            speed: 400,
            autoplay: {
                delay: 5000,
            }
        });

        forWT.controller.control = forWI;
        forWI.controller.control = forWT;

    }
    // forwork animation


    let forWorkMainTitle = document.querySelector(".js-forwork__maintitle"),
        forWorkButton = document.querySelector(".js-forwork__button")

    function resizeHandler() {

        const forworkText = document.querySelector('.forwork_ctext'),

            elem = document.querySelector('.forwork_desk'),
            forworkLast = document.querySelector('.fs4');

        document.addEventListener('scroll', function() {
            const posTop = elem.getBoundingClientRect().top;

            forworkText.classList.toggle('show', posTop <= 0);
        });

        document.addEventListener('scroll', function() {
            const posBottom = forworkLast.getBoundingClientRect().top;

            forworkText.classList.toggle('scrollover', posBottom <= 0);
        });




        const tl = gsap.timeline();



        ScrollTrigger.create({

            trigger: ".fs1",
            start: "top top",
            pin: true,
            invalidateOnRefresh: true,
            scrub: true,
            pinSpacing: false,
            // markers: true,
            toggleClass: { targets: ".sli1", className: "active" },
            onEnter: () => {
                tl.fromTo(forWorkMainTitle, { opacity: 0 }, { opacity: 1, duration: 0.5 });
                tl.fromTo(forWorkButton, { opacity: 0 }, { opacity: 1, duration: 0.5 });
            },
            onLeaveBack: () => {
                tl.fromTo(forWorkMainTitle, { opacity: 1 }, { opacity: 0, duration: 0.5 });
                tl.fromTo(forWorkButton, { opacity: 1 }, { opacity: 0, duration: 0.5 });
            }
        })

        ScrollTrigger.create({

            trigger: ".fs2",
            start: "top top",
            pin: true,
            invalidateOnRefresh: true,
            scrub: true,
            pinSpacing: false,
            toggleClass: { targets: ".sli2", className: "active" },
            // markers: true,
            onEnter: () => {
                tl.to(".text__first", {
                        opacity: 0,
                        display: 'none'
                    }),
                    tl.to(".text__second", {
                        opacity: 1,
                        display: 'block'
                    })
            },
            onLeaveBack: () => {
                tl.to(".text__second", {
                        opacity: 0,
                        display: 'none'
                    }),
                    tl.to(".text__first", {
                        opacity: 1,
                        display: 'block'
                    })
            }
        })

        ScrollTrigger.create({
            trigger: ".fs3",
            start: "top top",
            pin: true,
            invalidateOnRefresh: true,
            scrub: true,
            pinSpacing: false,
            toggleClass: { targets: ".sli3", className: "active" },
            // markers: true,
            onEnter: () => {

                tl.to(".text__second", {
                        opacity: 0,
                        display: 'none'
                    }),

                    tl.to(".text__third", {
                        opacity: 1,
                        display: 'block'
                    })
            },
            onLeaveBack: () => {
                tl.to(".text__third", {
                        opacity: 0,
                        display: 'none'
                    }),
                    tl.to(".text__second", {
                        opacity: 1,
                        display: 'block'
                    })
            }
        })

        ScrollTrigger.create({
            trigger: ".fs4",
            start: "top top",
            // markers: true,
            toggleClass: { targets: ".sli4", className: "active" },
            onEnter: () => {
                tl.to(".text__third", {
                        opacity: 0,
                        display: 'none'
                    }),
                    tl.to(".text__fourth", {
                        opacity: 1,
                        display: 'block'
                    })
            },
            onLeaveBack: () => {
                tl.to(".text__fourth", {
                        opacity: 0,
                        display: 'none'
                    }),
                    tl.to(".text__third", {
                        opacity: 1,
                        display: 'block'
                    })
            }
        })

    }

    if (window.innerWidth > 1024) {
        resizeHandler();

    }




    gsap.utils.toArray(".sl__navigation a").forEach(function(a) {
        a.addEventListener("click", function(e) {
            e.preventDefault();
            gsap.to(window, { scrollTo: e.target.getAttribute("href") });
        });
    });


    function destroyForwork() {
        // console.log('test');
        ScrollTrigger.kill();
        const tl = gsap.timeline();
        tl.to(forWorkMainTitle, { opacity: 1 })
        tl.to(forWorkButton, { opacity: 1 })
    }


    function checkView() {
        var isDevice = "desktop";

        window.addEventListener("resize", function() {
            var windowWidth = window.innerWidth;
            if (windowWidth < 1025) {
                if (isDevice != "mobile") {
                    isDevice = "mobile";
                    destroyForwork();
                    // console.log(isDevice);
                }
            } else if (windowWidth >= 1025) {
                if (isDevice != "desktop") {
                    isDevice = "desktop";
                    resizeHandler();
                    // console.log(isDevice);
                }
            }
        });
    };

    checkView();



    /* parallax */




    gsap.fromTo('.video .parallax-elem img', { yPercent: '50' }, {
        yPercent: '-50',
        duration: 5,
        ease: "ease-in",
        scrollTrigger: {
            trigger: ".video",
            scrub: true
        },
    });

    gsap.fromTo('.forwork  .parallax-elem img', { yPercent: '-20' }, {
        yPercent: '-50',
        ease: "ease-in",
        scrollTrigger: {
            trigger: ".forwork",
            start: "bottom bottom",

            scrub: true
        },
    });

    gsap.fromTo('.works .parallax-elem img', { yPercent: '-50' }, {
        yPercent: '50',
        ease: "ease-in",
        scrollTrigger: {
            trigger: ".works",
            scrub: true
        },
    });

    gsap.to(".about  .parallax-elem img", {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
            trigger: ".about",
            scrub: true
        },
    });

    // const par__elems = gsap.utils.toArray('.parallax-elem img');
    // par__elems.forEach(el => {
    //     gsap.to(el, {
    //         yPercent: '-50',
    //         scrollTrigger: {
    //             trigger: el,
    //             scrub: true
    //         }
    //     })
    // });





    // tabs

    let serviceLink = document.querySelectorAll('.service__link'),
        serviceContent = document.querySelectorAll('.tab-content');

    serviceLink.forEach(function(trigger) {
        trigger.addEventListener('click', function() {
            let id = this.getAttribute('data-tab'),
                content = document.querySelector('.tab-content[data-tab="' + id + '"]'),
                video = document.querySelector('.tab-video[data-tab="' + id + '"]'),
                activeTrigger = document.querySelector('.service__link.active'),
                activeContent = document.querySelector('.tab-content.active');
            activeVideo = document.querySelector('.tab-video.active');

            activeTrigger.classList.remove('active');
            trigger.classList.add('active');

            activeContent.classList.remove('active');
            activeVideo.classList.remove('active');
            content.classList.add('active');
            video.classList.add('active');
        });
    });


    // cursorhand

    if (document.documentElement.clientWidth > 1024) {

        let cursorParent = document.querySelector('.section__form'),
            zone = document.querySelector('.form__wrapper'),
            cursorItem = document.querySelector('.anim');




        function cursorActive(e) {

            cursorItem.classList.add('anim__show');
            cursorItem.style.position = 'fixed';
            animItem = document.querySelector('.anim__show');
            animItem.style.left = e.clientX + -20 + 'px';
            animItem.style.top = e.clientY + -20 + 'px';

        }

        function cursorDeactive(e) {

            cursorItem.style.position = 'absolute';
            cursorItem.classList.remove('anim__show');
            cursorItem.style.left = null;
            cursorItem.style.top = null;
        }



        cursorParent.addEventListener('mouseover', cursorActive);
        zone.addEventListener('mouseover', function(e) {
            e.stopPropagation();
            cursorDeactive();
        });
        cursorParent.addEventListener('mouseout', cursorDeactive);

        ScrollTrigger.create({

            trigger: ".section__form",
            start: "top center",
            end: "bottom center",
            onLeave: cursorDeactive,
            onLeaveBack: cursorDeactive
        });



    }






    /* portfolio */



    if (document.documentElement.clientWidth > 1024) {

        function hoverImage() {
            document.querySelectorAll('[data-hover]').forEach((img) => {
                const src = img.getAttribute('src'),
                    srcH = img.getAttribute('data-hover');

                function parallaxHoverImage() {
                    let parentBox = img.parentElement,
                        bg = parentBox.querySelector('.work__img');
                    parentBox.addEventListener('mousemove', function(e) {
                        let x = e.clientX / window.innerWidth,
                            y = e.clientY / window.innerHeight;
                        bg.style.transform = 'translate(-' + x * 50 + 'px, -' + y * 50 + 'px)';
                    });
                }

                img.addEventListener('mouseover', () => {
                    img.src = srcH;
                    parallaxHoverImage();
                })
                img.addEventListener('mouseout', () => {
                    img.src = src;
                })
            });
        }

        hoverImage();

    }


    /* scrollbar */
    if (document.documentElement.clientWidth > 600) {

        Scrollbar.init(document.querySelector('.scroll_h'), {
            // alwaysShowTracks: true
        });

    }

    if (document.documentElement.clientWidth < 1024) {

        Scrollbar.init(document.querySelector('.scroll_h_m'), {
            // alwaysShowTracks: true
        });

    }


    let dropList = document.querySelectorAll('.d_click');

    dropList.forEach((elem) => {
        let list = elem.nextElementSibling;
        elem.addEventListener('click', () => {
            if (list.classList.contains('show')) {
                list.classList.remove('show');
            } else {
                list.classList.add('show');
            }

        });
    });


});